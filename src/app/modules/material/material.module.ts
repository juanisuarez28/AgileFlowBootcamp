import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
	],
	exports: [
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
	]
})
export class MaterialModule {
}
