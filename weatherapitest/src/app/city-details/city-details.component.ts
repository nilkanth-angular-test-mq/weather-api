import { Component, Input, OnInit } from '@angular/core';
import { WeatherDetailService } from '../services/weather-detail.service';


@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {

  nextFiveDaysWeather = [];
  @Input('currentSelectedCity') currentSelectedCity;


  constructor(private weatherSvc: WeatherDetailService) {

  }

  ngOnInit(): void {
    //service call to get weather report for next five days
    this.weatherSvc.getWeatherForNextFiveDays(this.currentSelectedCity).subscribe(res => {
      this.nextFiveDaysWeather = res;
    });
  }



}

