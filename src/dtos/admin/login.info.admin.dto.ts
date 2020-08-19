export class LoginInfoAdminDto {
    adminId: number;
    username: string;
    token: string;

    constructor(id: number, un: string, jwt: string) {
        this.adminId = id;
        this.username = un;
        this.token = jwt;
    }
}