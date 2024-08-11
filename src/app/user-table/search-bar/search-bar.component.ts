import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass,faFilter} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user-info.model';
import { UserInfoService } from 'src/app/services/user-info.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent{

  mangnifyingGlass=faMagnifyingGlass;
  filter=faFilter;
  timeout=undefined;
  @Output() onSearchButtonClicked:EventEmitter<string>=new EventEmitter<string>();
  userService:UserInfoService=inject(UserInfoService);
  userList:User[]=[];
  @Output() onFilterWindowOpen:EventEmitter<boolean>=new EventEmitter<boolean>();
  debounced(searchVal:string)
  {
    this.userList=this.userService.userList.filter((item)=>{
      if(item.name.toLowerCase().includes(searchVal.toLowerCase()))
      {
        return true;
      }
      return false;
}) 
  }
  onSearchKeyEntered(searchInput:HTMLInputElement)
  {
      clearTimeout(this.timeout);
      this.timeout=setTimeout(()=>{
            this.debounced(searchInput.value);
      },500);
  }
  onSearchIconClicked(value:string)
  {
    this.onSearchButtonClicked.emit(value);
    this.userList=[];
  }
  filterWindowOpen()
  {
    this.onFilterWindowOpen.emit(true);     
  }
}
