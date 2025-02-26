"use client";

import React, { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../app/store/features/product-slice";
import Image from "next/image";
import uploadImageToImgBB from "../host-image";
import { fetchCatalogs } from "../../app/store/features/catalog-slice";

const initialState = {
  name: "",
  price: "",
  category: "",
  image: "",
  images: [],
  sizes: [],
  description: "",
};

function productReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_SIZES":
      return { ...state, sizes: action.value };
    case "SET_MAIN_IMAGE":
      return { ...state, image: action.value };
    case "ADD_ADDITIONAL_IMAGE":
      return { ...state, images: [...state.images, action.value] };
    case "REMOVE_ADDITIONAL_IMAGE":
      return { ...state, images: state.images.filter((_, i) => i !== action.index) };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export function ProductForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.loading);
  const [state, formDispatch] = useReducer(productReducer, initialState);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { items, loading: categoriesLoading } = useSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleImageUpload = async (e, isMain) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadedImageUrl = await uploadImageToImgBB(file);
    setUploading(false);

    if (!uploadedImageUrl) {
      alert("Failed to upload image. Please try again.");
      return;
    }

    if (isMain) {
      setMainImagePreview(uploadedImageUrl);
      formDispatch({ type: "SET_MAIN_IMAGE", value: uploadedImageUrl });
    } else {
      formDispatch({ type: "ADD_ADDITIONAL_IMAGE", value: uploadedImageUrl });
    }
  };

  const handleInputChange = (e) => {
    formDispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleArrayInputChange = (e) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    formDispatch({ type: "SET_SIZES", value: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.price || !state.category || !state.image) {
      alert("Please fill out all required fields!");
      return;
    }
    dispatch(addProduct(state));
    formDispatch({ type: "RESET_FORM" });
    setMainImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-6 font-metal">
      <div className="grid grid-cols-1 gap-4 font-metal">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={state.name}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <label>Price ($)</label>
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={state.price}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={state.category}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        >
          <option value="">Select category</option>
          {categoriesLoading ? (
            <option disabled>Loading categories...</option>
          ) : (
            items.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))
          )}
        </select>

        <label>Main Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="file-input" />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {mainImagePreview && (
          <Image src={mainImagePreview || "/placeholder.svg"} alt="Main product image" width={200} height={200} className="rounded-lg" />
        )}

        <label>Additional Images</label>
        <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, false)} className="file-input" />
        <div className="flex flex-wrap gap-2">
          {state.images.map((image, index) => (
            <div key={index} className="relative">
              <Image src={image || "/placeholder.svg"} alt={`Additional image ${index + 1}`} width={100} height={100} className="rounded-lg" />
              <button type="button" onClick={() => formDispatch({ type: "REMOVE_ADDITIONAL_IMAGE", index })} className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs">
                X
              </button>
            </div>
          ))}
        </div>

        <label>Sizes (comma-separated)</label>
        <input type="text" name="sizes" placeholder="Sizes (comma-separated)" value={state.sizes.join(", ")} onChange={handleArrayInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

        <label>Description</label>
        <textarea name="description" placeholder="Product description" value={state.description} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full bg-black text-white py-3 font-medium tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50">
        {isLoading ? "Adding Product..." : "Add Product"}
      </motion.button>
    </form>
  );
}
