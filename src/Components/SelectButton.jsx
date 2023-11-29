import React from 'react'

const SelectButton = ({value,onChange,name}) => {
  return (
    <div>
        <select value={value} onChange={onChange} name={name}>
        <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="textarea">Textarea</option>
            <option value="password">Password</option>
            <option value="radio">radio</option>
            <option value="dropdown">dropdown</option>
            <option value="checkbox">Checkbox</option>
        </select>
    </div>
  )
}

export default SelectButton