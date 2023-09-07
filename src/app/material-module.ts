import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatBadgeModule} from "@angular/material/badge"
import {MatDialogModule} from '@angular/material/dialog';
import {  MatSidenavModule, MatListModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

@NgModule({
exports:[
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
]
})
export class MaterialModule{}