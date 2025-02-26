'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import uploadImageToImgBB from "../../../../components/host-image";
import { useDispatch, useSelector } from "react-redux";
import { addNewArrival } from "../../../../app/store/features/new-arrival-slice";
import { toast } from "react-toastify";
import { fetchCatalogs } from "../../../../app/store/features/catalog-slice";
import Image from "next/image";



const AddNewArrivalPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    launchDate: '',
    category: '',
  });

  const dispatch = useDispatch;
  const { items, loading: categoriesLoading } = useSelector((state) => state.catalog);

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageUrl = await uploadImageToImgBB(file);
      if (uploadedImageUrl) {
        setImagePreview(uploadedImageUrl);
        setFormData({ ...formData, image: uploadedImageUrl });
      } else {
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your API or dispatch a Redux action here to save the new arrival data
      await dispatch(addNewArrival(formData));
      toast.success('New arrival added successfully!');
      setIsLoading(false);
    } catch (error) {
      toast.error(`Failed to add new arrival. Please try again.${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 font-metal">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/new-arrival"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-metal text-2xl tracking-wider">Add New Arrival Products</h1>
          <p className="text-gray-600 mt-1">Create a new arrival</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Category</option>
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
          </div>

          {/* Launch Date */}
          <div>
            <label className="block font-semibold mb-1">Launch Date</label>
            <input
              type="date"
              value={formData.launchDate}
              onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Image Input */}
          <div className="space-y-2">
            <label className="block font-semibold mb-1">Image Upload</label>
            <div className="w-full p-4 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="text-center z-0">
                {!imagePreview ? (
                  <>
                    <p className="text-gray-500 mb-2">Drag & drop your image here</p>
                    <p className="text-gray-400">or click to select a file</p>
                  </>
                ) : (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 font-semibold tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Add New Arrival'}
        </motion.button>
      </form>
    </div>
  );
};

export default AddNewArrivalPage;