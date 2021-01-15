import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-9 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li className='userDetailItem' key={user.id}> <strong>User Details</strong>
                            <table>
                                <thead>
                                    <tr>
                                        <th>{'Name: '}</th>
                                        <th>{'User Name: '}</th>
                                        <th>{'Role: '}</th>
                                        <th>{'Phone No: '}</th>
                                        <th>{'Address: '}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{user.phoneno}</td>
                                        <td>{user.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span><a onClick={this.handleDeleteUser(user.id)} className='btn btn-danger'>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/register" className='btn  btn-primary'>Add User</Link>
                    <Link to="/login" className='btn'>Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };