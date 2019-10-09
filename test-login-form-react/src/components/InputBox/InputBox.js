import React from 'react';
import './InputBox.css';
import classNames from 'classnames/bind';

export default function InputBox(props) {
    return (
        <input type="text" 
            className={classNames('text-input', { 'text-input--invalid' : props.hasError }, props.className)}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}/>
    );
}