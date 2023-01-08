import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  // injection d'un service
  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buttonText = 'Like';
    // récupération de l'id
    // + permet de changer un string contenant des chiffres en Number
    const faceSnapId = +this.route.snapshot.params['id'];
    // récupération du snap correspondant
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId)
  }

  onSnap(faceSnapId: number) {
    if(this.buttonText === 'Like') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.buttonText = "Déjà liké")
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = "Like")
      );
    } 
  }

}
