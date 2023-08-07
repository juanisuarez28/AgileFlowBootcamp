import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LabelComponent } from './components/label/label.component';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [
	LabelComponent],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule
	],
	exports: [
		FlexLayoutModule,
		RouterModule
	]
})
export class PresentationModule {
}
