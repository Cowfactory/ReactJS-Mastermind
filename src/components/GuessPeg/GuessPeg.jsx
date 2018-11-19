import React from 'react';
import styles from './GuessPeg.module.css';

const GuessPeg = (props) => (
    <div
        pos={props.currentGuess ? props.pos : undefined} 
        className={styles.peg}
        style={{
            backgroundColor: props.color,
            border: props.color ? `1px solid ${props.color}` : '1px dashed grey',
            cursor: props.currentGuess && 'pointer'
        }}
        onClick={props.handleColorApply}
    />
);

export default GuessPeg;
