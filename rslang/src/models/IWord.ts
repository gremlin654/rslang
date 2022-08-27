export interface IWord {
  _id?: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  transcription: string
  textExample: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
}

export interface IWordState {
  words: IWord[]
  isLoading: boolean
  error: string
  page: number
  group: number
  perPage: number
  totalCount: number
}

export interface IQeury {
  page: number,
  group: number,
  perPage: number,
  totalCount: number
}

