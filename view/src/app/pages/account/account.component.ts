import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// imports
import * as moment from 'moment';

import {AccountService} from './account.service';
import {DataStorage} from './../../resources/data-storage';

// dependencies
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;
  private isLoading: boolean;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private params: ActivatedRoute,
    private service: AccountService,
    private storage: DataStorage,
    private cookieService: CookieService) {
    this.form = fb.group({
      username: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50) ]]
    });
  }

  ngOnInit() {
    this.logout();
    this.returnUrl = this.params.snapshot.queryParams['returnUrl'] || '/';
    this.storage.isLoading.subscribe(
      status => this.isLoading = status
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
  }

  login(token, user, expires) {
    this.cookieService.set('token', token, expires);
    this.cookieService.set('user', user, expires);
  }

  onSubmit() {
    this.service.login(this.form.getRawValue()).subscribe(
        dados => {
          const expiresAt = moment().add(dados.body['expires'], 'ms').toDate();
          this.login(dados.body['token'], JSON.stringify(dados.body['user']), expiresAt);
          this.router.navigate([this.returnUrl]);
        }
      );
  }
}
