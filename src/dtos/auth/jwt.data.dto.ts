export class JwtDataDto {
  role: 'admin' | 'user';
  id: number;
  identity: string;
  exp: number;

  toPlainObject() {
    return {
      role: this.role,
      id: this.id,
      identity: this.identity,
      exp: this.exp,
    };
  }
}
