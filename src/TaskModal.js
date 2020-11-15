import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input, Checkbox, Form } from 'semantic-ui-react';
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
            await axios.delete(`http://localhost:3000/tasks/${this.props.task._id}`, {
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
                    <Button primary onClick={this.handleSaveTask}>Save Changes</Button>
                    <Button onClick={this.handleDeleteTask}>Delete Task</Button>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Form>
            </Modal>
        )
    }
}

export default TaskModal;