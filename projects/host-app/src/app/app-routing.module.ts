import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GRAFIK_APP_URL } from './core/remote-constant';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routerComponents = [HeaderPageComponent, SidebarComponent];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: (() => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule))
  },
  {

    path: 'chart',
    loadChildren: () => {
      return loadRemoteModule({
        // type: 'module',x 
        remoteEntry: GRAFIK_APP_URL,
        remoteName: "grafikApp",
        exposedModule: './ChartDataModule',
      }).then(m => m.ChartDataModule).catch(err => console.log(err))
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
