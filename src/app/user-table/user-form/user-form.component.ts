import { AfterViewChecked, Component,ElementRef,EventEmitter,inject, OnInit, Output, ViewChild } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user-info.model';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit{
 
  userInfo:UserInfoService=inject(UserInfoService);
  workTypes:string[]=[];
  closeIcon=faXmark;
  userWorkOutTypes:{type:string,minutes:number}[]=[];
  @Output() onFormCloseButtonClicked:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() onUserSubmitedForm:EventEmitter<User>=new EventEmitter<User>();
  @ViewChild('workoutMinutes') workoutMinutes:ElementRef;
  @ViewChild('selectOptions') selectedWorkoutTypes:ElementRef;
  ngOnInit()
  {
    this.workTypes=[...this.userInfo.workOutTypes];
  }
  onCloseButtonClicked()
  {
     this.onFormCloseButtonClicked.emit(false);
  }
  onWorkoutTypeSelected()
  {
    this.workoutMinutes.nativeElement.disabled=false;
    this.workoutMinutes.nativeElement.value='';  
  }
  onAddWorkoutButtonClicked()
  {
      let objWorkOut={type:this.selectedWorkoutTypes.nativeElement.value,
      minutes:Number(this.workoutMinutes.nativeElement.value)};  
      this.userWorkOutTypes.push(objWorkOut);
      this.workTypes.forEach((item,index)=>{
           if(item==objWorkOut.type)
           {
             this.workTypes.splice(index,1);
           }
      })
      this.selectedWorkoutTypes.nativeElement.value='';
      this.workoutMinutes.nativeElement.value='';
      this.workoutMinutes.nativeElement.disabled=true;
  }
  onRemoveSelectedWorkout(workoutType:string)
  {
    this.workTypes.push(workoutType);
     this.userWorkOutTypes.forEach((item,index)=>{
              if(workoutType==item.type)
              {
                this.userWorkOutTypes.splice(index,1);
                return;
              }
     })
  }
  onFormDataSubmitted(formData:NgForm)
  {
    let newUserObj:User={
       id:null,
       name:formData.value.userName,
       workouts:this.userWorkOutTypes,
    }
    this.onUserSubmitedForm.emit(newUserObj);
    this.onFormCloseButtonClicked.emit(false);
  }
  onMinuteEntered()
  {
        
  }
}
