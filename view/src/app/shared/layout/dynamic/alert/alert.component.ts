import { Component, OnInit } from '@angular/core';

// imports
import {Alert} from './alert';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  private mensagem: Alert;

  constructor(private service: AlertService) {
  }

  ngOnInit() {
    this.service.getMensagem().subscribe(
      mensagem => this.mensagem = mensagem
    );
  }
}
