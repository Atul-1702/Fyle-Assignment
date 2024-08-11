import { TestBed } from '@angular/core/testing';
import { UserInfoService } from './user-info.service';
import { User } from '../models/user-info.model';

describe('UserInfoService', () => {
  let service: UserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a list of workout types', () => {
    expect(service.workOutTypes.length).toBeGreaterThan(0);
    expect(service.workOutTypes).toContain('Running');
    expect(service.workOutTypes).toContain('Cycling');
  });

  it('should have a user list', () => {
    expect(service.userList.length).toBe(3);

    const user1 = service.userList[0];
    expect(user1.id).toBe(1);
    expect(user1.name).toBe('John Doe');
    expect(user1.workouts.length).toBe(2);
    expect(user1.workouts[0].type).toBe('Running');
    expect(user1.workouts[0].minutes).toBe(30);

    const user2 = service.userList[1];
    expect(user2.id).toBe(2);
    expect(user2.name).toBe('Jane Smith');
    expect(user2.workouts.length).toBe(2);
    expect(user2.workouts[0].type).toBe('Swimming');
    expect(user2.workouts[0].minutes).toBe(60);

    const user3 = service.userList[2];
    expect(user3.id).toBe(3);
    expect(user3.name).toBe('Mike Johnson');
    expect(user3.workouts.length).toBe(2);
    expect(user3.workouts[0].type).toBe('Yoga');
    expect(user3.workouts[0].minutes).toBe(50);
  });

  it('should ensure each user has valid workout types', () => {
    service.userList.forEach(user => {
      user.workouts.forEach(workout => {
        expect(service.workOutTypes).toContain(workout.type);
      });
    });
  });
});
