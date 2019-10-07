import React from 'react';
import './LogoutForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';

export default function LogoutForm(props) {
    return (
        <div className="logout-form panel">
            <img src={props.userPhotoUrl} className="logout-form__user-image" alt="logo" />

            <h1 className="logout_form__title">{props.userName}</h1>

            <SubmitButton onClick={props.onLogOutClick}>
                Logout
            </SubmitButton>
        </div>
    );
};