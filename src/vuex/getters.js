export function getUserInfo (state) {
  return {accessToken: state.accessToken, loginName: state.loginName}
}
