import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ClassifierServiceService} from './services/classifier-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: 'projects/:id', component: AddProjectComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: '**', redirectTo: 'projects'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [ClassifierServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
