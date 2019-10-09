import React from 'react';
import './Input.css';
import classNames from 'classnames/bind';

export default function Input(props) {
    return (
        <input type="text" 
            className={classNames('input', { 'input--invalid' : props.hasError }, props.className)}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}/>
    );
}