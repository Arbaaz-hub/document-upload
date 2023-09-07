import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-documet-details',
  templateUrl: './documet-details.component.html',
  styleUrls: ['./documet-details.component.css']
})
export class DocumetDetailsComponent implements OnInit {
  currentDate: any = '';
  documentData: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private documentService: DocumentsService) { }

  ngOnInit(): void {
    let id: any = this.route?.snapshot?.paramMap?.get('id');
    this.getDocumentDetails(id);
  }

  //Used to get perticular document.
  getDocumentDetails(id: string){
    this.documentService.getDocumentsById(id)
       .subscribe({
        next: (res) => {
            this.documentData = res;
            this.isLoading = false;
        },
        error: (err) => {}
      });
  }

}
