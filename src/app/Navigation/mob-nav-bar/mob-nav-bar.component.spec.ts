import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobNavBarComponent } from './mob-nav-bar.component';

describe('MobNavBarComponent', () => {
  let component: MobNavBarComponent;
  let fixture: ComponentFixture<MobNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
