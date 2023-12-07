import React, { useState } from "react";
import { useRef } from "react";
import Input from "./Input";
import SelectButton from "./SelectButton";
import RadioButtons from "./RadioButtons";
import Checkboxes from "./Checkbox";
import Dropdown from "./Dropdown";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const formref = useRef();
  const [currentField, setCurrentField] = useState({ label: "", type: "text" });
  const [option, setOption] = useState([]);

  const dataRadiobutton = (count, newLabel) => {
    setOption(newLabel);
  };
  const addField = () => {
    // console.log("isc", currentField.label);
    if (currentField.label === "") {
      alert("please enter label");
    } else {
      setFormFields([...formFields, currentField]);
      setCurrentField({ label: "", type: "text" });
    }
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleLabelChange = (event) => {
    setCurrentField({ ...currentField, label: event.target.value });
  };

  const handleTypeChange = (event) => {
    setCurrentField({ ...currentField, type: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formref.current);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    console.log("Form Fields:", formValues);
  };

  return (
    <div className="container">
      <form ref={formref} onSubmit={handleSubmit}>
        <div className="left-column">
          <label>Label:</label>
          <Input
            type="text"
            name="label"
            value={currentField.label}
            onChange={handleLabelChange}
          />

          <label>Type:</label>
          <SelectButton
            value={currentField.type}
            onChange={handleTypeChange}
            name="type"
          />

          {currentField.type === "radio" && (
            <RadioButtons dataFun={dataRadiobutton} />
          )}
          {currentField.type === "checkbox" && (
            <Checkboxes dataFun={dataRadiobutton} />
          )}
          {currentField.type === "dropdown" && <Dropdown />}
          <button type="button" onClick={addField}>
            Add Field
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="right-column">
          {formFields.map((field, index) => (
            <div key={index}>
              <span>{field.label}</span> :{" "}
              {field.type === "textarea" && (
                <textarea name={field.label}></textarea>
              )}
              {field.type === ("text" || "email" || "number") && (
                <input name={field.label} type={field.type}></input>
              )}
              {field.type === "radio" &&
                option.map((item, index) => {
                  return (
                    <>
                      <label htmlFor="radio">{item}</label>
                      <input
                        key={index}
                        name={field.label}
                        type="radio"
                        value={item}
                      />
                    </>
                  );
                })}
              {field.type === "checkbox" &&
                option.map((item, index) => {
                  return (
                    <>
                      <label htmlFor="checkbox">{item}</label>
                      <input
                        key={index}
                        name={field.label}
                        type="checkbox"
                        value={item}
                      />
                    </>
                  );
                })}
              {field.type === "dropdown" && <Dropdown />}
              <button type="button" onClick={() => removeField(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
