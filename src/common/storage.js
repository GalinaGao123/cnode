export function setStorage (obj) {
  for (var key in obj) {
    window.localStorage.setItem(key, obj[key])
  }
}

export function removeStorage () {
  window.localStorage.clear()
}

// export function isLogin() {
//   if (window.localStorage.success)
// }

export function getStorage (item) {
  return window.localStorage.getItem(item)
}
