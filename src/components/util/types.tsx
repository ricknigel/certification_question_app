
export default interface QuestionInfo {
  id: string,
  part: number,
  questionNo: number,
  title: string,
  question: string,
  explanation: string,
  options: OptionInfo[],
  modifiedAt: string,
  answerTimes: number,
  correctTimes: number,
  favorite: boolean,
}

export interface OptionInfo {
  optionName: string,
  isAnswer: boolean
}

export const JavaParts = [
  { part: 1, name: '第1章 Javaの基本' },
  { part: 2, name: '第2章 Javaのデータ型の操作' },
  { part: 3, name: '第3章 演算子と判定構造の使用' },
  { part: 4, name: '第4章 配列の作成と使用' },
  { part: 5, name: '第5章 ループ構造の使用' },
  { part: 6, name: '第6章 メソッドとカプセル化の操作' },
  { part: 7, name: '第7章 継承の操作' },
  { part: 8, name: '第8章 例外の処理' },
  { part: 9, name: '第9章 Java APIの主要なクラスの操作' },
  { part: 10, name: '第10章 総仕上げ問題１' },
  { part: 11, name: '第11章 総仕上げ問題2' },
  { part: 12, name: 'その他' }
]

export const CertificationSubject = [
  { subId: 1, name: 'Java Silver', children: JavaParts },
  // { subId: 2, name: 'AP 応用情報技術者', children: undefined },
]

export const drawerWidth = 240;

// page number
export const PER_PAGE = 10;

// generate random max and min
// 32bit int range
export const MIN = -2147483648;
export const MAX = 2147483647;


export const generateRandom = (): number => {
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}
