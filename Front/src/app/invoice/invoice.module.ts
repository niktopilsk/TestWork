import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceStatusPipePipe } from '../directives/status.pipe';
import { InvoicePaymentPipePipe } from '../directives/paymentMethod.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InvoiceEditorComponent } from './components/invoice-editor/invoice-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceAdderComponent } from './components/invoice-adder/invoice-adder.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceStatusPipePipe,
    InvoicePaymentPipePipe,
    InvoiceEditorComponent,
    InvoiceAdderComponent
  ],
  exports: [
    InvoiceComponent,
    InvoiceStatusPipePipe,
    InvoicePaymentPipePipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: []
})
export class InvoiceModule {
}
