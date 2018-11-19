import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors,
            code: this.genCode(colors.length),
            selColorIdx: 0,
            guesses: [this.getNewGuess()]
        };

        this.resetGame = () => {
            this.setState({
                colors,
                code: this.genCode(colors.length),
                selColorIdx: 0,
                guesses: [this.getNewGuess()]
            })
        }

        this.handleColorSelection = (colorIdx) => {
            this.setState({ selColorIdx: colorIdx });
        }
        this.handleColorApply = (e) => {
            let idx = e.target.getAttribute('pos');
            if (!idx) return;

            let guessesCopy = this.state.guesses;
            let mostRecentGuess = guessesCopy[guessesCopy.length - 1];

            mostRecentGuess.code[idx] = this.state.selColorIdx;

            guessesCopy.pop();
            guessesCopy.push(mostRecentGuess);

            this.setState({
                guesses: guessesCopy
            });
        }

        this.checkGuess = (e) => {
            // console.log(this.state.code);

            let correctCodeSeq = this.state.code.slice();
            let guessesCopy = this.state.guesses;
            let mostRecentGuess = guessesCopy[guessesCopy.length - 1];
            let guessCodeSeq = mostRecentGuess.code.slice();

            // Pass thru code arr once - check for perfect matches
            guessCodeSeq.forEach((pegColorCode, idx) => {
                if (pegColorCode === correctCodeSeq[idx]) {
                    mostRecentGuess.score.perfect++;
                    guessCodeSeq[idx] = correctCodeSeq[idx] = null;
                }
            });

            // Pass thru leftovers in code arr - check for almost matches
            console.log("correct", this.state.code);
            guessCodeSeq.forEach(code => {
                if (code === null) return;
                let foundIdx = correctCodeSeq.indexOf(code);
                if (foundIdx > -1) {
                    mostRecentGuess.score.almost++;
                    correctCodeSeq[foundIdx] = null;
                }
            });


            guessesCopy.pop();
            guessesCopy.push(mostRecentGuess);
            if(mostRecentGuess.score.perfect !== mostRecentGuess.code.length) {
                guessesCopy.push(this.getNewGuess());
            }
            

            this.setState({
                guesses: guessesCopy
            })

        }
    }

    getNewGuess() {
        return {
            code: [null, null, null, null],
            score: {
                perfect: 0,
                almost: 0
            }
        };
    }

    genCode(size) {
        return new Array(4).fill().map(dummy => Math.floor(Math.random() * size));
    }

    getWinTries() {
        // if winner, return num guesses, otherwise 0 (no winner)
        let lastGuess = this.state.guesses.length - 1;
        return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
    }





    render() {
        let winTries = this.getWinTries();
        return (
            <div>
                <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
                <div className='App-game'>
                    <GameBoard
                        guesses={this.state.guesses}
                        colors={this.state.colors}
                        handleColorApply={this.handleColorApply}
                        checkGuess={this.checkGuess}
                    />
                    <div className='App-controls'>
                        <ColorPicker
                            colors={this.state.colors}
                            selColorIdx={this.state.selColorIdx}
                            handleColorSelection={this.handleColorSelection}
                        />
                        <NewGameButton resetGame={this.resetGame} />
                    </div>
                </div>
                <footer className='App-header-footer'>
                    {(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}
                </footer>
            </div>
        );
    }
}



export default App;
