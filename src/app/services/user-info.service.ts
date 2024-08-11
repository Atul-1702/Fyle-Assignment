import { Injectable } from '@angular/core';
import { User } from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  workOutTypes:string[]=['Running','Cycling','Swimming','Yoga','Jogging','Dancing','Gymnastics','Aerobics'];
  userList: User[] = [
    new User(1, 'John Doe', [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 },
    ]),
    new User(2, 'Jane Smith', [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 },
    ]),
    new User(3, 'Mike Johnson', [
      { type: 'Yoga', minutes: 50 },
      { type: 'Cycling', minutes: 40 },
    ]),
  ];
  constructor() {}
}
