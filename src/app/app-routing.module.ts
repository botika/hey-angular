import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from './table/table.module';
import { DetailsModule } from './details/details.module';
import { ErrorModule } from './error/error.module';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '**', component: ErrorComponent },
  {
    path: '',
    loadChildren: async () =>
      (await import('./table/table.module')).TableModule,
  },
  {
    path: 'pokemon/:name',
    loadChildren: async () =>
      (await import('./details/details.module')).DetailsModule,
  },
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [
    DetailsModule,
    ErrorModule,
    TableModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
