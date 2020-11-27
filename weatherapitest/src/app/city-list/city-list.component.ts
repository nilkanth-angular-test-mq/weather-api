import { Component, OnInit } from '@angular/core';
import { WeatherDetailService } from '../services/weather-detail.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  listOfCities;
  currentSelectedCityName;

  constructor(private weatherSvc: WeatherDetailService) { }

  ngOnInit(): void {
    this.listOfCities = this.weatherSvc.getCityList();
  }

  //to get city from city list and pass current selected city to child component to get next five day's sea level
  currentSelectedCity(city) {
    this.currentSelectedCityName = city;
  }

}
