// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Importa RouterModule para router-outlet e routerLink
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
