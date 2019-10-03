import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner'

export default class Game extends React.Component{
    constructor(){
        super(); //вызов конструктор роди класса

        this.state = {
            xIsNext:true,
            stepNumber:0,
            history: [{
                squares:Array(9).fill(null)
            }]// в истории находится массив заполненный null
        };

    }

    handleClick(i){
        const {xIsNext,history} = this.state;
        const current = history[history.length - 1];//текущий ход
        const squares = current.squares.slice(); // создаем независимую копию массива квадратов

        if(calculateWinner(squares||squares[i])){
            return;}

        squares[i] = xIsNext ? 'X' : 'O'; //маркируем квадрат крестиком или ноликом

        this.setState({ //перерисовывает
            xIsNext:!xIsNext,
            stepNumber: ++this.state.stepNumber,
            history: history.concat([{squares}])
        })
    }

    paintMoves(){
        return this.state.history.map((step,move)=>{
            const desc = move ? ('Move #' + move) : 'Game Start'; //

            return(
                <li key = {move}>
                    <a href = '#' onClick = {()=>this.ToJump(move)}>{desc}</a>
                </li>
            );
        });
    }

    ToJump(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) ? false : true
        });
    }

    render(){
        const {xIsNext,stepNumber,history} = this.state;
        const current = history[stepNumber];

        const winner = calculateWinner(current.squares);
        let status;

        if(winner){
            status = 'Winner is '+winner;}
        else{
            status = 'Next Player is '+(xIsNext ? 'X' : 'O')
        }


        return(
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares = {current.squares}   
                        onClick = {(i)=> this.handleClick(i)} 
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ul>{this.paintMoves()}</ul>
                </div>
            </div>
        );
    }
}