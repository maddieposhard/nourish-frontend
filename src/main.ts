import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  ...appConfig,                  // keep your existing providers
  providers: [
    ...(appConfig.providers || []), // include existing providers
    provideAnimations(),              // add this so Material components work
    importProvidersFrom(MatNativeDateModule)
  ]
}).catch((err) => console.error(err));
