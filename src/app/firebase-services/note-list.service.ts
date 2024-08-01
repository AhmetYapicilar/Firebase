import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { elementAt, Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  firestore: Firestore = inject(Firestore);
  unsubTrash;
  unsubNotes;

  //unsubSingle;

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNoteList();

    //this.unsubSingle = onSnapshot(this.getSingleDocRef("Trash", "aB7EQf1GxNb83rwG2lQ4"), (element) => {
    //  console.log(element.data());
    //} );

   /* this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      })
    }) */

  }

  async addNote(item: Note, colId: "Notes" | "Trash"){
    await addDoc(this.getNotesRef(), item).catch(
      (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("Document written with ID: ", docRef) }
    )
  }

  async updateNote(note: Note){
    if(note.id){
      let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
      await updateDoc(docRef, this.getCleanJson(note)).catch(
        (err) => {console.error(err);}
      )
    }
  }

  async deleteNote(colId: "Notes" | "Trash", docId:string){
    await deleteDoc(this.getSingleDocRef(colId, docId)).catch(
      (err) => {
        console.error(err);
      }
    )
  }

  getCleanJson(note: Note):{} {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked,
    }
  }

  getColIdFromNote(note: Note){
    if(note.type == "Note"){
      return 'Notes'
    } else {
      return 'Trash'
    }
  }

  ngOnDestroy(){
    this.unsubNotes();
    this.unsubTrash();
    //this.items.unsubscribe();
  }

  subTrashList(){
   return onSnapshot(this.getTrashRef(), (list) => {
    this.trashNotes = [];
      list.forEach(element => {
       this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      })
    })
  }

  subNoteList(){
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      })
    })
  }

  getTrashRef(){
    return collection(this.firestore, 'Trash');
  }

  getNotesRef(){
    return collection(this.firestore, 'Notes');
  }

  getSingleDocRef(colId:string, docId:string ){
    return doc(collection(this.firestore, colId), docId);
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
      type: obj.type || "Note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false
    }
  }
}
