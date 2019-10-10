import React from 'react';
import './LogoutForm.css';
import Button from '../Button/Button';

export default function LogoutForm(props) {
    return (
        <div className="logout-form">
            <img src={props.userPhotoUrl} className="logout-form__user-image" alt="logo" />

            <h1 className="logout_form__title">{props.userName}</h1>

            <Button onClick={props.onLogOutClick} className="logout-form__button">
                Logout
            </Button>
        </div>
    );
};