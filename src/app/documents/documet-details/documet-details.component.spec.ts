import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumetDetailsComponent } from './documet-details.component';

describe('DocumetDetailsComponent', () => {
  let component: DocumetDetailsComponent;
  let fixture: ComponentFixture<DocumetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
