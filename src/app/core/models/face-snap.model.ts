export class FaceSnap {
    id!: number;
    title!: string;
    description!: string;
    imageUrl!: string;
    createdDate!: Date;
    snaps!: number;
    // ? cette propriété est donc optionnelle
    location?: string;
}