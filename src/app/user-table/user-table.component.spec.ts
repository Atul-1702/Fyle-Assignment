import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { UserInfoService } from '../services/user-info.service';
import { User } from '../models/user-info.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userInfoService: UserInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      providers: [UserInfoService],
      imports: [FontAwesomeModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    userInfoService = TestBed.inject(UserInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userList on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userList.length).toBeGreaterThan(0);
    expect(component.userList).toEqual(userInfoService.userList);
  });

  it('should return all workouts as a string', () => {
    const workouts = [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }];
    const result = component.getAllWorkOutsByUser(workouts);
    expect(result).toBe('Running, Cycling');
  });

  it('should return the total workout minutes', () => {
    const workouts = [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }];
    const result = component.getTotalWorkOutMinutesByUser(workouts);
    expect(result).toBe(75);
  });

  it('should set userFormWindowStatus to true on onAddUserButtonClicked', () => {
    component.onAddUserButtonClicked();
    expect(component.userFormWindowStatus).toBeTrue();
  });

  it('should add a new user and scroll into view', () => {
    const userData: User = new User(0, 'New User', [{ type: 'Running', minutes: 30 }]);
    const tableRef = document.createElement('div');
    spyOn(tableRef, 'scrollIntoView');
    
    component.onNewUserCreated(userData, tableRef);

    expect(userData.id).toBe(userInfoService.userList.length);
    expect(component.userList).toContain(userData);
    expect(userInfoService.userList).toContain(userData);
    expect(tableRef.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should filter users based on search value (suggestion)', () => {
    component.onSearchValueGetSuggestion('john');
    expect(component.userList.length).toBe(1);
    expect(component.userList[0].name).toBe('John Doe');
  });

  it('should filter users based on search value (exact match)', () => {
    component.onSearchValueGet('john');
    expect(component.userList.length).toBe(1);
    expect(component.userList[0].name).toBe('John Doe');
  });

  it('should apply filter options correctly', () => {
    component.applyFilterOptions(['Running']);
    expect(component.userList.length).toBe(2); // Expecting 2 users that have 'Running'
  });

  it('should remove a tag and apply filters', () => {
    component.filterTags = ['Running', 'Cycling'];
    component.onTagRemoved('Running');
    expect(component.filterTags).toEqual(['Cycling']);
    expect(component.userList.length).toBe(2); // Expecting 2 users with 'Cycling'
  });

  it('should reset list to initial state', () => {
    component.setListIntialState();
    expect(component.userList).toEqual(userInfoService.userList);
    expect(component.filterTags.length).toBe(0);
  });

  it('should change items per page', () => {
    component.onItemsPerPageChange('10');
    expect(component.itemsPerPage).toBe(10);
  });

  it('should calculate the correct total number of pages', () => {
    component.itemsPerPage = 2;
    const totalPages = component.getTotalNumberOfPages();
    expect(totalPages).toBe(Math.ceil(component.userList.length / 2));
  });
});
