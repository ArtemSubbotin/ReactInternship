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
        if (this.state.hasError){
            errorTag = <p className="error_text">{this.errorMessage}</p>;
        }

        return (
            <div className="LoginForm">
                <p className="login_form__title">Log In</p>

                <input type="text" id="email" />
                <input type="text" id="pwd" />

                {errorTag}

                <button id="btn1" className="login_btn" onClick={this.logIn}>
                    Login
                </button>
            </div>
        );
    }

    renderLogOut(){
        return (
            <div className="LoginForm">
                <img src={this.photoUrl} className="User-Image" alt="logo" />

                <p className="login_form__title">{this.userName}</p>

                <button id="btn1" className="login_btn" onClick={this.logOut}>
                    Logout
                </button>
            </div>
        );
    }

    logIn() {
        var email = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;

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