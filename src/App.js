import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Square = props => {
    return (
        <div className="board-square" data-i={props.i}>
            {props.value}
        </div>
    );
};

const Board = props => {
    return (
        <div id="board" onClick={props.onMove}>
            <div className="board-row">
                <Square i={0} value={props.board[0]} />
                <Square i={1} value={props.board[1]} />
                <Square i={2} value={props.board[2]} />
            </div>
            <div className="board-row">
                <Square i={3} value={props.board[3]} />
                <Square i={4} value={props.board[4]} />
                <Square i={5} value={props.board[5]} />
            </div>
            <div className="board-row">
                <Square i={6} value={props.board[6]} />
                <Square i={7} value={props.board[7]} />
                <Square i={8} value={props.board[8]} />
            </div>
        </div>
    );
};

class App extends Component {
    constructor() {
        super();

        this.state = {
            board: Array(9).fill(null),
            counter: 0
        };

        this.onMove = this.onMove.bind(this);
    }

    render() {
        return <Board board={this.state.board} onMove={this.onMove} />
    }

    checkWin(board, player) {
        const wins = [
            [ 0, 1, 2],
            [ 3, 4, 5],
            [ 6, 7, 8],
            [ 0, 3, 6],
            [ 1, 4, 7],
            [ 2, 5, 8],
            [ 0, 4, 8],
            [ 2, 4, 6]
        ];

        return wins.some(row => {
            const [a, b, c] = row;
            return board[a] === player && board[b] === player && board[c] === player;
        });
    }

    onMove(e) {
        const currentTarget = e.target;

        if (!currentTarget.classList.contains('board-square')) return;

        const board = this.state.board.slice();
        const counter = this.state.counter;

        if (board[currentTarget.dataset.i] !== null) return;
        const player = counter % 2 === 0 ? 'X' : 'O';
        board[currentTarget.dataset.i] = player;

        if (this.checkWin(board, player)) {
            alert('you won!');
        } else {
            this.setState({
                counter: counter + 1,
                board
            });
        }
    }
}

export default App;

