import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

// routing
import {AuthGuard} from './app.auth.guard';
import {AppRoutingModule} from './app.routing';
import {CookieService} from 'ngx-cookie-service';

// plugins
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {LaddaModule} from 'angular2-ladda';
import {NgxBootstrapModule} from './resources/ngx-bootstrap/ngx-bootstrap.module';

// modules
import {ThemeModule} from './shared/layout/fixed/theme.module';
import {PagesModule} from './pages/pages.module';
import {DirectivesModule} from './shared/directives/directives.module';
import {ComponentsModule} from './shared/layout/dynamic/components.module';

// containers
import {AppComponent} from './app.component';
import {ContainersModule} from './shared/layout/containers/containers.module';

// storage
import {DataStorage} from './resources/data-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // plugins
    ChartsModule,
    LaddaModule,
    NgxBootstrapModule,
    // modules
    ThemeModule,
    PagesModule,
    DirectivesModule,
    ComponentsModule,
    AppRoutingModule,
    // layout
    ContainersModule
  ],
  providers: [DataStorage, AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
