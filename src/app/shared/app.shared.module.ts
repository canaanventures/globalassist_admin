import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/* [ Custom Pipe ] */
import { TruncatePipe, PhonePrefixPlusPipe } from './app.pipe';
/* [ Shared Plugins ] */
import { SlideshowModule } from 'ng-simple-slideshow';
import { SidebarModule } from 'ng-sidebar';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

/* [ shared Module ] */
import {
  DecimalNumberOnlyDirective,
  NumberOnlyDirective,
  CompareValidatorDirective,
  NoWhitespaceDirective,
  IBMPhoneDirective,
  NumberZeroGreaterDirective
} from './app.directive';
@NgModule({
  imports: [
    SlideshowModule,
    SidebarModule
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
    SidebarModule,
    DxDataGridModule
  ],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule { }
