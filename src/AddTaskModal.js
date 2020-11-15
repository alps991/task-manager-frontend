import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AddTaskModal extends React.Component {

    state = {
        description: '',
    }

    handleDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    submitTask = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/tasks`, { description: this.state.description }, {
            headers: {
                Authorization: this.props.authToken
            }
        }).then(res => {
            this.props.closeModal();
            this.props.updateTaskList();
            this.setState(() => ({ description: '' }));
        }).catch(err => {
            console.log(err.response.data.error);
        });
    }

    render() {
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
                <h3>Add a new Task</h3>
                <Form>
                    <Input
                        type="text"
                        required
                        autoFocus
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                    <Button
                        primary
                        onClick={this.submitTask}
                    >
                        Submit
                </Button>
                </Form>
            </Modal>
        );
    }
}

export default AddTaskModal;