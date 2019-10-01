import React from 'react';
import './LoginForm.css';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoggedIn: false, 
            hasError: false
         };

        this.postAjax = this.postAjax.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    render() {
        if (this.state.isLoggedIn)
            return this.renderLogOut();
        else
            return this.renderLogIn();
    }

    renderLogIn(){
        var errorTag = '';
        var emailClassName = "login-form__email text-input";
        var pwdClassName = "login-form__pwd text-input";
        if (this.state.hasError){
            errorTag = <p className="login-form__error">{this.errorMessage}</p>;
            emailClassName+=" text-input--invalid";
            pwdClassName+=" text-input--invalid";
        }

        return (
            <div className="app-container__body login-form panel">
                <h1 className="login-form__title">Log In</h1>

                <input type="text" id="inputEmail" className={emailClassName} placeholder="E-Mail"/>
                <input type="text" id="inputPwd" className={pwdClassName} placeholder="Password"/>

                {errorTag}

                <button id="btnLogIn" className="login-form__submit button" onClick={this.logIn}>
                    Login
                </button>
            </div>
        );
    }

    renderLogOut(){
        return (
            <div className="app-container__body login-form panel">
                <img src={this.photoUrl} className="login-form__user-image" alt="logo" />

                <h1 className="login-form__title">{this.userName}</h1>

                <button id="btnLogOut" className="login-form__submit button" onClick={this.logOut}>
                    Logout
                </button>
            </div>
        );
    }

    logIn() {
        var email = document.getElementById("inputEmail").value;
        var pwd = document.getElementById("inputPwd").value;

        this.postAjax(
            this.props.baseUrl,
            { email: email, password: pwd }
        );
    }

    logOut(){
        this.photoUrl = '';
        this.userName = '';
        this.errorMessage = '';

        this.setState({isLoggedIn: false, hasError: false});
    }
    
    postAjax(url, data) {
        var thisHack = this; //is there any better way?        
        let hasError = false;

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(resp => {
            hasError = !resp.ok; //not sure this is the best option
            return resp.json();
        })
        .then(respJson => {
            if (hasError)
                thisHack.handleError(respJson);
            else
                thisHack.handleSuccess(respJson);
        })
        .catch(error => alert(error));
    }

    handleSuccess(json) {
        //var json = JSON.parse(data);
        this.photoUrl = json.photoUrl;
        this.userName = json.name;

        this.setState({ 
            isLoggedIn: true
        });

    }

    handleError(json) {
        this.errorMessage = json.error;

        this.setState({ 
            hasError: true,
        });
    }
}

export default LoginForm;