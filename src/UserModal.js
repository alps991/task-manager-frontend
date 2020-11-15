import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { Button, Input, Form } from 'semantic-ui-react';
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
            this.setState(() => ({ age }));
        }
    }

    render() {

        const createdAt = this.props.user ? moment(this.props.user.createdAt).format('MMM Do YYYY') : null;
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        return (
            <Modal
                isOpen={this.props.isOpen}
                style={customStyles}
                onRequestClose={this.props.closeModal}
                ariaHideApp={false}
            >
                <Form>
                    <Form.Field>
                        <label>Name:</label>
                        <Input
                            type="text"
                            onChange={this.handleChangeName}
                            required
                            value={this.state.name}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Email:</label>
                        <Input
                            type="text"
                            onChange={this.handleChangeEmail}
                            required
                            value={this.state.email}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Age:</label>
                        <Input
                            type="text"
                            onChange={this.handleChangeAge}
                            required
                            value={this.state.age}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password:</label>
                        <Input
                            type="password"
                            onChange={this.handleChangePassword}
                            value={this.state.password}
                        />
                    </Form.Field>
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

                </Form>


            </Modal>
        );
    }

}

export default UserModal;