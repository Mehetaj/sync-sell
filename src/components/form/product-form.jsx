"use client"

import { useEffect, useReducer, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../../app/store/features/product-slice"
import Image from "next/image"
import uploadImageToImgBB from "../host-image"
import { fetchCatalogs } from "../../app/store/features/catalog-slice"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

const initialState = {
  name: "",
  price: "",
  category: "",
  image: "",
  images: [],
  sizes: [],
  description: "",
}

function productReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value }
    case "SET_SIZES":
      return { ...state, sizes: action.value }
    case "SET_MAIN_IMAGE":
      return { ...state, image: action.value }
    case "ADD_ADDITIONAL_IMAGE":
      return { ...state, images: [...state.images, action.value] }
    case "REMOVE_ADDITIONAL_IMAGE":
      return { ...state, images: state.images.filter((_, i) => i !== action.index) }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

export function ProductForm() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.product.loading)
  const [state, formDispatch] = useReducer(productReducer, initialState)
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { items, loading: categoriesLoading } = useSelector((state) => state.catalog)
  const [mdxSource, setMdxSource] = useState(null)
  const [activeTab, setActiveTab] = useState("edit")

  useEffect(() => {
    dispatch(fetchCatalogs())
  }, [dispatch])

  useEffect(() => {
    const compileMdx = async () => {
      if (state.description) {
        try {
          const mdxSource = await serialize(state.description)
          setMdxSource(mdxSource)
        } catch (error) {
          console.error("Error compiling MDX:", error)
        }
      } else {
        setMdxSource(null)
      }
    }

    compileMdx()
  }, [state.description])

  const handleImageUpload = async (e, isMain) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadedImageUrl = await uploadImageToImgBB(file)
    setUploading(false)

    if (!uploadedImageUrl) {
      alert("Failed to upload image. Please try again.")
      return
    }

    if (isMain) {
      setMainImagePreview(uploadedImageUrl)
      formDispatch({ type: "SET_MAIN_IMAGE", value: uploadedImageUrl })
    } else {
      formDispatch({ type: "ADD_ADDITIONAL_IMAGE", value: uploadedImageUrl })
    }
  }

  const handleInputChange = (e) => {
    formDispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value })
  }

  const handleArrayInputChange = (e) => {
    const values = e.target.value.split(",").map((item) => item.trim())
    formDispatch({ type: "SET_SIZES", value: values })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!state.name || !state.price || !state.category || !state.image) {
      alert("Please fill out all required fields!")
      return
    }
    dispatch(addProduct(state))
    formDispatch({ type: "RESET_FORM" })
    setMainImagePreview(null)
  }

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
          <Image
            src={mainImagePreview || "/placeholder.svg"}
            alt="Main product image"
            width={200}
            height={200}
            className="rounded-lg"
          />
        )}

        <label>Additional Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleImageUpload(e, false)}
          className="file-input"
        />
        <div className="flex flex-wrap gap-2">
          {state.images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Additional image ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <button
                type="button"
                onClick={() => formDispatch({ type: "REMOVE_ADDITIONAL_IMAGE", index })}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <label>Sizes (comma-separated)</label>
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma-separated)"
          value={state.sizes.join(", ")}
          onChange={handleArrayInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label>Description (MDX format supported)</label>
        <div className="w-full border rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "edit" ? "bg-gray-100 border-b-2 border-black" : "hover:bg-gray-50"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "preview" ? "bg-gray-100 border-b-2 border-black" : "hover:bg-gray-50"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Content */}
          {activeTab === "edit" ? (
            <textarea
              name="description"
              placeholder="Product description in MDX format"
              value={state.description}
              onChange={handleInputChange}
              className="w-full p-3 border-0 focus:outline-none focus:ring-0 min-h-[200px] font-mono"
            />
          ) : (
            <div className="p-4 prose max-w-none min-h-[200px] bg-white">
              {mdxSource ? (
                <MDXRemote {...mdxSource} components={mdxComponents} />
              ) : (
                <p className="text-gray-500 italic">No content to preview</p>
              )}
            </div>
          )}
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 font-medium tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 mt-6"
      >
        {isLoading ? "Adding Product..." : "Add Product"}
      </motion.button>
    </form>
  )
}

// MDX components for styling the preview
const mdxComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
  p: ({ children }) => <p className="mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <div className="my-4">
      <img src={src || "/placeholder.svg"} alt={alt || "Product image"} className="rounded-md max-w-full h-auto" />
    </div>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
  ),
  code: ({ children }) => <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
  pre: ({ children }) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto my-4 font-mono text-sm">{children}</pre>
  ),
}

