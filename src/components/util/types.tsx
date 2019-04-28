
export interface OptionInfo {
  optionName: string,
  isAnswer: boolean
}

export default interface QuestionInfo {
  id: string
  title: string,
  question: string,
  explanation: string,
  options: OptionInfo[],
  modifiedAt: string
}

export const PartsSelection = [
  { part: 'PART1', name: '第1章 Javaの基本' },
  { part: 'PART2', name: '第2章 Javaのデータ型の操作' },
  { part: 'PART3', name: '第3章 演算子と判定構造の使用' },
  { part: 'PART4', name: '第4章 配列の作成と使用' },
  { part: 'PART5', name: '第5章 ループ構造の使用' },
  { part: 'PART6', name: '第6章 メソッドとカプセル化の操作' },
  { part: 'PART7', name: '第7章 継承の操作' },
  { part: 'PART8', name: '第8章 例外の処理' },
  { part: 'PART9', name: '第9章 Java APIの主要なクラスの操作' },
  { part: 'PART10', name: '第10章 総仕上げ問題１' },
  { part: 'PART11', name: '第11章 総仕上げ問題2' },
  { part: 'OTHER', name: 'その他' }
]
