import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceFormComponent } from './devices/device-form/device-form.component';

const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/new', component: DeviceFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
