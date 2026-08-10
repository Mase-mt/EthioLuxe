export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'attire' | 'spices' | 'craft' | 'art';
  categoryLabel: string;
  priceETB: number;
  priceUSD: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  origin: string;
  tag?: 'Bestseller' | 'Organic' | 'Artisanal' | 'Single-Origin' | 'Handwoven';
  description: string;
  details: {
    [key: string]: string;
  };
  inStock: boolean;
  featured?: boolean;
  rank?: number;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Collection', icon: 'Sparkles' },
  { id: 'coffee', label: 'Coffee & Jebena', icon: 'Coffee' },
  { id: 'attire', label: 'Habesha Attire', icon: 'Shirt' },
  { id: 'spices', label: 'Berbere & Gourmet Spices', icon: 'Flame' },
  { id: 'craft', label: 'Leather & Crafts', icon: 'ShoppingBag' },
  { id: 'art', label: 'Culture & Fine Art', icon: 'Palette' },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'eth-coffee-01',
    name: 'Yirgacheffe Single-Origin Organic Beans',
    category: 'coffee',
    categoryLabel: 'Coffee & Jebena',
    priceETB: 1850,
    priceUSD: 14.80,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Gedeo Zone, Yirgacheffe (Alt: 2,000m)',
    tag: 'Single-Origin',
    featured: true,
    rank: 1,
    description: 'Renowned world-over for bright floral notes of Jasmine, bergamot, and sweet citrus finish. Wet-processed heirloom Arabica grown in shade soils.',
    details: {
      RoastLevel: 'Medium Roast',
      Process: 'Washed Heirloom Arabica',
      Notes: 'Jasmine, Meyer Lemon, Wild Honey',
      BagSize: '500g Whole Bean'
    },
    inStock: true
  },
  {
    id: 'eth-attire-01',
    name: 'Royal Handwoven Habesha Kemis (Gold Tibeb)',
    category: 'attire',
    categoryLabel: 'Habesha Attire',
    priceETB: 18500,
    priceUSD: 148.00,
    rating: 5.0,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Handwoven in Shiromeda, Addis Ababa',
    tag: 'Handwoven',
    featured: true,
    rank: 2,
    description: 'Masterfully handwoven traditional dress crafted from 100% fine Shemma cotton, accented with elaborate metallic gold thread Tibeb borders and matching Netela shawl.',
    details: {
      Material: '100% Handwoven Organic Cotton (Shemma)',
      Embroidery: 'Traditional Gold Foil & Crimson Thread',
      Includes: 'Full Dress + Matching 2-Layer Netela Shawl',
      Care: 'Dry Clean Only'
    },
    inStock: true
  },
  {
    id: 'eth-spice-01',
    name: 'Authentic Gourmet Berbere Spice Blend',
    category: 'spices',
    categoryLabel: 'Berbere & Gourmet Spices',
    priceETB: 950,
    priceUSD: 7.60,
    rating: 4.95,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Sun-dried in Mareko & Debre Zeit',
    tag: 'Bestseller',
    featured: true,
    rank: 3,
    description: 'The soul of Ethiopian cuisine. A vibrant blend of sun-dried red chili peppers, korerima (black cardamom), garlic, ginger, rue, and fenugreek slow-ground to perfection.',
    details: {
      Weight: '450g Airtight Jar',
      Ingredients: 'Chili, Korerima, Ginger, Besobela, Fenugreek',
      HeatLevel: 'Medium-Hot (Complex & Aromatic)',
      ShelfLife: '18 Months'
    },
    inStock: true
  },
  {
    id: 'eth-coffee-02',
    name: 'Artisanal Clay Jebena & 6 Cini Coffee Set',
    category: 'coffee',
    categoryLabel: 'Coffee & Jebena',
    priceETB: 4200,
    priceUSD: 33.60,
    rating: 4.88,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Hand-sculpted Pottery from Jimma',
    tag: 'Artisanal',
    featured: true,
    rank: 4,
    description: 'Traditional black clay Jebena pot with curved spout and woven horsehair neck collar, accompanied by six gold-rimmed ceramic Cini cups for authentic Bunna ceremonies.',
    details: {
      Capacity: '1.2 Liters (Pours ~8 cups)',
      Material: 'Natural Terracotta Clay & Fired Black Finish',
      SetIncludes: '1 Jebena + Ring Stand + 6 Cini Cups + Frankincense Burner'
    },
    inStock: true
  },
  {
    id: 'eth-craft-01',
    name: 'Full-Grain Artisan Leather Messenger Bag',
    category: 'craft',
    categoryLabel: 'Leather & Crafts',
    priceETB: 9800,
    priceUSD: 78.40,
    rating: 4.9,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Crafted in Mojo Tannery, Ethiopia',
    tag: 'Artisanal',
    featured: false,
    description: 'Handcrafted from 100% Ethiopian full-grain cowhide leather, renowned for softness and durability. Features brass hardware and padded 15-inch laptop compartment.',
    details: {
      Leather: 'Full-Grain Vegetable Tanned Leather',
      Dimensions: '40cm x 30cm x 10cm',
      Features: 'Laptop Sleeve, YKK Zippers, Adjustable Strap'
    },
    inStock: true
  },
  {
    id: 'eth-art-01',
    name: 'Antique Silver Lalibela Coptic Cross Pendant',
    category: 'art',
    categoryLabel: 'Culture & Fine Art',
    priceETB: 6500,
    priceUSD: 52.00,
    rating: 4.97,
    reviewCount: 115,
    image: 'https://images.unsplash.com/photo-1611591475143-4f8a07158784?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611591475143-4f8a07158784?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Lost-Wax Cast Silver from Lalibela',
    tag: 'Artisanal',
    featured: false,
    description: 'Exquisite hand-carved silver cross featuring intricate lattice filigree work patterned after the famous rock-hewn churches of King Lalibela.',
    details: {
      Metal: '925 Pure Ethiopian Sterling Silver',
      Craftsmanship: 'Traditional Lost-Wax Casting',
      ChainLength: '60cm Hand-braided Black Leather Cord'
    },
    inStock: true
  },
  {
    id: 'eth-spice-02',
    name: 'Organic Teff Grain Superfood (Ivory & Red Mix)',
    category: 'spices',
    categoryLabel: 'Berbere & Gourmet Spices',
    priceETB: 1200,
    priceUSD: 9.60,
    rating: 4.85,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Harvested in Debre Markos, Gojjam',
    tag: 'Organic',
    featured: false,
    description: 'Ancient Ethiopian gluten-free grain rich in iron, calcium, and protein. Perfect for making authentic fermented Injera bread or nutritious breakfast porridge.',
    details: {
      Weight: '2kg Sealed Linen Bag',
      Type: 'Blend of Ivory (Nech) & Red (Key) Teff',
      GlutenFree: '100% Certified Gluten-Free & Non-GMO'
    },
    inStock: true
  },
  {
    id: 'eth-craft-02',
    name: 'Handwoven Colourful Mesob (Traditional Food Basket)',
    category: 'craft',
    categoryLabel: 'Leather & Crafts',
    priceETB: 7400,
    priceUSD: 59.20,
    rating: 4.92,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Woven in Harar & Aksum',
    tag: 'Handwoven',
    featured: false,
    description: 'Vibrant woven straw dining basket dyed with natural organic vegetable pigments. Serves as both a dining table cover for communal meals and striking wall art.',
    details: {
      Material: 'Natural Dried Palm Straw & Wild Grasses',
      Height: '65cm with conical lid',
      Dyes: 'Natural Indigo, Turmeric, and Madder Root'
    },
    inStock: true
  },
  {
    id: 'eth-attire-02',
    name: 'Men\'s Heritage Linen Tibeb Shirt',
    category: 'attire',
    categoryLabel: 'Habesha Attire',
    priceETB: 7200,
    priceUSD: 57.60,
    rating: 4.87,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Hand-tailored in Gondar',
    tag: 'Handwoven',
    featured: false,
    description: 'Breathable 100% natural linen tunic shirt styled with mandarin collar and subtle hand-embroidered geometric Tibeb piping along the collar and placket.',
    details: {
      Fabric: 'Pure Pure Ethiopian Linen',
      Fit: 'Relaxed Modern Heritage Fit',
      Colors: 'Natural Off-White with Black & Gold Tibeb'
    },
    inStock: true
  },
  {
    id: 'eth-art-02',
    name: 'Traditional Handcrafted 6-String Krar (Lyre)',
    category: 'art',
    categoryLabel: 'Culture & Fine Art',
    priceETB: 12500,
    priceUSD: 100.00,
    rating: 4.96,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
    ],
    origin: 'Crafted by Azmari Artisans in Wollo',
    tag: 'Artisanal',
    featured: false,
    description: 'Authentic bowl lyre constructed from carved olive wood, stretched goat hide resonator, and 6 nylon/steel strings tuned to traditional pentatonic Tizita & Bati scales.',
    details: {
      Tuning: 'Pentatonic (Tizita, Bati, Ambassel, Anchihoye)',
      Wood: 'Wild Olive Wood Frame',
      Hide: 'Natural Fired Goat Leather Resonator'
    },
    inStock: true
  }
];
