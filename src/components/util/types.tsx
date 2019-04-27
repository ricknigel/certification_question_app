
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
