import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  interval$!: Observable<string>;

  ngOnInit(): void {
    // observable : objet qui émet des valeurs au cours du temps
    // ici pipe permet de transformer/filtrer l'emission de l'observable (c'est un opérateur)
    // map défini la transformation à effectuer
    // filter défini le filtre à effectuer
    this.interval$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
        `Je suis ${value} et je suis pair` :
        `Je suis ${value} et je suis impair`
      ),
      // effet secondaire tap, permet de réagir à l'observable sans toucher à son émission
      tap(text => this.logger(text))
    );
  }

  logger(text: string) {
    console.log(`Log: ${text}`);
  }
}
