export const localUserServiceSpy = jasmine.createSpyObj('LocalUserService', ['getUser']);

+localUserServiceSpy.getUser.and.returnValue("Gonzalo G. Verón");