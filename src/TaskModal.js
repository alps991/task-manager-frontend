import React from 'react';
import axios from 'axios';
import { Button, Input, Checkbox, Form, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class TaskModal extends React.Component {

    state = {
        description: '',
        completed: false,
    }

    componentDidUpdate(prevProps) {
        if (this.props.task._id !== prevProps.task._id) {
            this.setState(() => ({
                description: this.props.task.description,
                completed: this.props.task.completed,
            }));
        }
    }

    handleChangeDescription = e => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    handleChangeCompletion = e => {
        this.setState((prevState) => ({ completed: !prevState.completed }));
    }

    handleSaveTask = async e => {
        e.preventDefault();
        try {
            await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${this.props.task._id}`, {
                description: this.state.description,
                completed: this.state.completed,
            }, {
                headers: {
                    Authorization: this.props.authToken
                }
            });
            this.props.closeModal();
            this.props.updateTaskList();
        } catch (err) {
            console.log(err);
        }
    }

    handleDeleteTask = async e => {
        e.preventDefault();
        try {
            await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${this.props.task._id}`, {
                headers: {
                    Authorization: this.props.authToken
                }
            })
            this.props.closeModal();
            this.props.updateTaskList();
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.closeModal}
            >
                <Modal.Header>Edit Task</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Description:</label>
                            <Input
                                type="text"
                                onChange={this.handleChangeDescription}
                                required
                                value={this.state.description}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Completed:</label>
                            <Checkbox
                                checked={this.state.completed}
                                onChange={this.handleChangeCompletion}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.handleSaveTask}>Save Changes</Button>
                    <Button onClick={this.handleDeleteTask}>Delete Task</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default TaskModal;