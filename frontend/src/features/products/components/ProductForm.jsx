import React, { useState, useEffect } from 'react';
import { Button, Input } from '@components/ui';
import { PRODUCT_CATEGORIES } from '@utils/constants';

export const ProductForm = ({ onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    image: '',
    brand: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Update preview if image URL changes
    if (e.target.name === 'image') {
      setImagePreview(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        e.target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }

      // Create preview and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData({
          ...formData,
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert price and countInStock to numbers
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      countInStock: parseInt(formData.countInStock, 10),
    };
    
    onSubmit(submitData);
  };

  const clearImage = () => {
    setImagePreview('');
    setFormData({
      ...formData,
      image: ''
    });
    // Reset file input if in file mode
    const fileInput = document.getElementById('imageFile');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter product name"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 mb-2">
            Stock Count *
          </label>
          <Input
            type="number"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            required
            min="0"
            placeholder="0"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <Input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Image
        </label>
        
        <div className="flex gap-4 mb-3">
          <button
            type="button"
            onClick={() => setUploadMethod('url')}
            className={`px-4 py-2 rounded-md transition-colors ${
              uploadMethod === 'url' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod('file')}
            className={`px-4 py-2 rounded-md transition-colors ${
              uploadMethod === 'file' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upload File
          </button>
        </div>

        {uploadMethod === 'url' ? (
          <Input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full"
          />
        ) : (
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        )}

        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs max-h-48 object-contain border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={clearImage}
              className="mt-2 text-red-500 text-sm hover:text-red-700"
            >
              Clear Image
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => window.history.back()}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
