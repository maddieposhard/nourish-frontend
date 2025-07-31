import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { NavbarComponent } from "../../features/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [ProfileComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
