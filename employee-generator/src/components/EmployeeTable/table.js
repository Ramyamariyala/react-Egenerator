import React from 'react';
import './style.css';


const EmployeeTable = (props) => {
  console.log(props.employees)
  window.debugprops = props
  return (
    <ul>
        {props.employees.map(employee => (
          
            <div key={employee.id.value} className="card">
              
            <li className="list-group-item" >
            <strong>Email:</strong> {employee.email}
              <div className="img-container"></div>
              <img alt={employee.name} className="img-fluid" src={employee.picture.large} />
            </li>
            <li className="list-group-item" >
            <strong>Name:</strong> 
            {employee.name.first}
            {employee.name.last}
            </li>
            <span className="remove" onClick={() => props.handleRemove(employee.id.value)}>X</span>
            </div>
        ))}
        </ul>
  )
}
export default EmployeeTable;