import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  // input permet l'injection d'une propriété depuis l'extérieur d'un component (ici model)
@Input() faceSnap!: FaceSnap;
  buttonText!: string;

  // injection d'un service
  constructor(private faceSnapsService: FaceSnapsService,
              private router: Router) { }

  ngOnInit(): void {
    this.buttonText = 'Like';
  }

  onSnap() {
    if(this.buttonText === 'Like') {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.buttonText = "Déjà liké";
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.buttonText = "Like";
    }
      
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
  }
}
