export const products = [
  {
    _id: "sync-basic-tee",
    name: "SYNC BASIC TEE",
    price: "$49.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Premium cotton blend t-shirt featuring the iconic SYNC design. Made for comfort and style.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    _id: "sync-puffer-jacket",
    name: "SYNC PUFFER JACKET",
    price: "$199.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Warm and stylish puffer jacket perfect for winter.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    _id: "sync-logo-sweater",
    name: "SYNC LOGO SWEATER",
    price: "$89.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Cozy sweater with embro_idered SYNC logo.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    _id: "sync-cargo-pants",
    name: "SYNC CARGO PANTS",
    price: "$129.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Durable cargo pants with multiple pockets for convenience.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    _id: "sync-beanie",
    name: "SYNC BEANIE",
    price: "$29.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Warm knitted beanie for cold weather.",
    sizes: ["One Size"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  },
  {
    _id: "sync-hoodie",
    name: "SYNC HOODIE",
    price: "$99.99",
    image: "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
    description: "Soft fleece hoodie with the SYNC logo.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg",
      "https://i.ibb.co.com/Ct2y620/472545705-1121803022829334-6291234179691570565-n.jpg"
    ]
  }
];

export interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  sizes?: string[];
  images?: string[];
  category?: string;
}





export function createSlug(str: string): string {
  return str
    .toLowerCase()                            
    .trim()                                   
    .replace(/\s+/g, '-')                    
    .replace(/[^\w\-]+/g, '')                 
    .replace(/\-\-+/g, '-')                   
    .replace(/^-+/, '')                       
    .replace(/-+$/, '');                      
}