export const products = [
  {
    id: "sync-basic-tee",
    name: "SYNC BASIC TEE",
    price: "$49.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Premium cotton blend t-shirt featuring the iconic SYNC design. Made for comfort and style.",
    details: [
      "100% Premium Cotton",
      "Regular fit",
      "Ribbed crew neck",
      "SYNC logo print",
      "Machine washable"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    id: "sync-puffer-jacket",
    name: "SYNC PUFFER JACKET",
    price: "$199.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Warm and stylish puffer jacket perfect for winter.",
    details: [
      "Water-resistant fabric",
      "Synthetic insulation",
      "Zipper closure",
      "Machine washable"
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    id: "sync-logo-sweater",
    name: "SYNC LOGO SWEATER",
    price: "$89.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Cozy sweater with embroidered SYNC logo.",
    details: [
      "80% Cotton, 20% Polyester",
      "Regular fit",
      "Ribbed cuffs and hem",
      "Machine washable"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    id: "sync-cargo-pants",
    name: "SYNC CARGO PANTS",
    price: "$129.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Durable cargo pants with multiple pockets for convenience.",
    details: [
      "100% Cotton",
      "Loose fit",
      "Multiple cargo pockets",
      "Machine washable"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    id: "sync-beanie",
    name: "SYNC BEANIE",
    price: "$29.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Warm knitted beanie for cold weather.",
    details: [
      "100% Acrylic",
      "One size fits all",
      "Embroidered SYNC logo"
    ],
    sizes: ["One Size"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    id: "sync-hoodie",
    name: "SYNC HOODIE",
    price: "$99.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Soft fleece hoodie with the SYNC logo.",
    details: [
      "Cotton blend",
      "Kangaroo pocket",
      "Drawstring hood",
      "Machine washable"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  }
];

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  images?: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
  category?: string;
}

export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find(product => product.id === slug);
}


export interface ProductFormData {
  name: string
  price: string
  category: string
  stock: number
  image: string
}