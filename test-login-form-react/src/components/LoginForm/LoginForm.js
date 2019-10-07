import React from 'react';
import './LoginForm.css';
import '../SubmitButton/SubmitButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import InputBox from '../InputBox/InputBox';


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoggedIn: false, 
            hasError: false,
            email: '',
            pwd : '',
         };

        this.postAjax = this.postAjax.bind(this);
        this.doLogIn = this.doLogIn.bind(this);
        this.doLogOut = this.doLogOut.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
    }

    render() {
        if (this.state.isLoggedIn)
            return this.renderLogOut();
        else
            return this.renderLogIn();
    }

    onEmailChange(event){
        this.setState({email: event.target.value});
    }

    onPwdChange(event){
        this.setState({pwd: event.target.value});
    }

    renderLogIn(){
        var errorTag = '';
        if (this.state.hasError){
            errorTag = <p className="login-form__error">{this.errorMessage}</p>;
        }

        return (
            <div className="app-container__body login-form panel">
                <h1 className="login-form__title">Log In</h1>

                <div className="login-form__email-container"> 
                    <InputBox 
                        value={this.state.email} 
                        onChange={this.onEmailChange} 
                        placeholder="E-Mail" 
                        hasError={this.state.hasError}/>
                </div>
                
                <div className="login-form__pwd-container"> 
                    <InputBox 
                        value={this.state.pwd} 
                        onChange={this.onPwdChange} 
                        placeholder="Password" 
                        hasError={this.state.hasError}/>
                </div>

                {errorTag}

                <SubmitButton onClick={this.doLogIn}>
                    Login
                </SubmitButton>
            </div>
        );
    }

    renderLogOut(){
        return (
            <div className="app-container__body login-form panel">
                <img src={this.photoUrl} className="login-form__user-image" alt="logo" />

                <h1 className="login-form__title">{this.userName}</h1>

                <SubmitButton onClick={this.doLogOut}>
                    Logout
                </SubmitButton>
            </div>
        );
    }

    doLogIn() {
        var email = this.state.email;
        var pwd = this.state.pwd;

        this.postAjax(
            this.props.baseUrl,
            { email: email, password: pwd }
        );
    }

    doLogOut(){
        this.photoUrl = '';
        this.userName = '';
        this.errorMessage = '';

        this.setState({isLoggedIn: false, hasError: false, email: '', pwd: ''});
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