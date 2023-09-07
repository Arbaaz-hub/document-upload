import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentCreateComponent } from './documents/document-create/document-create.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { DocumetDetailsComponent } from './documents/documet-details/documet-details.component';

import { DeleteConfirmationComponent } from './documents/delete-confirmation/delete-confirmation.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DocumentListComponent,
    DocumentCreateComponent,
    DocumetDetailsComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    AngularFireModule.initializeApp(environment?.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
