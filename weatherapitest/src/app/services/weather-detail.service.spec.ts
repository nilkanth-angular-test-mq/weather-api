import { TestBed } from '@angular/core/testing';

import { WeatherDetailService } from './weather-detail.service';

describe('WeatherDetailService', () => {
  let service: WeatherDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
