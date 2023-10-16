import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    upc: '',
    availableOn: '',
    properties: [{ propertyName: '', propertyValue: '' }],
  });
  const [errorMessage, setErrorMessage] = useState(null); // State variable for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePropertyChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProperties = [...formData.properties];
    updatedProperties[index][name] = value;
    setFormData({
      ...formData,
      properties: updatedProperties,
    });
  };

  const addProperty = () => {
    console.log('Add Properties clicked');
    if (formData.properties.length < 10) {
      setFormData({
        ...formData,
        properties: [...formData.properties, { propertyName: '', propertyValue: '' }],
      });
    }
  };

  const clearFields = () => {
    setFormData({
      name: '',
      upc: '',
      availableOn: '',
      properties: [{ propertyName: '', propertyValue: '' }],
    });
    setErrorMessage(null); // Clear error message when fields are cleared
  };

  const saveData = () => {
    console.log('Save button clicked');
    console.log('Data to send:', JSON.stringify(formData));
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data saved:', data);
        clearFields();
        setErrorMessage(null); // Clear any previous error message
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setErrorMessage('Validations failed, and the record was not saved.');
      });
  };

  return (
    <div className="form-container">
      <h1>Form</h1>
      <form>
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>UPC:</label>
          <input
            type="text"
            name="upc"
            value={formData.upc}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Available On:</label>
          <input
            type="text"
            name="availableOn"
            value={formData.availableOn}
            onChange={handleChange}
          />
        </div>
        {formData.properties.map((property, index) => (
          <div key={index} className="property-field">
            <label>Property Name:</label>
            <input
              type="text"
              name="propertyName"
              value={property.propertyName}
              onChange={(e) => handlePropertyChange(e, index)}
            />
            <label>Property Value:</label>
            <input
              type="text"
              name="propertyValue"
              value={property.propertyValue}
              onChange={(e) => handlePropertyChange(e, index)}
            />
          </div>
        ))}
      </form>
      <button onClick={addProperty}>Add More Properties</button>
      <button onClick={saveData}>Save</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/products">Go to Products</Link> {/* Add this link to navigate to the Products page */}
    </div>
  );
};

export default Form;
