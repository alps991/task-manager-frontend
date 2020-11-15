import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class LoginPage extends React.Component {

    state = {
        email: 'alper@gmail.com',
        password: '123456789',
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
                    <Form.Field>
                        <label>Email</label>
                        <Input
                            id="email-input"
                            type="text"
                            placeholder="Email"
                            required
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input
                            id="password-input"
                            type="password"
                            placeholder="password"
                            required
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        />
                    </Form.Field>
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