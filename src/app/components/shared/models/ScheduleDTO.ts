import { Schedule } from "./Schedule";

export class ScheduleDTO {
    public lunes: Array<Schedule>;
    public martes: Array<Schedule>;
    public miercoles: Array<Schedule>;
    public jueves: Array<Schedule>;
    public viernes: Array<Schedule>;
    public sabado: Array<Schedule>;
    public domingo: Array<Schedule>;

    constructor(){
        this.lunes = new Array<Schedule>();
        this.martes = new Array<Schedule>();
        this.miercoles = new Array<Schedule>();
        this.jueves = new Array<Schedule>();
        this.viernes = new Array<Schedule>();
        this.sabado = new Array<Schedule>();
        this.domingo = new Array<Schedule>();
    }

}