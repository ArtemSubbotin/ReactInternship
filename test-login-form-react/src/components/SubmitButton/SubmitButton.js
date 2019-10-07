 import React from 'react';
 import './SubmitButton.css';
 import PropTypes from 'prop-types';

export default function SubmitButton(props){
    return (
        <button className="submit-button button" onClick={props.onClick}>
            {props.children}
        </button>
    );
}

SubmitButton.defaultProps = {
    children: 'Submit',
    onClick: () => { alert('clicked');}
  };

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
  };