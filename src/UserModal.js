import React from 'react';
import moment from 'moment';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class UserModal extends React.Component {

    state = {
        age: '',
        name: '',
        email: '',
        password: '',
    }

    componentDidMount() {
        if (this.props.user) {
            const { age, name, email } = this.props.user;
            this.setState(() => ({ age, name, email }));
        }
    }

    handleChangeName = e => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }

    handleChangeEmail = e => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    handleChangePassword = e => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    handleChangeAge = e => {
        const age = e.target.value;
        const reg = /^\d{0,3}$/;
        if (!age || age.match(reg)) {
            this.setState(() => ({ age: parseInt(age) }));
        }
    }

    render() {

        const createdAt = this.props.user ? moment(this.props.user.createdAt).format('MMM Do YYYY') : null;
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.closeModal}
            >
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name:</label>
                            <Input
                                type="text"
                                placeholder="Name"
                                onChange={this.handleChangeName}
                                required
                                value={this.state.name}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email:</label>
                            <Input
                                type="text"
                                placeholder="Email"
                                onChange={this.handleChangeEmail}
                                required
                                value={this.state.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Age:</label>
                            <Input
                                type="text"
                                placeholder="Age"
                                onChange={this.handleChangeAge}
                                required
                                value={this.state.age}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password:</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChangePassword}
                                value={this.state.password}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.closeModal}>Close</Button>

                    {
                        this.props.user ? (
                            <div>
                                {createdAt ? <p>User since {createdAt}</p> : null}
                                <Button primary onClick={(e) => this.props.handleSaveUser(e, this.state)}>Save Changes</Button>
                                <Button color='red' onClick={this.props.handleDeleteUser}>Delete Account</Button>
                                <Button secondary onClick={this.props.handleLogout}>Logout</Button>
                            </div>
                        ) : <Button primary onClick={(e) => this.props.handleCreateUser(e, this.state)}>Register Account</Button>
                    }

                </Modal.Actions>


            </Modal>
        );
    }

}

export default UserModal;