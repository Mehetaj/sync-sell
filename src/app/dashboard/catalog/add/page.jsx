'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux'; // Ensure this action is defined
import { toast } from 'react-toastify';
import Image from 'next/image';
import uploadImageToImgBB from '../../../../components/host-image'
import { addCatalog } from '../../../store/features/catalog-slice';



const AddCatalogPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadedImageUrl = await uploadImageToImgBB(file);
      if (uploadedImageUrl) {
        setImagePreview(uploadedImageUrl);
        setFormData({ ...formData, image: uploadedImageUrl });
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(addCatalog(formData)); // Replace this with your action to add the catalog
      toast.success('Catalog added successfully!');
      setIsLoading(false);
    } catch (error) {
      toast.error(`Failed to add catalog. Please try again.${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 font-metal">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/catalog"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-metal text-2xl tracking-wider">Add New Catalog</h1>
          <p className="text-gray-600 mt-1">Create a new catalog</p>
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
          {isLoading ? 'Saving...' : 'Add Catalog'}
        </motion.button>
      </form>
    </div>
  );
};

export default AddCatalogPage;
