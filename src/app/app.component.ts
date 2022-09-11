import { Component } from '@angular/core';
import { Card, cardSuits, cardValues } from './card/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly deck: Card[] = createDeck();


}

function createDeck(): Card[] {
  const resultDeck = [];
  for (const suit of cardSuits) {
    for (const value of cardValues) {
      resultDeck.push({ value, suit });
    }
  }
  shuffleDeck(resultDeck)
  return resultDeck;
}

function shuffleDeck(deck: Card[]): void {
  for (let index = 0; index < deck.length; index++) {
    const swapIndex = Math.floor(Math.random() * (deck.length - index));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
}

// TODO: Sanity Check test for card count like this 
// document.querySelectorAll('app-card');
// TODO: Check for card duplicates
//const arrayOfCards = Array.from(document.querySelectorAll('app-card'));
//new Set(arrayOfCards.map(card => card.textContent.trim()));