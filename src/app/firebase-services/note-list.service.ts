import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { elementAt, Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  items$;
  items;
  firestore: Firestore = inject(Firestore);

  //unsubSingle;
  unsubList;

  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      })
    });

    /*this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "CBR5v5q2Fh7EKGgmh6Vh", (element) => {
    } ));*/

    //this.unsubSingle();

    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      })
    })

  }

  ngOnDestroy(){
    this.unsubList();
    this.items.unsubscribe();
  }

  getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getNotesRef(){
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(colId:string, docId:string ){
    return doc(collection(this.firestore, colId), docId);
  }
}
