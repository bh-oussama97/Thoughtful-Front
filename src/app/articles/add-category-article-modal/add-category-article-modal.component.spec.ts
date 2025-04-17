import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryArticleModalComponent } from './add-category-article-modal.component';

describe('AddCategoryArticleModalComponent', () => {
  let component: AddCategoryArticleModalComponent;
  let fixture: ComponentFixture<AddCategoryArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryArticleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
