export interface IWord {
    "_id"?: string,
    "group": number,
    "page": number,
    "word": string,
    "image": string,
    "audio": string,
    "audioMeaning": string,
    "audioExample": string,
    "textMeaning": string,
    "transcription": string
}

export interface IWordState {
    words: IWord[],
    isLoading: boolean,
    error: string    
}