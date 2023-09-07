import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { AuthGuard } from './auth/auth.guard';
import { DocumentCreateComponent } from './documents/document-create/document-create.component';
import { DocumentsResolver } from './documents/document-list/documents-resolver';
import { DocumetDetailsComponent } from './documents/documet-details/documet-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: DocumentListComponent, canActivate: [AuthGuard], resolve: [DocumentsResolver]},
  { path: "create", component: DocumentCreateComponent, canActivate: [AuthGuard] },
  { path: "detail/:id", component: DocumetDetailsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
