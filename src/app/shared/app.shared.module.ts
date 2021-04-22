import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/* [ Custom Pipe ] */
import { TruncatePipe, PhonePrefixPlusPipe } from './app.pipe';
/* [ Shared Plugins ] */
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
@NgModule({
  imports: [
    SlickCarouselModule,
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
    FootBarComponent
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
    SlickCarouselModule,
    SlideshowModule,
    NavBarComponent,
    FootBarComponent
  ],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule { }
