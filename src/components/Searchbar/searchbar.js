import React from 'react';
import "./style.css";


function Searchbar(props) {
  return (
    <form> 
      <div className="form-group">
    
        <label htmlFor="search">Search:</label>
        <input
        //  key={props.employee.id.value}
          onChange={props.handleInputChange}
          value={props.getUsers}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search an employee by name"
          id="search"
        />
        <button style={{ margin: "10px" }}  onClick={(event) => props.handleFormSubmit(event)} className="btn btn-primary mt-3"> 
          Search
        </button>
      </div>
    </form>
  );
}

export default Searchbar;