import React from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import TaskModal from './TaskModal';
import UserModal from './UserModal';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Dashboard extends React.Component {

    state = {
        tasks: [],
        isAddTaskModalOpen: false,
        isTaskModalOpen: false,
        isUserModalOpen: false,
        selectedTask: {},
    }

    updateTaskList = async (options) => {
        try {
            let url = `${process.env.REACT_APP_API_ENDPOINT}/tasks`;
            if (options) {
                url += '?sortBy=' + options.sortedBy + ':';
                url += options.sortDirection === 'ascending' ? 'asc' : 'desc';
            }
            const res = await axios.get(url, {
                headers: {
                    Authorization: this.props.authToken
                }
            })
            this.setState(() => ({ tasks: res.data }));
        }
        catch (err) {
            console.log(err.response.data.error);
        }
    }

    componentDidMount = () => {
        this.updateTaskList();
    }

    openAddTaskModal = () => {
        this.setState(() => ({ isAddTaskModalOpen: true }));
    }

    openUserModal = () => {
        this.setState(() => ({ isUserModalOpen: true }));
    }

    closeModals = () => {
        this.setState(() => ({
            isAddTaskModalOpen: false,
            isTaskModalOpen: false,
            isUserModalOpen: false,
        }));
    }

    selectTask = (id) => {
        const selectedTask = this.state.tasks.find(task => task._id === id);
        this.setState(() => ({
            isTaskModalOpen: true,
            selectedTask,
        }));
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.curUser.name}</h1>
                <Button primary onClick={this.openAddTaskModal} >Create Task</Button>
                <Button onClick={this.openUserModal} >Account Settings</Button>
                <TaskList
                    tasks={this.state.tasks}
                    selectTask={this.selectTask}
                    updateTaskList={this.updateTaskList}
                />
                <AddTaskModal
                    isOpen={this.state.isAddTaskModalOpen}
                    closeModal={this.closeModals}
                    authToken={this.props.authToken}
                    updateTaskList={this.updateTaskList}
                />
                <TaskModal
                    isOpen={this.state.isTaskModalOpen}
                    closeModal={this.closeModals}
                    authToken={this.props.authToken}
                    updateTaskList={this.updateTaskList}
                    task={this.state.selectedTask}
                />
                <UserModal
                    isOpen={this.state.isUserModalOpen}
                    closeModal={this.closeModals}
                    authToken={this.props.authToken}
                    user={this.props.curUser}
                    handleLogout={this.props.handleLogout}
                    handleDeleteUser={this.props.handleDeleteUser}
                    handleSaveUser={this.props.handleSaveUser}
                />
            </div>
        );
    }
}

export default Dashboard;