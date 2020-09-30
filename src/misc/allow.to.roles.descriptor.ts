import { SetMetadata } from '@nestjs/common';

export const AllowToRoles = (...roles: ('admin' | 'user')[]) => {
  return SetMetadata('allow_to_roles', roles);
};
