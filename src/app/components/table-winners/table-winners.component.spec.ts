import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWinnersComponent } from './table-winners.component';

describe('TableWinnersComponent', () => {
  let component: TableWinnersComponent;
  let fixture: ComponentFixture<TableWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
