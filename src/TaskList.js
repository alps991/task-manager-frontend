import React from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './TaskList.css';

class TaskList extends React.Component {

    state = {
        sortedBy: '',
        sortDirection: '',
    }

    handleSortChange = (sortBy) => {
        this.setState(prevState => {
            let sortDirection = 'descending';
            if (sortBy === this.state.sortedBy) {
                sortDirection = prevState.sortDirection === 'ascending' ? 'descending' : 'ascending';
            }
            const newState = {
                sortedBy: sortBy,
                sortDirection
            }

            this.props.updateTaskList(newState);

            return newState;
        });

    }

    render() {
        return (
            <div>
                <h2>Your tasks:</h2>
                <Table celled selectable sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                width={4}
                                sorted={this.state.sortedBy === 'description' ? this.state.sortDirection : null}
                                onClick={() => this.handleSortChange('description')}
                            >
                                Description
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                width={1}
                                sorted={this.state.sortedBy === 'completed' ? this.state.sortDirection : null}
                                onClick={() => this.handleSortChange('completed')}
                            >
                                Status
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                width={1}
                                sorted={this.state.sortedBy === 'createdAt' ? this.state.sortDirection : null}
                                onClick={() => this.handleSortChange('createdAt')}
                            >
                                Created At
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.tasks.map(task => {
                                const completedStatus = task.completed ? 'Completed' : 'Incomplete';
                                const id = task._id;
                                const createdAt = moment(task.createdAt).format('MMM Do YYYY - h:mm a');
                                return (
                                    <Table.Row
                                        key={id}
                                        onClick={() => this.props.selectTask(id)}
                                        className="TaskList-item"
                                    >
                                        <Table.Cell>{task.description}</Table.Cell>
                                        <Table.Cell>{completedStatus}</Table.Cell>
                                        <Table.Cell>{createdAt}</Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default TaskList;