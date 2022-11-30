import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string | null = "";
  winnerOCount = 0;
  winnerXCount = 0;
  isPlay: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.isPlay = true;
  }
  get player() {
    return this.xIsNext ? 'O' : 'X';
  }
  makeMove(idx: number) {
    if(!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    if(this.winner) {
      this.winner==='O' ? this.winnerOCount++ : this.winnerXCount++;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        Swal.fire(`Player ${this.squares[a]} won the game`, 'You can start new game!', 'success');
        this.isPlay = false;
        return this.squares[a];
      }
    }
    return null;
  }
}
