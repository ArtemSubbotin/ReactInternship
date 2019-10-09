import React from 'react';
import './LoginForm.css';
import '../Button/Button';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMessage: '',
            email: '',
            password : '',
         };

        this.postAjax = this.postAjax.bind(this);
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render(){
        var errorTag = '';
        if (this.state.hasError){
            errorTag = (<p className="login-form__error">{this.state.errorMessage}</p>);
        }

        return (
            <div className="login-form panel">
                <h1 className="login-form__title">Log In</h1>

                <Input 
                    className="login-form__input-email"
                    value={this.state.email} 
                    onChange={this.onEmailChange} 
                    placeholder="E-Mail" 
                    hasError={this.state.hasError}/>
                
                <Input 
                    className="login-form__input-password"
                    value={this.state.password} 
                    onChange={this.onPasswordChange} 
                    placeholder="Password" 
                    hasError={this.state.hasError}/>

                {errorTag}

                <Button onClick={this.doLogIn} className="login-form__button">
                    Login
                </Button>
            </div>
        );
    }

    doLogIn = () => {
        const {email, password } = this.state;

        this.postAjax(
            this.props.baseUrl,
            { email: email, password: password }
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
        const {photoUrl, name} = json;
        this.props.onLogInSucceeded(name, photoUrl);

        this.setState({ 
            hasError: false,
        });
    }

    handleError(json) {
        this.setState({ 
            hasError: true,
            errorMessage: json.error,
        });
    }
}