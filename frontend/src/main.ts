// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Essencial para os serviços HTTP
    importProvidersFrom(
      BrowserAnimationsModule, // Necessário para ngx-toastr
      ToastrModule.forRoot({ // Configuração do Toastr
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
    )
  ]
}).then(() => {});
