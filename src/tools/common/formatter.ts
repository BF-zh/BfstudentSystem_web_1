export class Formatter {
  static gender(gender: 0 | 1 | 2) {
    const genderMap = {
      0: '私密',
      1: '男',
      2: '女',
    }
    return genderMap[gender]
  }

  static role(role: 0 | 1 | 2 | 3) {
    const rolerMap = {
      0: '学生',
      1: '老师',
      2: '管理员',
      3: '超级管理员',
    }
    return rolerMap[role]
  }
}
