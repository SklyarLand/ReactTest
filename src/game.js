import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner';
import Anew from './anew-button';

export default class Game extends React.Component{
    constructor(){
        super(); //вызов конструктор роди класса

        this.state = {
            xIsNext:true,
            stepNumber:0,
            lastStep: 0,
            history: [{
                squares:Array(9).fill(null)
            }]// в истории находится массив заполненный null
        };

    }

    handleClick(i){
        const {xIsNext,history,lastStep} = this.state;
        const current = history[history.length - 1];//текущий ход
        const squares = current.squares.slice(); // создаем независимую копию массива квадратов
        if(calculateWinner(squares||squares[i])||lastStep!==history.length-1){
            return;}
        if(Object.is(null,squares[i])){
            squares[i] = xIsNext ? 'X' : 'O'; //маркируе  м квадрат крестиком или ноликом

            this.setState({ //перерисовывает
                xIsNext:!xIsNext,
                stepNumber: ++this.state.stepNumber,
                lastStep: ++this.state.lastStep,
                history: history.concat([{squares}])
            })
        }
    }

    newGame(){
        this.state = {
            xIsNext:true,
            stepNumber:0,
            lastStep: 0,
            history: [{
                squares:Array(9).fill(null)
            }]// в истории находится массив заполненный null
        };
        this.setState(this.state)
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
            xIsNext: (step%2) ? false : true,        
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
                <div>
                    <div className='game-info'>
                        <div>{status}</div>
                        <ul >{this.paintMoves()}</ul>
                    </div>
                    <Anew onClick = {()=>this.newGame()}/>
                </div>
            </div>
        );
    }
}