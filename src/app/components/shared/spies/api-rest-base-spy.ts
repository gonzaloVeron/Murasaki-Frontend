import { of } from "rxjs";

const basePath = "http://localhost:8080/api/v1";

const interestsList = [
    {
        id: 1,
        icon: "fa-users",
        name: "Cultura"
    },
    {
        id: 2,
        icon: "fa-briefcase",
        name: "Trabajo"
    },
    {
        id: 3,
        icon: "fa-school-flag",
        name: "Estudios"
    },
];

const user = {
    age: 25,
    email: "ranni@gmail.com",
    emailTutor: "tutor2@gmail.com",
    interests: interestsList,
    jlptLevel: 5,
    lessons: [],
    name: "Ranni la bruja",
    priorKnowledge: "No sabe nada de japones",
    teacherAsignedId: 6,
    tel: 1162641228
};

const teachers = [
    {
        id: 1,
        name: "Julian Borja",
        students: []
    },
    {
        id: 2,
        name: "Armando Rosello",
        students: []
    }   

]

export const apiRestBaseSpy = jasmine.createSpyObj('ApiRestBase', ['get', 'put', 'post']);

apiRestBaseSpy.get.withArgs(`/interest/jwt`).and.returnValue(of(interestsList));
apiRestBaseSpy.get.withArgs(`/student/jwt/5`).and.returnValue(of(user));
apiRestBaseSpy.get.withArgs(`/teacher`).and.returnValue(of(teachers));
apiRestBaseSpy.put.and.returnValue(of());
// save(data: any){
//     return this.apiRestBase.post("/student/jwt", data);
// }

// update(id: number, data: any){
//     return this.apiRestBase.put(`/student/jwt/${id}`, data);
// }


