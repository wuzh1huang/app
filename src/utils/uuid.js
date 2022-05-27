import { v4 as uuidv4 } from 'uuid';
export function getUUID() {
  // 返回一个字符串，用于表示游客id
  if (!localStorage.getItem('guest_id')) {
    let guest_id = uuidv4()
    localStorage.setItem('guest_id', guest_id)
    return guest_id
  } else {
    return localStorage.getItem('guest_id')
  }
}