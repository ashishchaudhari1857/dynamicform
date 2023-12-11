import React from 'react'


const Input = ({type,name,onChange,value ,placeholder}) => {
  return (
    <div>
        <input type={type}  name={name} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  )
}
Input.defaultProps = {
    type: "text",
    name: 'type',
}

export default Input