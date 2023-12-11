import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Input from "./Input";
import SelectButton from "./SelectButton";
import RadioButtons from "./RadioButtons";
import Checkboxes from "./Checkbox";
import Dropdown from "./Dropdown";

const Form1 = () => {
  const [formFields, setFormFields] = useState([]);
  const formref = useRef();
  const [currentField, setCurrentField] = useState({
    label: "",
    type: "text",
    options: [],
  });
  const [option, setOption] = useState([]);
  const [check, setCheck] = useState([{ label: "", checkOptions: [] }]);

  const handleOptions = (count, newOption) => {
    setOption(newOption);
  };

  const handlerChecked = (e, item) => {
    // console.log(item);
    // const { value, checked } = e.target;
    // console.log(`${value} is ${checked}`);
    // check.map((checkItem) => {
    //   return item !== checkItem && setCheck([...check, item]);
    // });
    const existingItemIndex = check.checkOptions.findIndex(
      (checkItem) => checkItem === item
    );
    const existingItem = check.checkOptions[existingItemIndex];

    let updatedItem;
    if (existingItem === item) {
      updatedItem = check.checkOptions.filter(
        (checkItem) => checkItem !== item
      );
      setCheck({ ...check, checkOptions: updatedItem });
    } else {
      updatedItem = [...check, item];
      setCheck({ ...check, checkOptions: updatedItem });
    }
  };
  console.log(check);

  useEffect(() => {
    setCurrentField({ ...currentField, options: option });
  }, [option]);

  const addField = () => {
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
    console.log(formref.current);
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
            <RadioButtons dataFun={handleOptions} />
          )}
          {currentField.type === "checkbox" && (
            <Checkboxes dataFun={handleOptions} />
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
              {field.type === "text" && (
                <input name={field.label} type={field.type}></input>
              )}
              {field.type === "email" && (
                <input name={field.label} type={field.type}></input>
              )}
              {field.type === "number" && (
                <input name={field.label} type={field.type}></input>
              )}
              {field.type === "radio" &&
                field.options.map((item, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor="radio">{item}</label>
                      <input
                        key={index}
                        name={field.label}
                        type="radio"
                        value={item}
                      />
                    </div>
                  );
                })}
              {field.type === "checkbox" &&
                field.options.map((item, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor={`checkbox-${field.label}-${index}`}>
                        {item}
                      </label>
                      <input
                        key={index}
                        id={`checkbox-${field.label}-${index}`}
                        name={field.label}
                        type="checkbox"
                        checked={item.selected}
                        value={item}
                      />
                    </div>
                  );
                })}
              {field.type === "radio" &&
                field.options.map((item, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor="dropdown">{item}</label>
                      <input
                        key={index}
                        name={field.label}
                        type=""
                        value={item}
                      />
                    </div>
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

export default Form1;
