import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  userEmail!: string;

  // pour faire le lien sur le boutton d'accueil
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // méthode qui va nous rediriger vers l'url facesnaps en restant une single page application
  onContinue(): void {
    this.router.navigateByUrl('facesnaps')
  }

  onSubmitForm(form: NgForm): void {
    console.log(form.value);
  }
}
