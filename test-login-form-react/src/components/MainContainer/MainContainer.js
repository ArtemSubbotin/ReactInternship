import React from 'react';
import './MainContainer.css';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoggedIn: false, 
            userName : '',
            userUrl: '',            
         };
    }

    onLogInSucceeded = (userName, userUrl) => {
        this.setState({isLoggedIn: true, userName: userName, userUrl: userUrl});
    }

    onLogOut = () => {
        this.setState({isLoggedIn: false, userName: '', userUrl: ''});
    }

    render() {
        if (this.state.isLoggedIn)
            return (
                <div className="main-container">
                    <LogoutForm 
                        userName={this.state.userName} 
                        userPhotoUrl={this.state.userUrl} 
                        onLogOutClick={this.onLogOut}/>
                </div>
            );
        else 
            return (
                <div className="main-container">
                    <LoginForm 
                        baseUrl={this.props.baseUrl} 
                        onLogInSucceeded={this.onLogInSucceeded}/>
                </div>
            );
    }
}