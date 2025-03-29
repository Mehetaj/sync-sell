"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import uploadImageToImgBB from "../../../../components/host-image";
import { useDispatch, useSelector } from "react-redux";
import { addNewArrival } from "../../../../app/store/features/new-arrival-slice";
import { fetchCatalogs } from "../../../../app/store/features/catalog-slice";
import Image from "next/image";

const AddNewArrivalPage = () => {
  const dispatch = useDispatch();
  const { items: categories, loading: categoriesLoading } = useSelector((state) => state.catalog);

  const [formData, setFormData] = useState({ name: "", price: "", image: "", launchDate: "", category: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadImageToImgBB(file);
      if (uploadedImageUrl) {
        setImagePreview(uploadedImageUrl);
        setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(addNewArrival(formData));
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, formData]);

  return (
    <div className="mx-auto p-6 font-metal">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/new-arrival" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl tracking-wider">Add New Arrival Products</h1>
          <p className="text-gray-600 mt-1">Create a new arrival</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Price", name: "price", type: "text" },
          { label: "Launch Date", name: "launchDate", type: "date" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block font-semibold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
            required
          >
            <option value="">Select Category</option>
            {categoriesLoading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map(({ _id, name }) => <option key={_id} value={name}>{name}</option>)
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-semibold mb-1">Image Upload</label>
          <div className="w-full p-4 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center relative">
            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="text-center">
              {imagePreview ? (
                 <Image
                 src={imagePreview}
                 alt="Image Preview"
                 width={128} // Adjust as needed
                 height={128} // Adjust as needed
                 className="w-32 h-32 object-cover rounded-md border"
               />
              ) : (
                <p className="text-gray-500">Drag & drop or click to upload</p>
              )}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 font-semibold tracking-wider hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Add New Arrival"}
        </motion.button>
      </form>
    </div>
  );
};

export default AddNewArrivalPage;