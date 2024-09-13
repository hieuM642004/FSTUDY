interface Word {
    word: string;
    definition: string;
    audioUrl: string;
    image?: string;
}

export default interface FlashCardInterface {
    _id?: string;
    nameCard: string;
    words: Word[];
    wordCount: number;
    isPublic: boolean;
    reviewInterval: number;
    reviewCount: number;
    
}

export interface ExampleResponse {
    generated_response: string;
    translated_response: string;
}