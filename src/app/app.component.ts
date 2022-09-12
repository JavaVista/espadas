import { Component, OnInit } from '@angular/core';
import { Card, cardSuits, cardValues } from './card/card';
import { GameRound } from './game-round';
import { Player } from './player/player';

let nextPlayerId: number = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly deck: Card[] = createDeck();
  readonly players: Player[] = dealPlayers(this.deck);
  currentRound: number = 0;
  currentTrick: Card[] = [];
  activePlayerIndex = this.getFirstPlayerId();
  rounds: GameRound[] = [];
  yourPlayerId = this.players[0].id;

  ngOnInit(): void {
    this.advanceGame();
  }

  private advanceGame() {
    if (this.currentTrick.length === 4) {
      // advance to the next round
      return;
    }
    if (this.activePlayerIndex !== 0) {
      this.makeAiMove();
    }
  }
  private makeAiMove() {
    const aiPlayer = this.players[this.activePlayerIndex];
    const card = aiPlayer.hand[Math.floor(Math.random() * aiPlayer.hand.length)];
    this.playCard(aiPlayer, card);
  }
  protected playCard(player: Player, card: Card) {
    player.hand.splice(player.hand.indexOf(card), 1);
    this.currentTrick.push(card);
    this.activePlayerIndex = (this.activePlayerIndex + 1) % 4;
    this.advanceGame();
  }
  private getFirstPlayerId() {
    for (const py of this.players) {
      for (const cd of py.hand) {
        if (cd.value === '2' && cd.suit === '♣️') {
          return py.id;
        }
      }
    }
    return 0;
  }

}

function createDeck(): Card[] {
  const resultDeck = [];
  for (const suit of cardSuits) {
    for (const value of cardValues) {
      resultDeck.push({ value, suit });
    }
  }
  shuffleDeck(resultDeck);
  return resultDeck;
}

function shuffleDeck(deck: Card[]): void {
  for (let index = 0; index < deck.length; index++) {
    const swapIndex = Math.floor(Math.random() * (deck.length - index));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
}


function dealPlayers(deck: Card[]): Player[] {
  const playerResults: Player[] = [];
  for (let index = 0; index < 4; index++) {
    playerResults.push({ id: nextPlayerId++, name: `Player ${index + 1}`, hand: [] });
  }
  for (let index = 0; index < deck.length; index++) {
    playerResults[index % 4].hand.push(deck[index]);

  }
  return playerResults;
}


// TODO: Sanity Check test for card count like this 
// document.querySelectorAll('app-card');
// TODO: Check for card duplicates
//const arrayOfCards = Array.from(document.querySelectorAll('app-card'));
//new Set(arrayOfCards.map(card => card.textContent.trim()));