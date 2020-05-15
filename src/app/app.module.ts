import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/page/login/login.component';
import { RegistrationComponent } from './components/page/registration/registration.component';
import { MainpageComponent } from './components/page/mainpage/mainpage.component';
import { CountryComponent } from './components/admin-child/country/country.component';
import { DiseaseComponent } from './components/admin-child/disease/disease.component';
import { NotFoundComponent } from './components/page/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AnimalsComponent } from './components/user-child/animals/animals.component';
import { EpidemicComponent } from './components/user-child/epidemic/epidemic.component';
import { StatisticComponent } from './components/user-child/statistic/statistic.component';
import { AnimalClassComponent } from './components/admin-child/animal-class/animal-class.component';
import { AnimalBreedComponent } from './components/admin-child/animal-breed/animal-breed.component';
import { GraftComponent } from './components/admin-child/graft/graft.component';
import { UsersComponent } from './components/admin-child/users/users.component';
import { AppFooterComponent } from './components/page/page-component/app-footer/app-footer.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { DiseaseModalComponent } from './components/admin-child/modal/disease-modal/disease-modal.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { AnimalInfoComponent } from './components/user-child/animal-child/animal-info/animal-info.component';
import { AnimalGraftsComponent } from './components/user-child/animal-child/animal-grafts/animal-grafts.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    RegistrationComponent,
    MainpageComponent,
    CountryComponent,
    DiseaseComponent,
    NotFoundComponent,
    AnimalsComponent,
    EpidemicComponent,
    StatisticComponent,
    AnimalClassComponent,
    AnimalBreedComponent,
    GraftComponent,
    UsersComponent,
    AppFooterComponent,
    DiseaseModalComponent,
    AnimalInfoComponent,
    AnimalGraftsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    [SweetAlert2Module.forRoot()],
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DiseaseModalComponent],
})
export class AppModule { }
