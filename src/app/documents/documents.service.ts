import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Document } from "./document.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  //Use to save documents.
  addDocuments(documentData: Document) {
    return this.http.post(environment.serverURL + '/documents.json', documentData);
  }

 //Use to fetch documents from server.
  getDocuments() {
    return this.http?.get(environment?.serverURL + '/documents.json')
      .pipe(map((documents: any) => {
        return Object?.keys(documents)?.map((key) => ({
          id: key, // Include the unique key as an "id" property.
          ...documents[key],
        }));
      }));   
  }

   //Use to delete document from server.
  deleteDocument(id: string): Observable<void> {
    const deletionPromise = this.db?.object('/documents/' + id).remove();
    return from(deletionPromise);
  }

   //Use to fetch perticular document from serve.
  getDocumentsById(id: string): Observable<any> {
    return this.db?.object('/documents/' + id).valueChanges();
  }
}
