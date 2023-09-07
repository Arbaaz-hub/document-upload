import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentsList: any[] = [];
  isLoading: boolean = true;

  constructor(private documentService: DocumentsService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  // This method is used to getting all records.
  getDocuments(): void {
    const userId = localStorage?.getItem('userId');
    this.documentService?.getDocuments()
      .subscribe({
        next: (resData) => {
          this.documentsList = resData.filter((elements: any) => elements?.createdBy === userId);
          this.isLoading = false;
        },
        error: (err: any) => { console?.log(err) }
      })
  }

  // This is used for deleting the document.
  deleteDocument(id: string): void {
    this.documentService.deleteDocument(id)
      .subscribe({
        next: (res: any) => {
          this.getDocuments();
          this.toastr.success('Document Deleted Successfully!')
        },
        error: (err) => { }
      });
  }
}
