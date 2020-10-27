import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';


@NgModule({
	declarations: [],
	imports: [
		MaterialModule,
		CommonModule,
		TranslateModule
	],
	exports: [
		MaterialModule,
		CommonModule,
		TranslateModule
	],
	providers: []
})
export class CoreModule {
}
