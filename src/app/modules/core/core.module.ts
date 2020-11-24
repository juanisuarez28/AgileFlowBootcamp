import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import {ContentComponent} from './components/content/content.component';


@NgModule({
	declarations: [ContentComponent],
	imports: [
		MaterialModule,
		CommonModule,
		TranslateModule
	],
	exports: [
		MaterialModule,
		CommonModule,
		TranslateModule,
		ContentComponent
	],
	providers: []
})
export class CoreModule {
}
