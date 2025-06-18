import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceFormComponent } from './devices/device-form/device-form.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';

export const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/new', component: DeviceFormComponent },
  { path: 'devices/edit/:id', component: DeviceFormComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: '**', redirectTo: '/devices'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
