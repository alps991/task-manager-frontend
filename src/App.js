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

  handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/login`, { email, password });
      const authToken = 'Bearer ' + res.data.token;
      const curUser = res.data.user;
      this.setState(() => ({ curUser, authToken }));
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/logoutAll`, {}, {
        headers: {
          Authorization: this.state.authToken
        }
      })
      this.setState(() => ({ curUser: '', authToken: '' }));
    }
    catch (err) {
      console.log(err.response.data.error);
    }
  }

  handleCreateUser = async (e, formData) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users`, formData)
      const authToken = 'Bearer ' + res.data.token;
      const curUser = res.data.user;
      this.setState(() => ({
        curUser,
        authToken,
        isUserModalOpen: false,
      }));
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  handleSaveUser = async (e, updates) => {
    e.preventDefault();
    try {
      if (!updates.password) {
        delete updates.password;
      }
      const res = await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/users/me`, updates, {
        headers: {
          Authorization: this.state.authToken
        }
      })
      const curUser = res.data.user;
      this.setState(() => ({
        curUser,
        isUserModalOpen: false,
      }));
      this.closeModals();
    } catch (err) {
      console.log(err); 
    }
  }

  handleDeleteUser = async e => {
    e.preventDefault();
    try {
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/users/me`, {
        headers: {
          Authorization: this.state.authToken
        }
      });
      this.setState(() => ({ curUser: '', authToken: '' }));
    }
    catch (err) {
      console.log(err);
    }
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
