// 一些公共方法的封装
export const passwordReg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,20}$/;

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const validatePassword = (password) => {
  return passwordReg.test(password)
}
export const validateEmail = (email) => {
  return emailReg.test(email)
}
