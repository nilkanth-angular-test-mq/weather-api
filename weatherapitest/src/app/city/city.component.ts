import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherDetailService } from '../services/weather-detail.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input('city') city;
  @Output('currentSelectedCity') currentSelectedCity = new EventEmitter();
  cityWeatherDetails;

  constructor(private weatherSvc: WeatherDetailService) { }

  ngOnInit(): void {
    //service call to get today's weather by city name
    this.weatherSvc.getTodaysWeather(this.city).subscribe(res => {
      this.cityWeatherDetails = (res as any).sys;
    })
  }

  // function to pass current selected city to city list component/parent
  selectCity(city) {
    this.currentSelectedCity.emit(city);
  }
}
