import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"danotes-4b412","appId":"1:201815795974:web:c7ffd2b560fa384e581687","storageBucket":"danotes-4b412.appspot.com","apiKey":"AIzaSyBwAwHqhfHJ-te6rIH1eN5f3vuuFbT2xJk","authDomain":"danotes-4b412.firebaseapp.com","messagingSenderId":"201815795974","measurementId":"G-5DFKCN9433"})), provideFirestore(() => getFirestore())]
};
