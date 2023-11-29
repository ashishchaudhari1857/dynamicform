import React, { useState } from "react";

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [visibleFields, setVisibleFields] = useState([]);

  const addFormField = (type) => {
    setFormFields([...formFields, { type, label: "", options: [] }]);
  };

  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
    // Validate the updated field
    const validationError = validateField(updatedFields[index]);
    setFormErrors({ ...formErrors, [index]: validationError });

    // Update visibility based on conditional logic
    const updatedVisibility = determineVisibility(updatedFields);
    setVisibleFields(updatedVisibility);
  };

  const determineVisibility = (fields) => {
    // Implement your logic to determine which fields should be visible
    // based on the values of other fields.
    // Return an array indicating the visibility status of each field.
    return fields.map((field) => true); // For simplicity, all fields are initially visible
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = [...formFields];
    updatedFields[index].options[optionIndex] = value;
    setFormFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
    console.log("Form Data:", formData);
  };

  // Inside your component:

  const validateField = (field) => {
    // Implement validation rules based on field type
    if (field.type === "text" && field.label === "") {
      return "Label is required for text input";
    }
    // Add more validation rules as needed
    return null; // No validation error
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>
              Label:
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  handleInputChange(index, "label", e.target.value)
                }
              />
            </label>
            <label>
              Type:
              <select
                value={field.type}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
              >
                <option value="text">Text Input</option>
                <option value="textarea">Text Area</option>
                <option value="dropdown">Dropdown</option>
                {/* Add other field types */}
              </select>
            </label>
            {field.type === "dropdown" && (
              <div>
                Options:
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleOptionChange(index, field.options.length, "")
                  }
                >
                  Add Option
                </button>
              </div>
            )}
            <button type="button" onClick={() => removeFormField(index)}>
              Remove
            </button>
            <span style={{ color: "red" }}>{formErrors[index]}</span>
          </div>
          //  )}
        ))}
        <button type="button" onClick={() => addFormField("text")}>
          Add Text Input
        </button>
        <button type="button" onClick={() => addFormField("textarea")}>
          Add Text Area
        </button>
        <button type="button" onClick={() => addFormField("dropdown")}>
          Add Dropdown
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
