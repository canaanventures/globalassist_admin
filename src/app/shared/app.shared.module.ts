import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/* [ Custom Pipe ] */
import { TruncatePipe, PhonePrefixPlusPipe } from './app.pipe';
/* [ Shared Plugins ] */
import { SlideshowModule } from 'ng-simple-slideshow';
/* [ shared Module ] */
import {
  DecimalNumberOnlyDirective,
  NumberOnlyDirective,
  CompareValidatorDirective,
  NoWhitespaceDirective,
  IBMPhoneDirective,
  NumberZeroGreaterDirective
} from './app.directive';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FootBarComponent } from '../components/foot-bar/foot-bar.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
@NgModule({
  imports: [
    SlideshowModule,
  ],
  declarations: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective,
    NavBarComponent,
    FootBarComponent,
    SideBarComponent
  ],
  providers: [
  ],
  bootstrap: [],
  exports: [
    DecimalNumberOnlyDirective,
    NumberOnlyDirective,
    CompareValidatorDirective,
    NoWhitespaceDirective,
    TruncatePipe,
    PhonePrefixPlusPipe,
    IBMPhoneDirective,
    NumberZeroGreaterDirective,
    SlideshowModule,
    NavBarComponent,
    SideBarComponent,
    FootBarComponent
  ],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule { }
