import React, { useState } from 'react'


const SelectButton = ({value,onChange,name ,sizehandle}) => {
  const [size ,setSize]=useState(2);
  sizehandle(size)
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
            <option value="file">Choose File  </option>
            <option value="number">Phone No</option>

        </select>
        {value ==="file" && <><input type='number'   value={size} onChange={(e)=>{setSize(e.target.value) 
        }}></input> <span>/MB</span> </>}
    </div>
  )
}

export default SelectButton