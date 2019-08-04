import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// dependencies
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../../../../pages/account/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user: Account;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if ( this.cookieService.get('user') ) {
      this.user = JSON.parse(this.cookieService.get('user'));
    }
  }

  sair() {
    this.router.navigate(['/acesso']);
  }

}
