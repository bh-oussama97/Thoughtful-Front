import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewContributionsModalComponent } from "./view-contributions-modal.component";

describe("ViewContributionsModalComponent", () => {
  let component: ViewContributionsModalComponent;
  let fixture: ComponentFixture<ViewContributionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewContributionsModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewContributionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
