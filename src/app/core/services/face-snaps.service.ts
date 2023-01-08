import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap } from "rxjs";
import { FaceSnap } from "../models/face-snap.model";

// ce service sera inséré à la racine
@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    constructor(private http: HttpClient) {}

    // ici on utilise le serveur localhost3000 lancé par le fichier VS code fullStackFaceSnap
    getAllFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }
// literal type : snapType: 'snap' | 'unsnap' : limite la possibilité des arguments
    snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,
                snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
        );
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string}): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
            // remet les facesnaps en ordre croissant d'id
            map(facesnaps => [...facesnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)),
            // prendre le dernier FaceSnap du tableau
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
            map(previousFaceSnap =>({
                ...formValue,
                snaps: 0,
                createdDate: new Date(),
                id: previousFaceSnap.id + 1
            })),
            switchMap(newFacesnap => this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap))
        );
    }
}