import React from "react";
import useDynamicInputs from "../Custom/UseDynamicCount";

const Options = ({ dataFun }) => {
  const { count, labels, handleCountChange, handleLabelChange } =
    useDynamicInputs(1);
  dataFun(count, labels);
  return (
    // ... rest of your component using count and labels
    <div>
      <label>Select the number of options:</label>
      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => {
          const newCount = parseInt(e.target.value, 10);
          console.log(newCount);
          return handleCountChange(newCount);
        }}
      />
      {count >= 1 && (
        <>
          <label>Options:</label>
          <select>
            {labels.map((option, index) => (
              <option key={index} value={option}>
                {option || `Option ${index + 1}`}
              </option>
            ))}
          </select>

          <div>
            {labels.map((option, index) => (
              <div key={index}>
                <label>{`Option ${index + 1}: `}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default Options;
