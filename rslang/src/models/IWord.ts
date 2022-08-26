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
  wordTranslate: string
}

export interface IWordState {
  words: IWord[]
  isLoading: boolean
  error: string
}
export interface IWordGroupState {
  words: IWord[]
  isLoading: boolean
  error: string
  level: null | number
  userData: {
    userName: string
    userId: string
    avatarURL: string
    token: string
  }
  settings: {
    musicVolume: number
    soundVolume: number
    wordVolume: number
    difficultWord: boolean
    deleteWord: boolean
    translateWord: boolean
    translateSentences: boolean
    theme: string
  }
  userWords: []
  activeWords: []
  statistics: Record<string, unknown>
}
