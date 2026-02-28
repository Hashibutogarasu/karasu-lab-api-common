/**
 * Centralized error code enum for client-side auth and API errors.
 * Values map to translation keys under the `common.errors` namespace.
 * Example: CLIENT_AUTH_ERROR.LOGIN_FAILED → t('common.errors.auth.loginFailed')
 */
export enum ClientAuthError {
  // Generic
  UNKNOWN = 'unknown',

  // Auth - credentials
  LOGIN_FAILED = 'auth.loginFailed',
  REGISTER_FAILED = 'auth.registerFailed',
  LOGOUT_FAILED = 'auth.logoutFailed',

  // Auth - social / provider
  SOCIAL_LOGIN_FAILED = 'auth.socialLoginFailed',
  LIST_ACCOUNTS_FAILED = 'auth.listAccountsFailed',
  LINK_SOCIAL_FAILED = 'auth.linkSocialFailed',
  UNLINK_PROVIDER_FAILED = 'auth.unlinkProviderFailed',

  // Auth - passkey
  ADD_PASSKEY_FAILED = 'auth.addPasskeyFailed',
  LIST_PASSKEYS_FAILED = 'auth.listPasskeysFailed',
  DELETE_PASSKEY_FAILED = 'auth.deletePasskeyFailed',
  PASSKEY_LOGIN_FAILED = 'auth.passkeyLoginFailed',

  // Auth - password
  CHANGE_PASSWORD_FAILED = 'auth.changePasswordFailed',
  SET_PASSWORD_FAILED = 'auth.setPasswordFailed',

  // Auth - TOTP / MFA
  ENABLE_TWO_FACTOR_FAILED = 'auth.enableTwoFactorFailed',
  DISABLE_TWO_FACTOR_FAILED = 'auth.disableTwoFactorFailed',
  VERIFY_TOTP_FAILED = 'auth.verifyTotpFailed',
  GET_TOTP_URI_FAILED = 'auth.getTotpUriFailed',

  // Auth - email OTP
  FORGET_PASSWORD_FAILED = 'auth.forgetPasswordFailed',
  SEND_EMAIL_OTP_FAILED = 'auth.sendEmailOtpFailed',
  VERIFY_EMAIL_OTP_FAILED = 'auth.verifyEmailOtpFailed',

  // Auth - profile
  UPDATE_PROFILE_FAILED = 'auth.updateProfileFailed',
  CHANGE_EMAIL_FAILED = 'auth.changeEmailFailed',

  // Auth - session
  GET_SESSIONS_FAILED = 'auth.getSessionsFailed',
  REVOKE_SESSION_FAILED = 'auth.revokeSessionFailed',

  // OAuth applications
  OAUTH_REGISTER_FAILED = 'oauth.registerFailed',
  OAUTH_UPDATE_FAILED = 'oauth.updateFailed',
  OAUTH_DELETE_FAILED = 'oauth.deleteFailed',
  OAUTH_REGENERATE_SECRET_FAILED = 'oauth.regenerateSecretFailed',
  OAUTH_GET_APPLICATIONS_FAILED = 'oauth.getApplicationsFailed',
  OAUTH_GET_APPLICATION_FAILED = 'oauth.getApplicationFailed',
  OAUTH_CONSENT_FAILED = 'oauth.consentFailed',
  OAUTH_TOGGLE_DISABLED_FAILED = 'oauth.toggleDisabledFailed',
}
