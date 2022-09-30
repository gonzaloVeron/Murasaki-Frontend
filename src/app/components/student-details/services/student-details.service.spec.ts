/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentDetailsService } from './student-details.service';

describe('Service: StudentDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentDetailsService]
    });
  });

  it('should ...', inject([StudentDetailsService], (service: StudentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
