import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'; 

export const firebaseConfig = {
  apiKey: "AIzaSyDfCcTga9KeOvwgElEjufl2RV0eNthT-pY",
  authDomain: "primerproyecto-bbbad.firebaseapp.com",
  databaseURL: "https://primerproyecto-bbbad.firebaseio.com",
  storageBucket: "primerproyecto-bbbad.appspot.com",
  messagingSenderId: "721848299257"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
