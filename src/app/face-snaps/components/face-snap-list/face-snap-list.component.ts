import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps$!: Observable<FaceSnap[]>
  // rajouter $ car c'est un observable
  // subject : observable que l'on peut faire emmettre à la demande
  private destroy$!: Subject<boolean>;

  // injection du service FaceSnapsService
  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();


    // subscribe permet de souscrire à un observable dans un fichier ts
    interval(1000).pipe(
      /*take permet de récupérer les x premières émissions de l'observable puis
      de le compléter et donc de le détruire, évite fuite de mémoire*/
      // take(2),
      // takeUntil permet la destruction d' un observable lors de la destruction du component
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }

  // permet la destruction d' un observable lors de la destruction du component 
  ngOnDestroy() {
    // next force à émettre la méthode d'un Subject
    this.destroy$.next(true)
  }

}
