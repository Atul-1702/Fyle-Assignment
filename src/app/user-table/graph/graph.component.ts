import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { User } from 'src/app/models/user-info.model';
import { UserInfoService } from 'src/app/services/user-info.service';

Chart.register(...registerables);
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit,AfterViewInit {

  canvasDestroy=null;
  @ViewChild('chart') chart:ElementRef;
  userService:UserInfoService=inject(UserInfoService);
  allUserList:User[]=[];
  selectedIndex:number=0;
  ngOnInit()
  {
     this.allUserList=this.userService.userList;
  }
  ngAfterViewInit()
  {
    this.getChart1Data(0);
  }
  getChart1Data(index:number) {
    this.selectedIndex=index;
    if(this.canvasDestroy!=null)
    {
      this.canvasDestroy.destroy();
    }
    let canvas=this.chart.nativeElement.getContext('2d');
    this.canvasDestroy=new Chart(canvas,{
      type:'bar',
      data:{
        labels:this.allUserList[index].workouts.map((item)=>{return item.type}),
         datasets:[{
          label:'Workout v/s Minutes',
          borderWidth:3,
          borderColor:'whitesmoke',
          data:this.allUserList[index].workouts.map((item)=>{return item.minutes}),
          backgroundColor:['rgb(244, 86, 85)','rgb(175, 174, 170)','rgb(233, 133, 133)','rgb(238, 119, 77)',
            'rgb(125, 167, 217)','rgb(222, 94, 224)','rgb(255, 126, 59)','rgb(61, 215, 113)'
          ],
         }]
      },
      options:{
        responsive:false,
        scales:{
          y:{
            min:0,
            max:60
          }
        },
        plugins:{
          title:{
            display:true,
            text:'Workouts',
            position:'bottom',
            font:{size:20},
            padding:{
               top:10,
               bottom:20
            },
          },
          tooltip:{
            backgroundColor:'rgb(255, 186, 7)',
            caretSize:15,
            
          },
          legend:{
              align:'end',
              labels:{
                boxHeight:20,
                font:{'weight':'bold'}    
              },
              title:{'text':'1 Unit = 10 Minutes','display':true,'color':'orange','font':{'size':12,weight:'bold'}}
          },
        },
        animations:{
          tension:{
            duration:1000,
            easing:'easeOutBounce',
          },
          
        }
      },

    })
   
}
}
