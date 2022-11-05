import { of } from "rxjs";

const basePath = "http://localhost:9000/api/v1";

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

export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);

httpClientSpy.get.withArgs(`http://localhost:8080/api/v1/interest/jwt`).and.returnValue(of(interestsList));

// httpClientSpy.get.withArgs(`${basePath}/student/jwt/1`).and.returnValue(of(user));
