 import React from 'react';
 import './Button.css';
 import PropTypes from 'prop-types';
 import classNames from 'classnames/bind';

export default function Button(props){
    return (
        <button className={classNames('button', 'submit-button', props.className)} onClick={props.onClick}>
            {props.children}
        </button>
    );
}