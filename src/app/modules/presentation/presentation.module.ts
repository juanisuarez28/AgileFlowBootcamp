import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSnackbarComponent } from './component/message-snackbar/message-snackbar.component';
import { CoreModule } from '../core/core.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';


@NgModule({
	declarations: [
		MessageSnackbarComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		FlexModule,
		FlexLayoutModule
	],
	exports: [
		MessageSnackbarComponent
	]
})
export class PresentationModule {
}
