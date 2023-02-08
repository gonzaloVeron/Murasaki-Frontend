export class Schedule {
    public time: string;
    public studentNames: Array<string>;

    constructor(time: string, studentNames: Array<string>){
        this.time = time;
        this.studentNames = studentNames;
    }

    compareTo(otherSchedule: Schedule){
        if(this.createDate() < otherSchedule.createDate()){
            return -1;
        }
        if(this.createDate() > otherSchedule.createDate()){
            return 1;
        } 
        return 0;
    }

    separateHourFromMinute(st: string){
        let hours = parseInt(st.length == 4 ? st.substring(0, 1) : st.substring(0, 2));
        let minutes = parseInt(st.length == 4 ? st.substring(2, 4) : st.substring(3, 5));
        return { hours: hours, minutes: minutes };
    }
    
    createDate(){
        let parsedHours = this.separateHourFromMinute(this.time);
        let date = new Date();
        date.setHours(parsedHours.hours);
        date.setMinutes(parsedHours.minutes);
        return date;
    }
}