import { Schedule } from "./Schedule";

export class ScheduleDTO {
    public lunes: Array<Schedule>;
    public martes: Array<Schedule>;
    public miercoles: Array<Schedule>;
    public jueves: Array<Schedule>;
    public viernes: Array<Schedule>;
    public sabado: Array<Schedule>;
    public domingo: Array<Schedule>;
}