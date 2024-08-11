import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTableComponent } from './user-table/user-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './user-table/search-bar/search-bar.component';
import { UserFormComponent } from './user-table/user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './user-table/filter/filter.component';
import { GraphComponent } from './user-table/graph/graph.component';


@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    SearchBarComponent,
    UserFormComponent,
    FilterComponent,
    GraphComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
