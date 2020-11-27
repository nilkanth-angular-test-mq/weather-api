import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, timeout, catchError, map, pluck } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDetailService {

  //api url to get current weater details by city name
  private API_URL_Part1: string = "http://api.openweathermap.org/data/2.5/weather?q=";
  private APP_ID_Part2: string = ",uk&appid=3d8b309701a13f65b660fa2c64cdc517";

  //api url to get forecast weather details by city name
  private API_URL_FORECAST_FIVE_DAYS_PART1: string = "http://api.openweathermap.org/data/2.5/forecast?q=";
  private API_URL_FORECAST_FIVE_DAYS_PART2: string = ",uk&appid=3d8b309701a13f65b660fa2c64cdc517";

  //next five day array to filter records from api when checking sealevel data
  nextFiveDays = [];

  constructor(private http: HttpClient) {
    this.getNextFiveDays();
  }

  // get name of cities
  getCityList() {
    return ['London', 'Edinburgh', 'Liverpool', 'Oxford', 'Bath'];
  }

  // get today's weathear information for current selected city
  getTodaysWeather(cityName: string) {
    return this.http.get(this.API_URL_Part1 + cityName + this.APP_ID_Part2).pipe(
      retry(2),
      timeout(60000),
      catchError(this.handleError)
    );
  }

  // get weather information for next five days based on current selected city
  getWeatherForNextFiveDays(cityName: string) {

    return this.http.get(this.API_URL_FORECAST_FIVE_DAYS_PART1 + cityName + this.API_URL_FORECAST_FIVE_DAYS_PART2).pipe(
      pluck('list'),
      map(res => {
        let filterData = [];
        (res as []).forEach(element => {
          const api_to_momentDate = this.apiDateToMoment((element as any).dt_txt);
          if (this.nextFiveDays.indexOf(api_to_momentDate) != -1) {
            const seaLevel = ((element as any).main as any).sea_level;
            filterData.push({ 'dateTime': api_to_momentDate, 'seaLevel': seaLevel });
          }
        });
        return filterData;
      }),
      retry(2),
      timeout(60000),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    console.log("ERROR FROM API- " + error);
    return throwError(error);
  }

  private getNextFiveDays() {
    for (let i = 1; i < 6; i++) {
      let plusOneDay = moment(moment().add(i, 'd').set({ hour: 9, minute: 0, second: 0, millisecond: 0 })).format('MM/DD/YYYY HH:mm:mm').toString();
      this.nextFiveDays.push(plusOneDay);
    }
    console.log(this.nextFiveDays);
  }

  private apiDateToMoment(apiDate) {
    return moment(apiDate).format('MM/DD/YYYY HH:mm:mm').toString();
  }

}
