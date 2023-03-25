import React from "react";

function RequestForm() {
  const [forms, setForms] = React.useState([{ documents: "", purpose: "" }]);

  const handleAddForm = () => {
    setForms((prevForms) => [...prevForms, { documents: "", purpose: "" }]);
  };

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms[index][name] = value;
      return newForms;
    });
  };

  const handleCancelForm = (index) => {
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  };

  const handleSubmitForms = (event) => {
    event.preventDefault();
    console.log(forms); // do something with the form data here
  };

  return (
    <form onSubmit={handleSubmitForms}>
      {forms.map((form, index) => (
        <div key={index}>
          <label htmlFor={`documents-${index}`}>Documents:</label>
          <select id={`documents-${index}`} name="documents" value={form.documents} onChange={(event) => handleFormChange(event, index)}>
            <option value="">Select documents...</option>
            <option value="passport">Passport</option>
            <option value="driver-license">Driver's License</option>
            <option value="id-card">ID Card</option>
          </select>
          <br />
          <label htmlFor={`purpose-${index}`}>Purpose:</label>
          <input id={`purpose-${index}`} name="purpose" type="text" value={form.purpose} onChange={(event) => handleFormChange(event, index)} />
          <br />
          {index > 0 && (
            <button type="button" onClick={() => handleCancelForm(index)}>
              Cancel
            </button>
          )}
        </div>
      ))}
      <br />
      <button type="button" onClick={handleAddForm}>
        Add Form
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RequestForm;
