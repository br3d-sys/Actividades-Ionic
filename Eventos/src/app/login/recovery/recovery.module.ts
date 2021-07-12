import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPageRoutingModule } from './recovery-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

import { RecoveryPage } from './recovery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    RecoveryPageRoutingModule
  ],
  declarations: [RecoveryPage]
})
export class RecoveryPageModule {}
