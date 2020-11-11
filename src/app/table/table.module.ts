import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TableComponent } from './table.component';
import { GenerationApiService } from '../services/generation-api.service';
import { QueryService } from '../services/query.service';
import { SharedModule } from '../shared/shared.module';
import { TableRoutingModule } from './table-routing.module';

@NgModule({
  declarations: [TableComponent],
  imports: [SharedModule, TableRoutingModule, FormsModule],
  exports: [TableComponent],
  providers: [GenerationApiService, QueryService],
})
export class TableModule {}
