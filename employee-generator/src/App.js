import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searchbar from './components/Searchbar/searchbar.js';
// import ResultList from "./components/resultList.js";
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
      .then(
        (result) => {
  

          this.setState({
            originalEmployees: result.data.results,
            employees: result.data.results
          })
        },

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
    const searchValue = this.state.search.toLowerCase()
    // const searchValue = document.querySelector("[name=search]").value
    let filtered = [...this.state.originalEmployees];
    filtered = filtered.filter(employee => employee.name.first.toLowerCase().includes(searchValue) || employee.name.last.toLowerCase().includes(searchValue) )

  //   const searchValue = this.state.search.toLowerCase()
  //   // const searchValue = document.querySelector("[name=search]").value
  //   let filtered = [...this.state.originalEmployees];
  //   filtered = filtered.filter(employee => {

  //   // employee.name.first.toLowerCase().includes(searchValue) ||
  //   employee.name.last.toLowerCase().includes(searchValue)

  // })

   

    this.setState({
      employees: filtered

    })
  };

  handleRemove = id => {
    console.log(id);
    this.setState({
      employees: this.state.employees.filter(employee => employee.id.value !== id)
    });
  }

  handleSort = (key, key2, asc) => {
    
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
          {/* <ResultList employees={this.state.employees} /> */}
        </div>

      </div>

    )
  }

}

export default App;