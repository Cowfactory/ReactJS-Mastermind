import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
import './GuessRow.css';

const GuessRow = (props) => (
    <div className='GuessRow'>
        <div
            className='row-num'
            style={{ color: props.currentGuess ? 'black' : 'lightgrey' }}
        >
            {props.rowIdx + 1}
        </div>
        <GuessPegs
            code={props.guess.code}
            colors={props.colors}
            currentGuess={props.currentGuess}
            handleColorApply={props.handleColorApply}
        />
        {
            props.currentGuess ?
                <ScoreButton 
                    isDisabled={props.guess.code.includes(null)} 
                    checkGuess={props.checkGuess}
                /> :
                <GuessScore score={props.guess.score} />
        }
    </div>
);

export default GuessRow;
