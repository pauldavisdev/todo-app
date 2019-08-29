import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ]
})
export class MaterialModule {}
