import { IQuestion } from "./Question";

export interface IGame {
    started: boolean;
    players: {};
    turn: ITurn;
    target: number;
    timeLeft: number;
    questions: IQuestion[];
    currentQuestionIndex: number;
};

interface ITurn {
    order: any[];
    activeTurnIndex: number;
}