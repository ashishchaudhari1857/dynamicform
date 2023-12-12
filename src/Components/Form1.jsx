import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import Input from "./Input";
import SelectButton from "./SelectButton";
import RadioButtons from "./RadioButtons";
import Checkboxes from "./Checkbox";
import FileUploadComponent from "./File";
import "../CSS/formBuilder.css";
import Options from "./Options";

const Form1 = () => {
  const [formFields, setFormFields] = useState([]);
  const formref = useRef();
  const [size, setSize] = useState(2);
  const [Validation, setValidatioin] = useState(2);
  const [InputValidatioin, setInnputValidation] = useState({
    mail: "",
    phone: "",
  });

  const [currentField, setCurrentField] = useState({
    label: "",
    type: "text",
    options: [],
    required: false,
  });
  const [option, setOption] = useState([]);
  const [check, setCheck] = useState([]);
  // const [required, setRequired] = useState(false);

  const handleOptions = (count, newOption) => {
    setOption(newOption);
  };

  const validateHandler = useCallback((mail, phone) => {
    // console.log(mail, phone);
    setInnputValidation((prevState) => ({
      ...prevState,
      mail: mail,
      phone: phone,
    }));
  }, []);

  // console.log("InputValidatioin ", InputValidatioin);
  const sizehandle = (size) => {
    setSize(size);
  };
  // console.log("size ", size);

  const handlerChecked = (e, item) => {
    const existingItemIndex = check.findIndex(
      (checkItem) => checkItem === item
    );
    const existingItem = check[existingItemIndex];

    let updatedItem;
    if (existingItem === item) {
      updatedItem = check.filter((checkItem) => checkItem !== item);
      setCheck(updatedItem);
    } else {
      updatedItem = [...check, item];
      setCheck(updatedItem);
    }
  };
  // console.log(check);

  useEffect(() => {
    setCurrentField({ ...currentField, options: option });
  }, [option]);

  const addField = () => {
    if (currentField.label === "") {
      alert("please enter label");
    } else {
      setFormFields([...formFields, currentField]);
      setCurrentField({ label: "", type: "text", required: false });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formref.current);
    const formData = new FormData(formref.current);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    const response = await fetch("http://localhost:5000/FormData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formValues),
    });
    const data = await response.json(response);
    console.log("Form Fields:", data);
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
            sizehandle={sizehandle}
            validateHandler={validateHandler}
          />
          <label>Required Field</label>
          <input
            type="checkbox"
            checked={currentField.required}
            onChange={() => {
              setCurrentField({
                ...currentField,
                required: !currentField.required,
              });
            }}
          />
          {currentField.type === "radio" && (
            <RadioButtons dataFun={handleOptions} />
          )}
          {currentField.type === "checkbox" && (
            <Checkboxes dataFun={handleOptions} />
          )}

          {currentField.type === "dropdown" && (
            <Options dataFun={handleOptions} />
          )}
          <button type="button" onClick={addField}>
            Add Field
          </button>
          {/* {console.log(currentField)} */}
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
                <input
                  name={field.label}
                  type={field.type}
                  required={field.required}
                ></input>
              )}
              {field.type === "email" && (
                <input
                  name={field.label}
                  type={field.type}
                  required={field.required}
                ></input>
              )}
              {field.type === "number" && (
                <input
                  name={field.label}
                  type={field.type}
                  required={field.required}
                ></input>
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
                        required={field.required}
                      />
                    </div>
                  );
                })}
              {field.type === "checkbox" &&
                field.options.map((item, index) => {
                  return (
                    <div key={index}>
                      <label htmlFor="checkbox">{item}</label>
                      <input
                        key={index}
                        name={field.label}
                        type="checkbox"
                        value={item}
                        required={field.required}
                        onChange={(e) => {
                          handlerChecked(e, item);
                        }}
                      />
                    </div>
                  );
                })}
              {field.type === "dropdown" && (
                <div>
                  <select required={field.required}>
                    {field.options.map((item, index) => {
                      console.log(item);
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
              {field.type === "file" && (
                <FileUploadComponent size={size}></FileUploadComponent>
              )}
              {/* {field.type === "dropdown" && <Dropdown />} */}
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
