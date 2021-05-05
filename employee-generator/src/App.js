import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchbar from './components/Searchbar/searchbar.js';
import ResultList from "./components/resultList.js";
import API from './utils/API.js';
import EmployeeTable from './components/EmployeeTable/table.js';
import Title from './components/Title/title.js';



class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      employees: []
    };
  }

  componentDidMount() {
    this.searchUsers();

  }

  searchUsers = () => {
    API.getUsers()
      // .then(res => res.json())
      .then(
        (result) => {
          // console.log(result.data.results)

          this.setState({
            originalEmployees: result.data.results,
            employees: result.data.results
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )

  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const searchValue = document.querySelector("[name=search]").value
    let filtered = [...this.state.originalEmployees];
    filtered = filtered.filter(employee => employee.name.first === searchValue)

    // const employees = this.state.employees.filter(employee => employee.first === searchValue)

    this.setState({
      employees: filtered

    })
  };
  //copy/process/setstate
  handleRemove = id => {
    console.log(id);
    this.setState({
      // console.log(this.state.employees)
      employees: this.state.employees.filter(employee => employee.id.value !== id)
    });
  }

  handleSort = (key, key2, asc) => {
    // copy
    let employeeSorted = [...this.state.employees];

    // sort by key and asc
    employeeSorted.sort((a, b) => {
      return a[key][key2] > b[key][key2] ? asc * 1 : asc * -1;
    });

    // set the state
    this.setState({ employees: employeeSorted });

  }





  render() {
    
    return (

      <div>

        <Title>Employee Directory</Title>
        {/* {this.state.employees ? ( */}

        {/* <button onClick={() => this.handleSort("name", 1)}>Push for sort name</button>
        <button onClick={() => this.handleSort("name", -1)}>Push for sort name reverse</button> */}
        <button type="button" className="btn btn-primary" style={{ marginRight: "25px" }} onClick={() => this.handleSort("name", "first", 1)}>Sort by First Name</button>
        <button type="button" className="btn btn-primary" style={{ marginRight: "25px" }} onClick={() => this.handleSort("name", "last", 1)}>Sort by Last Name</button>

        <div> <Searchbar
          search={this.state.getUsers}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}

        />
          <EmployeeTable
            employees={this.state.employees}
            handleRemove={this.handleRemove}
          />
          <ResultList employees={this.state.employees} />
        </div>

      </div>

    )
  }

}

export default App;