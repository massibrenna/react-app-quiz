//trivia: https://opentdb.com/api_config.php
// google fonts: https://fonts.google.com/specimen/Nunito

import { shuffleArray } from "./utils";
export type Question = {

    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answers: string[]};

export enum Difficulty {

    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (
    amount: number, 
    difficulty: Difficulty
) => {
    const endpoint =`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    // 2 await: 1 per la fetch, la 2 per la conversione in json
    const data = await (await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question) => (
    {
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers, 
            question.correct_answer
        ])
    }
    ))
};