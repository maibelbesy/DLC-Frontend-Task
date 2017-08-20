import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { UsersService } from './users/users.service';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './users/editUser/editUser.component';

import { AppRoutes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
