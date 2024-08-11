import { AfterViewInit, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { faXmark,faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { UserInfoService } from 'src/app/services/user-info.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements AfterViewInit{

  closeIcon=faXmark;
  caretUp=faCaretUp;
  userInfo:UserInfoService=inject(UserInfoService);
  filterOptions:string[]=[];
  @Output() filterWindowClose:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() onApplyfilter:EventEmitter<string[]>=new EventEmitter<string[]>();
  @Input()  applyFilter:string[]=[];
  ngOnInit()
  {
     this.filterOptions=this.userInfo.workOutTypes;
     console.log(this.applyFilter);
    
  }
  ngAfterViewInit()
  {
    let allCheckBoxes=document.querySelectorAll('.checkbox');
      allCheckBoxes.forEach((item:HTMLInputElement,index)=>{
          let i=this.applyFilter.indexOf(item.value);
          console.log(i);
          if(i!=-1)
          {
             item.checked=true;
          }
    })
  }
  onFilterWindowCancelButtonClicked()
  {
     this.filterWindowClose.emit(false);
  }
  onApplyFilterButtonClicked()
  {
    let allCheckBoxes=document.querySelectorAll('.checkbox');
    allCheckBoxes.forEach((item:HTMLInputElement,index)=>{
         if(item.checked==true)
         {
           this.applyFilter.push(item.value);            
         }
    })
     this.onApplyfilter.emit(this.applyFilter);    
     this.onFilterWindowCancelButtonClicked();
  }
  onResetAllButtonClicked()
  {
    let allCheckBoxes=document.querySelectorAll('.checkbox');
    allCheckBoxes.forEach((item:HTMLInputElement,index)=>{
         if(item.checked==true)
         {
           item.checked=false;            
         }
    })
  }
}
