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
    
    async postAjax(url, data) {
        var resp, json;
        
        try {
            resp = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("get data from server error: " + error.message);
        }

        try {
            json = await resp.json();
        } catch (error) {
            console.log("json parse error: " + error.message);
        }

        if (resp.ok)
            this.handleSuccess(json);
        else
            this.handleError(json);
    }

    handleSuccess(json) {
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