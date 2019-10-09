import React from 'react';
import './LoginForm.css';
import '../SubmitButton/SubmitButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import InputBox from '../InputBox/InputBox';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            email: '',
            pwd : '',
         };

        this.postAjax = this.postAjax.bind(this);
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPwdChange = (event) => {
        this.setState({pwd: event.target.value});
    }

    render(){
        var errorTag = '';
        if (this.state.hasError){
            errorTag = (<p className="login-form__error">{this.errorMessage}</p>);
        }

        return (
            <div className="login-form panel">
                <h1 className="login-form__title">Log In</h1>

                <InputBox 
                    className="login-form__email-container"
                    value={this.state.email} 
                    onChange={this.onEmailChange} 
                    placeholder="E-Mail" 
                    hasError={this.state.hasError}/>
                
                <InputBox 
                    className="login-form__pwd-container"
                    value={this.state.pwd} 
                    onChange={this.onPwdChange} 
                    placeholder="Password" 
                    hasError={this.state.hasError}/>

                {errorTag}

                <SubmitButton onClick={this.doLogIn}>
                    Login
                </SubmitButton>
            </div>
        );
    }

    doLogIn = () => {
        var email = this.state.email;
        var pwd = this.state.pwd;

        this.postAjax(
            this.props.baseUrl,
            { email: email, password: pwd }
        );
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
        var photoUrl = json.photoUrl;
        var userName = json.name;
        this.props.onLogInSucceeded(userName, photoUrl);

        this.setState({ 
            hasError: false,
        });
    }

    handleError(json) {
        this.errorMessage = json.error;

        this.setState({ 
            hasError: true,
        });
    }
}