import React from "react";
import useDynamicInputs from "../Custom/UseDynamicCount";

const Checkboxes = ({ dataFun }) => {
  const { count, labels, handleCountChange, handleLabelChange } =
    useDynamicInputs(1);
  dataFun(count, labels);
  return (
    <div>
      <label>Select the number of checkboxes:</label>
      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => {
          const newCount = parseInt(e.target.value, 10);
          return handleCountChange(newCount);
        }}
      />

      <div>
        {labels.map((label, index) => (
          <div key={index}>
            <input type="checkbox" id={`checkbox${index}`} />
            <label htmlFor={`checkbox${index}`}>
              {label || `Option ${index + 1}`}
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkboxes;
