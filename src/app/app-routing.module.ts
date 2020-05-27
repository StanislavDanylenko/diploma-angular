import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainpageComponent} from './components/page/mainpage/mainpage.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {LoginComponent} from './components/page/login/login.component';
import {RegistrationComponent} from './components/page/registration/registration.component';
import {CountryComponent} from './components/admin-child/country/country.component';
import {DiseaseComponent} from './components/admin-child/disease/disease.component';
import {NotFoundComponent} from './components/page/not-found/not-found.component';
import {AnimalsComponent} from './components/user-child/animals/animals.component';
import {StatisticComponent} from './components/user-child/statistic/statistic.component';
import {EpidemicComponent} from './components/user-child/epidemic/epidemic.component';
import {AnimalClassComponent} from './components/admin-child/animal-class/animal-class.component';
import {UsersComponent} from './components/admin-child/users/users.component';
import {AnimalBreedComponent} from './components/admin-child/animal-breed/animal-breed.component';
import {GraftComponent} from './components/admin-child/graft/graft.component';
import {AuthGuard} from './security/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '.', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainpageComponent},
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'animals',
        component: AnimalsComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'epidemic',
        component: EpidemicComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'country',
        component: CountryComponent,
      },
      {
        path: 'disease',
        component: DiseaseComponent,
      },
      {
        path: 'animalClass',
        component: AnimalClassComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'animalBreed',
        component: AnimalBreedComponent,
      },
      {
        path: 'graft',
        component: GraftComponent,
      },
    ],
  },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
