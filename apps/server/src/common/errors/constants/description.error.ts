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
    description: 'User does not have required role to access this feature',
  };
}
