import React, { Component } from 'react';
import './app.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      id:'',
      firstName: '',
      lastName:'',
      email:'',
      birthday:'',
      zipcode:'',
      isToggleOn: 'sort',
      users:[],
      colFocus:'id',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.sortColumns = this.sortColumns.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event)
  {
    //event.preventDefault();
    fetch('/api/create',{
      method:'POST',
      body:JSON.stringify({
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        "birthday":this.state.birthday,
        "zipcode":this.state.zipcode
      }),
      headers:{'Content-Type': 'application/json'}
    })
  }

  deleteUser(userId)
  {
    // state before deleting users
    const currentUsers = this.state.users;
    this.setState({
      users: currentUsers.filter(user => user.id !== userId)});
    console.log("Deleting user", userId);
    fetch('/api/delete', {
      method: "DELETE",
      body:JSON.stringify({"id": userId}),
      headers:{'Content-Type': 'application/json'}
    })

  }

  state = { username: null, users:[] };

  componentDidMount() {
    fetch('/api/getData')
      .then(res => res.json())
      .then(data => this.setState({users: data}))
      .catch(err => console.log("api/getData error"));
  }

  sortColumns(event) {
    const columnTarget = event.target.id;
    const wantedCol = event.target.name;
    const currentMode = this.state.isToggleOn;

    //current column mode
    const colMode = this.state.colFocus;

    this.setState((state) => {
      if(currentMode == 'sort')
      {
        return{isToggleOn: 'up', colFocus: wantedCol};
      }
      else if(currentMode == 'up')
      {
        return{isToggleOn:'down', colFocus: wantedCol}
      }
      else if(currentMode == 'down')
      {
        return{isToggleOn:'up', colFocus: wantedCol}
      }
    });

  }

  sortData(a, b)
  {
    const currentMode = this.state.isToggleOn;
    const colMode = this.state.colFocus;
    console.log("Sorting column: ", colMode);

    // return true or false depending on which is >
    if(currentMode === 'up')
    {
      return (a > b)
    } else if(currentMode === 'down')
    {
      return (a < b);
    }
    else{
      return (a);
    }
  }


  render() {
    const { currentMode } = this.state.isToggleOn;
    const{ wantedCol } = this.state.colFocus;
    console.log(this.state.isToggleOn)
    return (
      <div>
      <div className="gridTop">
        <div className='userInput'>
          <h2> Create an Account </h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label name="firstNameInput">First Name </label>
                    <input type="text" className="form-control" placeholder="First Name" name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name </label>
                    <input type="text" className="form-control" placeholder="Last Name" name='lastName' value={this.state.lastName} onChange={this.handleChange} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="emailInput"> Email address </label>
                <input type="email" id="emailInput" placeholder="name@example.com" className="form-control" name='email' value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="birthdayInput"> Birthday </label>
                <input type="text" className="form-control" placeholder="MM/DD/YYYY" name='birthday' value={this.state.birthday} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="zipcodeInput"> Zipcode </label>
                <input type="number" className="form-control" name='zipcode' value={this.state.zipcode} onChange={this.handleChange} />
              </div>
              <input type="submit" value="Submit"  />
            </form>
          </div>
          </div>
          <div className="gridBottom">
          <div className="userTable">
            <h2 class="userlist"> Current Users </h2>
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th></th>
                  <th>First Name
                  <div>
                    <button type="button" name="firstName" id="1" onClick={this.sortColumns}>
                      {this.state.colFocus==="firstName" ? this.state.isToggleOn : 'sort'}</button>
                    </div>
                  </th>
                  <th>Last Name
                  <div>
                    <button type="button" name="lastName" id="2" onClick={this.sortColumns}>
                      {this.state.colFocus==="lastName" ? this.state.isToggleOn : 'sort'}</button>
                  </div>
                  </th>
                  <th>Email
                  <div>
                    <button type="button" name="email" id="3" onClick={this.sortColumns}>
                      {this.state.colFocus==="email" ? this.state.isToggleOn : 'sort'}</button>
                  </div>
                  </th>
                    <th>Birthday
                      <div>
                      <button type="button" name="birthday" id="4" onClick={this.sortColumns}>
                        {this.state.colFocus==="birthday" ? this.state.isToggleOn : 'sort'}</button>
                      </div>
                    </th>
                  <th>Zipcode
                    <div>
                    <button type="button" name="zipcode" id="5" onClick={this.sortColumns}>
                      {this.state.colFocus==="zipcode" ? this.state.isToggleOn : 'sort'}</button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.sort((a, b) => (this.sortData(a[this.state.colFocus], b[this.state.colFocus])) ? 1 : -1).map(user =>
                <tr key={user.id}>
                  <td>
                    <button type="button" onClick={() => this.deleteUser(user.id)}>Delete</button>
                  </td>
                  <td >{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td >{user.email}</td>
                  <td >{user.birthday}</td>
                  <td >{user.zipcode}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            </div>
          </div>
        </div>
    );
  }
}
