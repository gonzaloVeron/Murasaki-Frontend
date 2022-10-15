import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig){}
  
  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}
