import { useEffect, useState } from 'react';
import '../assets/style.css';
import Card from './Card';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle the Add Product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  // Fetch products from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/all');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optional: alert('Could not connect to the inventory service.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input changes in the Add Product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value, // Update the corresponding field in state
    }));
  };

  // Function to reset the new product form state
  const resetForm = () => {
    setNewProduct({ name: '', description: '', price: '', quantity: '' });
  };

  // Handle canceling the form (closes modal and resets fields)
  const handleCancel = () => {
    setShowAddForm(false);
    resetForm();
  };

  // Handle submitting the new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Simple validation for required fields
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          quantity: parseInt(newProduct.quantity, 10),
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        // setProducts([...products, addedProduct]); 
        setShowAddForm(false); 
        resetForm(); 
        alert('Product added successfully!');
        fetchData();
      } else {
        const errorText = await response.text();
        alert(`Failed to add product: ${errorText || 'Server Error'}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert('An error occurred while connecting to the server.');
    }
  };

  return (
    <>
      <div className="container">
        <h1>Inventory Management</h1>
        <h2>Welcome to the Inventory Management System</h2>

        {/* Add Product Button */}
        <button onClick={() => setShowAddForm(true)}>Add Product</button>
      </div>

      {/* Add Product Form (Modal/Pop-up Structure) */}
      {showAddForm && (
        <div className="modal-backdrop"> {/* CSS class for the screen overlay */}
          <div className="modal-content"> {/* CSS class for the form container */}
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                required
              />
              <div className="form-buttons">
                <button type="submit">Add Product</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <hr />

      {/* Display the list of products */}
      <div className="cards-container">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} product={product} fetchData={fetchData} /> 
          ))
        ) : (
          <p>No products found in the inventory. Click "Add Product" to get started!</p>
        )}
      </div>
    </>
  );
};

export default HomePage;