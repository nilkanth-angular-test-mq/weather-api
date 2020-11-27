import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDetailService } from '../services/weather-detail.service';

import { CityListComponent } from './city-list.component';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
class MockWeatherDetailService {
  nextFiveDays;
  getCityList() {
    return ['London', 'Edinburgh', 'Liverpool', 'Oxford', 'Bath'];
  }
  getNextFiveDays() {
    for (let i = 1; i < 6; i++) {
      let plusOneDay = "";
      this.nextFiveDays.push(plusOneDay);
    }
    console.log(this.nextFiveDays);
  }
  getTodaysWeather(cityName: string) {
    let result = {
      "coord": { "lon": -0.13, "lat": 51.51 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "base": "stations", "main": { "temp": 278.79, "feels_like": 276.36, "temp_min": 277.59, "temp_max": 279.82, "pressure": 1018, "humidity": 87 }, "visibility": 10000, "wind": { "speed": 1.5, "deg": 0 }, "clouds": { "all": 75 },
      "dt": 1606485304, "sys": { "type": 1, "id": 1414, "country": "GB", "sunrise": 1606462727, "sunset": 1606492689 }, "timezone": 0, "id": 2643743, "name": "London", "cod": 200
    };
    return of(result);
  }
  getWeatherForNextFiveDays(cityName: string) {
    let result = [
      { "dt": 1606489200, "main": { "temp": 279.77, "feels_like": 276.47, "temp_min": 279.77, "temp_max": 280.61, "pressure": 1018, "sea_level": 1018, "grnd_level": 1014, "humidity": 82, "temp_kf": -0.84 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "clouds": { "all": 87 }, "wind": { "speed": 2.77, "deg": 59 }, "visibility": 10000, "pop": 0.06, "sys": { "pod": "d" }, "dt_txt": "2020-11-27 15:00:00" },
      { "dt": 1606500000, "main": { "temp": 280.39, "feels_like": 277.24, "temp_min": 280.39, "temp_max": 280.78, "pressure": 1016, "sea_level": 1016, "grnd_level": 1014, "humidity": 82, "temp_kf": -0.39 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 95 }, "wind": { "speed": 2.72, "deg": 67 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2020-11-27 18:00:00" },
      { "dt": 1606510800, "main": { "temp": 281.09, "feels_like": 278.76, "temp_min": 281.09, "temp_max": 281.23, "pressure": 1017, "sea_level": 1017, "grnd_level": 1014, "humidity": 89, "temp_kf": -0.14 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "clouds": { "all": 98 }, "wind": { "speed": 2.09, "deg": 84 }, "visibility": 10000, "pop": 0.02, "sys": { "pod": "n" }, "dt_txt": "2020-11-27 21:00:00" },
      { "dt": 1606521600, "main": { "temp": 280.63, "feels_like": 278.1, "temp_min": 280.63, "temp_max": 280.64, "pressure": 1016, "sea_level": 1016, "grnd_level": 1013, "humidity": 90, "temp_kf": -0.01 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "clouds": { "all": 77 }, "wind": { "speed": 2.28, "deg": 93 }, "visibility": 10000, "pop": 0, "sys": { "pod": "n" }, "dt_txt": "2020-11-28 00:00:00" },
    ];
    return of(result);
  }
  apiDateToMoment(apiDate) {
    return "";
  }
}

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityListComponent],
      providers: [{ provide: WeatherDetailService, useClass: MockWeatherDetailService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should currentSelectedCity ', () => {
    expect(component.currentSelectedCity('London')).toBeUndefined();
  });

});
