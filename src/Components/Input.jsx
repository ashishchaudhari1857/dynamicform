import React from 'react'


const Input = ({text,name,onChange,value}) => {
  return (
    <div>
        <input type={text}  name={name} onChange={onChange} value={value}/>
    </div>
  )
}
Input.defaultProps = {
    text: "text",
    name: 'type',
}

export default Input