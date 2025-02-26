"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import uploadImageToImgBB from "../../../../../components/host-image"
import { useDispatch, useSelector } from "react-redux"
import { editNewArrival, fetchNewArrivals } from "../../../../../app/store/features/new-arrival-slice"
import { toast } from "react-toastify"
import Image from "next/image"
import { createSlug } from "../../../../../lib/products"



const EditNewArrival = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const newArrivals = useSelector((state) => state.newArrival.items)

    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        price: "",
        image: "",
        launchDate: "",
        category: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        dispatch(fetchNewArrivals())
    }, [dispatch])

    useEffect(() => {
        if (newArrivals.length > 0 && id) {
            const newArrival = newArrivals.find((item) => createSlug(item.name) === id)
            if (newArrival) {
                setFormData(newArrival)
                setImagePreview(newArrival.image)
            } else {
                toast.error("New arrival not found")
            }
        }
    }, [newArrivals, id])

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const uploadedImageUrl = await uploadImageToImgBB(file)
            if (uploadedImageUrl) {
                setImagePreview(uploadedImageUrl)
                setFormData({ ...formData, image: uploadedImageUrl })
            } else {
                toast.error("Failed to upload image. Please try again.")
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(editNewArrival({
                updatedArrival: formData,
                id: formData._id
            })).unwrap();

            toast.success("New arrival updated successfully!");
        } catch (error) {
            toast.error(`Failed to update new arrival. Please try again.${error}`);
        }
        setIsLoading(false);
    };


    return (
        <div className="mx-auto p-6 font-metal">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/new-arrival" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="font-metal text-2xl tracking-wider">Edit New Arrival</h1>
                    <p className="text-gray-600 mt-1">Update new arrival details</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Price</label>
                        <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Hoodies">Hoodies</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Outerwear">Outerwear</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Launch Date</label>
                        <input
                            type="date"
                            value={formData.launchDate}
                            onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
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
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-md border"
                                    />
                                ) : (
                                    <p className="text-gray-400">Click to select an image</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 font-semibold tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Update New Arrival"}
                </motion.button>
            </form>
        </div>
    )
}

export default EditNewArrival

