import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {
  form: any;
  fileData: any[] = [];
  showFileLimitError = false;
  showFileTypeError = false;
  showFileSizeError = false;
  selectedFileNames: Set<string> = new Set<string>();
  isLoading: boolean = false;
  @ViewChild('filePicker') filePicker!: ElementRef;

  constructor(
    private documentService: DocumentsService,
    private fireStorage: AngularFireStorage,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      createdBy: new FormControl(localStorage?.getItem('userId')),
      title: new FormControl('', {
        validators: [Validators.required]
      }),
      content: new FormControl('', { validators: [Validators.required] }),
      fileUrls: new FormControl([], { validators: [Validators.required] }),
      createdAt: new FormControl(new Date())
    });
  }

  //This is used to select the files.
  async onImagePicked(event: any) {
    const files = event?.target?.files;
    if (files && files.length > 0) {
      if (this.fileData.length + files.length <= 3) {
        for (const file of files) {
          if (file.size > 3 * 1024 * 1024) {
            this.showFileSizeError = true;
            return; // Exit the loop and prevent adding the file
          }

          if (!this.selectedFileNames.has(file.name)) {
            if (file.type === 'application/pdf') {
              this.form.get('fileUrls').markAsPristine();
              this.selectedFileNames.add(file.name);
              this.fileData.push(file);
              this.showFileTypeError = false;
              this.showFileLimitError = false;
              this.showFileSizeError = false;
            } else {
              this.showFileTypeError = true;
            }
          }
        }
      }
      else {
        this.showFileLimitError = true;
      }
    }

    this.filePicker.nativeElement.value = '';
  }

  //This is used to remove file.
  removeFile(file: any) {
    this.showFileLimitError = false;
    const index = this.fileData.indexOf(file);
    if (index !== -1) {
      this.fileData.splice(index, 1);
      this.selectedFileNames.delete(file.name); // Remove the file name from the Set
    }
  }

  //This is used to upload the file in the server.
  async uploadFilesToServer(): Promise<string[]> {
    const fileUrls = [];

    for (const file of this.fileData) {
      const path = `pdf/${file.name}`;
      const uploadTask = await this.fireStorage?.upload(path, file);
      const url = await uploadTask?.ref?.getDownloadURL();
      if (url) {
        fileUrls.push(url);
      }
    }

    return fileUrls;
  }

  //This is used to save document.
  async onSaveDocuments() {
    this.form.markAllAsTouched();
    if (this.fileData.length > 0) {
      this.form.get('fileUrls').clearValidators();
      this.form.get('fileUrls').updateValueAndValidity();
    }
    else {
      this.form.get('fileUrls').clearValidators();
      this.form.get('fileUrls').setValidators([Validators.required]);;
    }
    if (this.form?.valid) {
      this.isLoading = true;
      const fileDataWithUrls = await this.uploadFilesToServer();

      // Map file names and URLs to an array of objects
      const filesWithNamesAndUrls = fileDataWithUrls.map((url, index) => ({
        name: this.fileData[index].name,
        url: url
      }));

      // Update the fileUrls field with the array of objects
      this.form?.patchValue({
        fileUrls: filesWithNamesAndUrls
      });

      this.documentService.addDocuments(this.form.value).subscribe({
        next: (res) => {
          this.router?.navigate(['/dashboard'])
          this.toastr.success('Document added successfully!')
        },
        error: (err) => {
        }
      });
    }
  }
}
