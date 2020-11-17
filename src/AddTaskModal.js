import React from 'react';
//import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input, Form, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AddTaskModal extends React.Component {

    state = {
        description: '',
    }

    handleDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    submitTask = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/tasks`, { description: this.state.description }, {
                headers: {
                    Authorization: this.props.authToken
                }
            });
            this.props.closeModal();
            this.props.updateTaskList();
            this.setState(() => ({ description: '' }));
        } catch (err) {
            console.log(err.response.data.error);
        }
    }

    render() {
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.closeModal}
            >
                <Modal.Header>Add a new Task</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Input
                                type="text"
                                placeholder="Task Description"
                                required
                                autoFocus
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        primary
                        onClick={this.submitTask}
                    >
                        Submit
                </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddTaskModal;