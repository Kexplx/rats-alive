import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RatComponent } from './rat/rat.component';
import { CampaignComponent } from './campaign/campaign.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CampaignComponent }];

@NgModule({
  declarations: [AppComponent, RatComponent, CampaignComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
