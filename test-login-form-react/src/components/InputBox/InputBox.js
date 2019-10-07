import React from 'react';
import './InputBox.css';

export default function InputBox(props) {
    return (
        <input type="text" 
            className={props.hasError ? "text-input text-input--invalid" : "text-input"}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}/>
    );
}