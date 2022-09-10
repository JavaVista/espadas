export const cardSuits = ['♠️', '♣️', '♥️', '♦️'] as const;
export const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

export interface Card {
    readonly value: string;
    readonly suit: '♠️' | '♣️' | '♥️' | '♦️';
}
