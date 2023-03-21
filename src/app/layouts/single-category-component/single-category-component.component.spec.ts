import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryComponentComponent } from './single-category-component.component';

describe('SingleCategoryComponentComponent', () => {
  let component: SingleCategoryComponentComponent;
  let fixture: ComponentFixture<SingleCategoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCategoryComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCategoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
