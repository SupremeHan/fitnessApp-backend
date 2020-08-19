export class JwtDataAdminDto {
    adminId: number;
    username: string;
    exp: number;

    toPlainObject() {
        return {
            administratorId: this.adminId,
            username: this.username,
            exp: this.exp
        }
    }
}