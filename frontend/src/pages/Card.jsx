import React, { useState } from 'react';
import '../assets/card.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Card = ({ product,fetchData}) => {

    const navigate= useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };


  const handleSave = () => {
    const response = fetch(`http://localhost:8080/api/update/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    });
    
    
    response && alert("product updated successfully");
    setIsEditing(false); 
    fetchData();
  };

  const handleDelete = async () => {
    const response = fetch(`http://localhost:8080/api/delete/${product.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    });
    
    
    response && alert("product deleted successfully");
    setIsEditing(false); 
    fetchData();
    };


  const handleCancel = () => {
    setEditedProduct({ ...product }); 
    setIsEditing(false); 
  };

  return (
    <div className="card">
      <div className="card-header">
        {!isEditing ? (
          <>
            <button className="card-btn edit-btn" onClick={toggleEditMode}>Edit</button>
            <button className="card-btn delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
          </>
        ) : (
          <>
            <button className="card-btn save-btn" onClick={handleSave}>Save</button>
            <button className="card-btn cancel-btn" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>

      <h2 className="card-title">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="card-input"
          />
        ) : (
          `Title: ${product.name}`
        )}
      </h2>

      <p className="card-description">
        {isEditing ? (
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            className="card-input"
          />
        ) : (
          `Description: ${product.description}`
        )}
      </p>

      <p className="card-price">
        {isEditing ? (
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="card-input"
          />
        ) : (
          `Price: $${product.price}`
        )}
      </p>

      <p className="card-quantity">
        {isEditing ? (
          <input
            type="number"
            name="quantity"
            value={editedProduct.quantity}
            onChange={handleInputChange}
            className="card-input"
          />
        ) : (
          `Quantity: ${product.quantity}`
        )}
      </p>
    </div>
  );
};

export default Card;
