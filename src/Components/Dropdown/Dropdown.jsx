
import React from 'react';
import './Dropdown.css';

const Dropdown = ({ options, value, onChange, ...props }) => {
  return (
    <select 
      className="dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
