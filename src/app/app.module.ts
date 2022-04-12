import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './lib/containers/root/root.component';
import { FolderComponent } from './lib/components/folder/folder.component';
import { FolderIconComponent } from './lib/components/folder-icon/folder-icon.component';
import { FolderDisplayComponent } from './lib/components/folder-display/folder-display.component';
import { TrashIconComponent } from './lib/components/trash-icon/trash-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    FolderComponent,
    FolderIconComponent,
    FolderDisplayComponent,
    TrashIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
