import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import {fetchUsers} from '../store';
import { connect } from 'react-redux';
import {makeAdminThunk, deleteUserThunk } from '../store'

class UserList extends Component {
  constructor (props) {
      super (props)
  }

  componentDidMount () {
    //  this.props.loadUsers();
  }

  render () {
    return (
      this.listUsers()
    )
      // console.log("user id", this.props.user, "Users", this.props.Users);
      // if (this.props.user) {
      //     return (
      //         <div>
      //             <div> Users for {this.props.user.name}</div>
      //             {
      //                 this.listUsers()
      //             }
      //         </div>
      //     );
      // } else return <div>Must have an account to view Users</div>;
  }

  listUsers() {
   // console.log('list user props: ', this.props.users, this.props.sort((u1, u2)=>u1.id - u2.id))
    if (!this.props.users.length) return <div>No Users found</div>
    return (
      <table className='table table-bordered'>
        <thead>
          <tr>
            <td align='center'>User ID</td>
            <td align='center'>First Name</td>
            <td align='center'>Last Name</td>
            <td align='center'>Address</td>
            <td align='center'>Phone</td>
            <td align='center'>Email</td>
            <td align='center'>Permission</td>
            <td align='center'>Toggle Admin</td>
            <td align='center'>Delete User</td>
          </tr>
        </thead>
        <tbody>
        {
          this.props.users.sort( (user1, user2)=>user1.id-user2.id).map(user =>
            <tr key={user.id}>
              <td align='center'><Link to={`/users/${user.id}`} key={user.id}>{user.id}</Link></td>
              <td align='center'>{user.firstName}</td>
              <td align='center'>{user.lastName}</td>
              <td align='center'>{user.address}</td>
              <td align='center'>{user.phone}</td>
              <td align='center'>{user.email}</td>
              <td align='center'>
              {
                user.isAdmin ? 'Admin' : 'User'
              }
              </td>
              <td>
              <form onSubmit={ this.props.makeAdmin }>
                <input type='hidden' name='id' value={ user.id }/>
                <button value='admin me' name={`makeAdmin-${user.id}`} id={`makeAdmin-${user.id}`} type='submit' className='user-makeAdmin-button'>
                  <img id={user.id} className='user-makeAdmin-img' src='/check.png' width='25' height='25'/>
                </button>
              </form>
              </td>
              <td>
              <button value='delete me' name={`del-${user.id}`} id={`del-${user.id}`} type='reset' className='user-delete-button' onClick={this.props.deleteUser}>
                <img id={user.id} className='user-delete-img' src='/del.png' width='25' height='25' />
              </button>
              </td>
              </tr>
          )
        }
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  users: state.users,
  user: state.user
})

const mapDispatch = dispatch => ({
  deleteUser: (event) => {
    dispatch(deleteUserThunk(event.target.id));
  },
  makeAdmin: (event) => {
    event.preventDefault();
    dispatch(makeAdminThunk(event.target.id.value));
  }
})

export default connect(mapState, mapDispatch)(UserList);
