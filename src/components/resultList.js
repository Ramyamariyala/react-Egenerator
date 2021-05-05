import React from 'react';

function ResultList(props) {
    return (
      <ul className="list-group">
        {props.employees.map(employee => (
          <li className="list-group-item" key={employee.id.value}>
          </li>
        ))}
      </ul>
    );
  }
  
  export default ResultList;