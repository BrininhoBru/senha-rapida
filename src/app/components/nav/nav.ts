import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UnderlineAnimationDirective } from '../../shared/directives/underline-animation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatToolbarModule, MatIconModule, UnderlineAnimationDirective, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class NavComponent {

}
