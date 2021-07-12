import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('./songs/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./songs/delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./songs/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'read/:id',
    loadChildren: () => import('./songs/read/read.module').then( m => m.ReadPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./songs/list/list.module').then( m => m.ListPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
