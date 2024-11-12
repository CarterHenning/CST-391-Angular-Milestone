import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMovieComponent } from './display-movie.component';

describe('DisplayMovieComponent', () => {
  let component: DisplayMovieComponent;
  let fixture: ComponentFixture<DisplayMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
