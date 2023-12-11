import React, { useState } from "react";
import useDynamicInputs from "../Custom/UseDynamicCount";
import Form1 from "./Form1";

const RadioButtons = ({ dataFun }) => {
  const { count, labels, handleCountChange, handleLabelChange } =
    useDynamicInputs(1);
  // console.log([...labels]);
  dataFun(count, labels);

  const [visibility, setVisibility] = useState(false);
  return (
    <div>
      <label>Select the number of radio buttons:</label>
      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => {
          const newCount = parseInt(e.target.value, 10);
          // console.log(newCount);
          return handleCountChange(newCount);
        }}
      />

      <div>
        {labels.map((label, index) => (
          <div key={index}>
            <input type="radio" name="radioGroup" id={`radio${index}`} />
            <label htmlFor={`radio${index}`}>
              {label || `Option ${index + 1}`}
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setVisibility(true);
              }}
            >
              Add Respective field
            </button>
          </div>
        ))}
      </div>
      {visibility && <Form1 />}
    </div>
  );
};
export default RadioButtons;
