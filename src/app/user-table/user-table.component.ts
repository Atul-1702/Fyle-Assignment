import { Component,ElementRef,inject, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { User } from '../models/user-info.model';
import { faXmark,faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { faBackward,faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{
  userInfoSevice:UserInfoService=inject(UserInfoService);
  userList:User[]=[];
  userFormWindowStatus:boolean=false;
  filterWindowToggle:boolean=false;
  removeIcon=faXmark;
  filterTags:string[]=[];
  rotateBack=faArrowRotateBack;
  itemsPerPage:number=5;
  pageNoSelected=0;
  prevIcon=faBackward;
  nextIcon=faForward;
  ngOnInit()
  {
    
    this.userList=[...this.userInfoSevice.userList];
  }
  getAllWorkOutsByUser(workouts:{type:string,minutes:number}[])
  {
    return workouts.map((item)=>item.type).join(', ');
  }
  getTotalWorkOutMinutesByUser(workouts:{type:string,minutes:number}[])
  {
    return workouts.reduce((acc,curr)=>acc+curr.minutes,0);
  }
  onAddUserButtonClicked()
  {
       this.userFormWindowStatus=true;
  }
  onNewUserCreated(userData:User,tableRef:HTMLElement)
  {
      userData.id=this.userList.length+1;
      this.userList.push(userData);
      this.userInfoSevice.userList.push(userData);
      tableRef.scrollIntoView({behavior:'smooth'})
  }
  onSearchValueGetSuggestion(searchVal:string)
  {
     this.userList=this.userList.filter((item)=>{
            if(item.name.toLowerCase().includes(searchVal.toLowerCase()))
            {
              return true;
            }
            return false;
     }) 
  }
  onSearchValueGet(searchVal:string)
  {
      this.userList=this.userList.filter((item)=>{
           if(item.name.toLowerCase().startsWith(searchVal.toLowerCase())==true)
           {
             return true;
           }
           else 
           {
             return false;
           }
      })
  }
  applyFilterOptions(tags:string[])
  {
      this.userList=[];
      this.filterTags=[...tags];
      
      let setCollection:Set<string>=new Set<string>(tags);
      for(let item of this.userInfoSevice.userList)
      {
         for(let work of item.workouts)
         {
           if(setCollection.has(work.type)==true)
           {
               if(this.userList.indexOf(item)==-1)
               {
                this.userList.push(item);
               }
                           
           }
         }
      }

  }
  onTagRemoved(tag:string)
  {
    this.filterTags=this.filterTags.filter((item)=>{
      if(item!=tag)
      {
        return true;
      }
      return false;
    })
    this.applyFilterOptions(this.filterTags);
  }
  setListIntialState()
  {
    this.userList=this.userInfoSevice.userList;
    this.filterTags=[];
  }
  onItemsPerPageChange(itemsPerPage:string)
  {
     this.itemsPerPage=Number(itemsPerPage);    
  }
  getTotalNumberOfPages():number
  {
     return Math.ceil(this.userList.length/this.itemsPerPage);  
  }
}
