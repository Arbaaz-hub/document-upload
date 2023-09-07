import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { DocumentsService } from '../documents.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsResolver implements Resolve<Observable<any>> {
  constructor(private documentService: DocumentsService){}

  resolve(): Observable<any> {
    return this.documentService.getDocuments();
  }
}