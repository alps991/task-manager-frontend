import React from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import UserModal from './UserModal';
import { Button, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends React.Component {

  state = {
    curUser: '',
    authToken: '',
    isUserModalOpen: false,
  }

  handleLogin = (e, email, password) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/login', { email, password }).then(res => {
      const authToken = 'Bearer ' + res.data.token;
      const curUser = res.data.user;
      this.setState(() => ({ curUser, authToken }));
    }).catch(err => {
      console.log(err.response.data.error);
    });
  }

  handleLogout = () => {
    axios.post('http://localhost:3000/users/logoutAll', {}, {
      headers: {
        Authorization: this.state.authToken
      }
    }).then(res => {
      this.setState(() => ({ curUser: '', authToken: '' }));
    }).catch(err => {
      console.log(err.response.data.error);
    });
  }

  handleCreateUser = (e, formData) => {
    console.log(formData)
    e.preventDefault();
    axios.post('http://localhost:3000/users', formData).then(res => {
      const authToken = 'Bearer ' + res.data.token;
      const curUser = res.data.user;
      this.setState(() => ({
        curUser,
        authToken,
        isUserModalOpen: false,
      }));
    }).catch(err => {
      console.log(err.response.data.error);
    });
  }

  handleSaveUser = (e, updates) => {
    e.preventDefault();
    if (!updates.password) {
      delete updates.password;
    }
    axios.patch('http://localhost:3000/users/me', updates, {
      headers: {
        Authorization: this.state.authToken
      }
    }).then(res => {
      const curUser = res.data.user;
      this.setState(() => ({
        curUser,
        isUserModalOpen: false,
      }));
      this.props.closeModal();
    }).catch(err => {
      console.log(err);
    });
  }

  handleDeleteUser = e => {
    e.preventDefault();
    axios.delete('http://localhost:3000/users/me', {
      headers: {
        Authorization: this.state.authToken
      }
    }).then(res => {
      this.setState(() => ({ curUser: '', authToken: '' }));
    }).catch(err => {
      console.log(err);
    });
  }

  openUserModal = () => {
    this.setState(() => ({ isUserModalOpen: true }));
  }

  closeModals = () => {
    this.setState(() => ({
      isUserModalOpen: false,
    }));
  }

  render() {
    return (
      <div>
        <Header as='h1' color="green" className="App-header">Task Manager</Header>
        <Container>
          {
            this.state.curUser ? (
              <Dashboard
                curUser={this.state.curUser}
                authToken={this.state.authToken}
                handleLogout={this.handleLogout}
                handleSaveUser={this.handleSaveUser}
                handleDeleteUser={this.handleDeleteUser}
              />
            ) : (
                <div>
                  <LoginPage handleLogin={this.handleLogin} />

                  <Button secondary onClick={this.openUserModal}>
                    Register
                </Button>
                  <UserModal
                    isOpen={this.state.isUserModalOpen}
                    closeModal={this.closeModals}
                    handleCreateUser={this.handleCreateUser}
                    handleSaveUser={this.handleSaveUser}
                    user={null}
                  />
                </div>
              )
          }
        </Container>
      </div>
    );
  }
}

export default App;
