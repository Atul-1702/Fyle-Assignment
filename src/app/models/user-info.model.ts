
export class User{

    id:number;
    name:string;
    workouts:{type:string,minutes:number}[];

    constructor(id:number,name:string,workouts:{type:string,minutes:number}[])
    {
      this.id=id;
      this.name=name;
      this.workouts=workouts
    }
}