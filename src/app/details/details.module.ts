import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [SharedModule, DetailsRoutingModule],
  exports: [DetailsComponent],
  providers: [],
})
export class DetailsModule {}
