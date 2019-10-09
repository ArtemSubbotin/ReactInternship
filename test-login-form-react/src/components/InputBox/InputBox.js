import React from 'react';
import './InputBox.css';

export default function InputBox(props) {
    let className = props.hasError ? "text-input text-input--invalid" : "text-input";
    if (props.className)
        className += " " + props.className;
    return (
        <input type="text" 
            className={className}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}/>
    );
}