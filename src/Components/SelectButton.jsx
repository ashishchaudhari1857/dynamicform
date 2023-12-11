import React, { useState ,useEffect } from 'react'
import Input from './Input';


const SelectButton = ({value,onChange,name ,sizehandle ,validateHandler}) => {
  const [size ,setSize]=useState(2);
  const [mail ,setmail]=useState("")
  const [phone ,setphone]=useState(0)
  useEffect(() => {
    sizehandle(size);
  }, [size, sizehandle]);

  useEffect(() => {
    validateHandler(mail, phone);
  }, [mail, phone, validateHandler]);
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
        {value ==="email"  && <><Input type="text"  placeholder='Enter Validation'  value={mail} onChange={(e)=>setmail(e.target.value)} ></Input>  <span>  (ex. length ,  @ ,etc...  )</span></>}
        {value ==="number"  &&  <><Input type="text"  placeholder='Enter Validation'  value={phone} onChange={(e)=>setphone(e.target.value)}/>  <span>  (ex. length , # ,/ ,0-9 , @ ,etc...  )</span> </>} 
    </div>
  )
}

export default SelectButton