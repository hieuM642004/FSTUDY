

export interface Exams{
    examType: string,
    title: string,
    description: string,
    durition: string,
    idSession: string[],
    slug: string
    view: number
}

export type Question = {
    order: any;
    passageText: any;
    questions: any;
    _id: string;
    questionIndex?: number;
    questionText: string;
    questionType: string;
    options: string[];
    audioUrl?: string;
    imageUrl?: string;
};

export interface RecordingProps {
    questionsGroup: Question[];
    sessionId: string;
    dataselection: (data: Record<string, string | number | null>) => void;
    activeQuestions: number[];
    onQuestionClick: (sessionId: string, order: number) => void;  
    questionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>; 
    isDisabled?: boolean;
}


