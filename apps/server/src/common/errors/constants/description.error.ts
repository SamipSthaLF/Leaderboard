export class ErrorDescription {
  static readonly UNAUTHORIZED_USER = {
    code: 'AUTH001',
    description: 'User is not authorized to access the feature!',
  };

  static readonly NO_ASSOCIATED_USER_FOUND = {
    code: 'AUTH002',
    description: 'No associated user found',
  };
  static readonly INSUFFICIENT_ROLES = {
    code: 'AUTH003',
    description: 'User does not have required role to access this feature!',
  };
  //user roles
  static readonly INVALID_ROLE = {
    code: 'USERROLE001',
    description: 'Invalid role provided!',
  };

  static readonly USER_ALREADY_INVITED = {
    code: 'USER001',
    description: 'User is already invited!',
  };
  //role
  static readonly ROLE_NOT_PRESENT = {
    code: 'ROLE001',
    description: 'Role is not present!',
  };
}
