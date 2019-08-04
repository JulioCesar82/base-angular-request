import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// imports


@Injectable()
export class DataStorage {

  public domainURL: string = document.location.origin;

  public isLoading = new BehaviorSubject<boolean>(false);
  public toggleLoading() {
    this.isLoading.next(!this.isLoading);
  }
  
}
