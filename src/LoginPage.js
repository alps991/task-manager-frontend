import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    handlePasswordChange = e => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    render() {
        return (
            <div>
                <Form>
                    <h2>Login</h2>
                    <Form.Input
                        id="email-input"
                        type="text"
                        placeholder="Email"
                        label="Email"
                        // error={{
                        //     content: 'Please enter a valid email address',
                        //     pointing: 'below',
                        // }}
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                    />
                    <Form.Input
                        id="password-input"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                    />
                    <Button
                        primary
                        onClick={(e) => this.props.handleLogin(e, this.state.email, this.state.password)}
                    >
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginPage;