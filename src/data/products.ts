export type Category = 'tops' | 'pants' | 'bags' | 'caps' | 'shirts' | 'jeans';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
  stock: number;
  barcode: string;
  description?: string;
}

export const categories: { id: Category; name: string; icon: string }[] = [
  { id: 'tops', name: 'Tops', icon: '👕' },
  { id: 'shirts', name: 'Shirts', icon: '👔' },
  { id: 'pants', name: 'Pants', icon: '👖' },
  { id: 'jeans', name: 'Jeans', icon: '🩳' },
  { id: 'bags', name: 'Bags', icon: '👜' },
  { id: 'caps', name: 'Caps', icon: '🧢' },
];

export const products: Product[] = [
  // Tops
  {
    id: 'top-1',
    name: 'Classic Cotton Tee',
    category: 'tops',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    stock: 50,
    barcode: 'TOP001',
  },
  {
    id: 'top-2',
    name: 'Premium Polo Shirt',
    category: 'tops',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc4e5e6a1c5?w=400',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Red'],
    stock: 35,
    barcode: 'TOP002',
  },
  {
    id: 'top-3',
    name: 'Graphic Print Tee',
    category: 'tops',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Grey'],
    stock: 40,
    barcode: 'TOP003',
  },
  {
    id: 'top-4',
    name: 'V-Neck Essential',
    category: 'tops',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Grey'],
    stock: 60,
    barcode: 'TOP004',
  },
  // Shirts
  {
    id: 'shirt-1',
    name: 'Oxford Button Down',
    category: 'shirts',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Pink'],
    stock: 30,
    barcode: 'SHT001',
  },
  {
    id: 'shirt-2',
    name: 'Slim Fit Dress Shirt',
    category: 'shirts',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    stock: 25,
    barcode: 'SHT002',
  },
  {
    id: 'shirt-3',
    name: 'Casual Linen Shirt',
    category: 'shirts',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    sizes: ['M', 'L', 'XL'],
    colors: ['White', 'Beige', 'Light Blue'],
    stock: 20,
    barcode: 'SHT003',
  },
  {
    id: 'shirt-4',
    name: 'Flannel Check Shirt',
    category: 'shirts',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Green'],
    stock: 28,
    barcode: 'SHT004',
  },
  // Pants
  {
    id: 'pant-1',
    name: 'Chino Trousers',
    category: 'pants',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400',
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black'],
    stock: 40,
    barcode: 'PNT001',
  },
  {
    id: 'pant-2',
    name: 'Tailored Dress Pants',
    category: 'pants',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Black', 'Navy', 'Charcoal'],
    stock: 25,
    barcode: 'PNT002',
  },
  {
    id: 'pant-3',
    name: 'Cargo Pants',
    category: 'pants',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400',
    sizes: ['30', '32', '34', '36'],
    colors: ['Olive', 'Black', 'Khaki'],
    stock: 35,
    barcode: 'PNT003',
  },
  {
    id: 'pant-4',
    name: 'Jogger Pants',
    category: 'pants',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    stock: 45,
    barcode: 'PNT004',
  },
  // Jeans
  {
    id: 'jean-1',
    name: 'Classic Blue Jeans',
    category: 'jeans',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Dark Blue'],
    stock: 50,
    barcode: 'JNS001',
  },
  {
    id: 'jean-2',
    name: 'Skinny Fit Jeans',
    category: 'jeans',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400',
    sizes: ['28', '30', '32', '34'],
    colors: ['Black', 'Blue', 'Grey'],
    stock: 40,
    barcode: 'JNS002',
  },
  {
    id: 'jean-3',
    name: 'Ripped Denim Jeans',
    category: 'jeans',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
    sizes: ['30', '32', '34'],
    colors: ['Light Blue', 'Blue'],
    stock: 30,
    barcode: 'JNS003',
  },
  {
    id: 'jean-4',
    name: 'Straight Leg Jeans',
    category: 'jeans',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black'],
    stock: 45,
    barcode: 'JNS004',
  },
  // Bags
  {
    id: 'bag-1',
    name: 'Leather Tote Bag',
    category: 'bags',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan'],
    stock: 20,
    barcode: 'BAG001',
  },
  {
    id: 'bag-2',
    name: 'Canvas Backpack',
    category: 'bags',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    sizes: ['One Size'],
    colors: ['Grey', 'Navy', 'Black'],
    stock: 35,
    barcode: 'BAG002',
  },
  {
    id: 'bag-3',
    name: 'Crossbody Sling Bag',
    category: 'bags',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400',
    sizes: ['One Size'],
    colors: ['Black', 'Brown'],
    stock: 25,
    barcode: 'BAG003',
  },
  {
    id: 'bag-4',
    name: 'Weekender Duffle',
    category: 'bags',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Navy'],
    stock: 15,
    barcode: 'BAG004',
  },
  // Caps
  {
    id: 'cap-1',
    name: 'Classic Baseball Cap',
    category: 'caps',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'White', 'Red'],
    stock: 60,
    barcode: 'CAP001',
  },
  {
    id: 'cap-2',
    name: 'Snapback Cap',
    category: 'caps',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400',
    sizes: ['One Size'],
    colors: ['Black', 'Grey', 'Navy'],
    stock: 45,
    barcode: 'CAP002',
  },
  {
    id: 'cap-3',
    name: 'Bucket Hat',
    category: 'caps',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400',
    sizes: ['S/M', 'L/XL'],
    colors: ['Black', 'Beige', 'Navy'],
    stock: 40,
    barcode: 'CAP003',
  },
  {
    id: 'cap-4',
    name: 'Trucker Cap',
    category: 'caps',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'Grey'],
    stock: 50,
    barcode: 'CAP004',
  },
];

export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductByBarcode = (barcode: string): Product | undefined => {
  return products.find((p) => p.barcode === barcode);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.barcode.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};
