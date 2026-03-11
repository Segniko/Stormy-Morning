const products = [
    // APPAREL (Fashion)
    {
        name: 'Minimalist Wool Overcoat',
        images: ['https://images.unsplash.com/photo-1744812103770-4f0e44576ced?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        description: 'A premium wool blend overcoat with a clean, structured silhouette. Perfect for layering in cold weather.',
        brand: 'Stormy Essentials',
        category: 'Apparel',
        type: 'Fashion',
        price: 299.99,
        stock: 15,
        fashionDetails: {
            sizes: ['S', 'M', 'L', 'XL'],
            materials: ['80% Wool', '20% Nylon'],
            washCare: 'Dry clean only'
        }
    },
    {
        name: 'Raw Denim Jacket',
        images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800'],
        description: 'Classic raw denim jacket that ages beautifully with time. Reinforced stitching and antique brass buttons.',
        brand: 'Indigo Soul',
        category: 'Apparel',
        type: 'Fashion',
        price: 145.00,
        stock: 25,
        fashionDetails: {
            sizes: ['M', 'L', 'XL'],
            materials: ['100% Cotton Raw Denim'],
            washCare: 'Machine wash cold, inside out'
        }
    },
    {
        name: 'Premium Silk Blouse',
        images: ['https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=800'],
        description: 'Elegant silk blouse with a soft sheen and relaxed fit. Ideal for both professional and evening wear.',
        brand: 'Aurora',
        category: 'Apparel',
        type: 'Fashion',
        price: 180.00,
        stock: 10,
        fashionDetails: {
            sizes: ['XS', 'S', 'M'],
            materials: ['100% Mulberry Silk'],
            washCare: 'Hand wash cold'
        }
    },

    // LAPTOPS (Gadget)
    {
        name: 'Titan Book Pro 16',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800'],
        description: 'The ultimate powerhouse for creators. 16-inch Liquid Retina display, M3 Max chip, and up to 128GB of unified memory.',
        brand: 'Titan',
        category: 'Laptops',
        type: 'Gadget',
        price: 2499.00,
        stock: 8,
        gadgetDetails: {
            specs: {
                'Processor': 'Titan M3 Max 16-core CPU',
                'RAM': '64GB Unified Memory',
                'Storage': '2TB SSD',
                'Display': '16.2-inch XDR (3456 x 2234)'
            },
            warranty: '2 Year Manufacturer Warranty',
            inBox: ['Titan Book Pro', '140W USB-C Power Adapter', 'MagSafe 3 Cable']
        }
    },
    {
        name: 'Zenith Air 13',
        images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800'],
        description: 'Thin, light, and powerful. The perfect companion for digital nomads and students.',
        brand: 'Zenith',
        category: 'Laptops',
        type: 'Gadget',
        price: 1199.00,
        stock: 20,
        gadgetDetails: {
            specs: {
                'Processor': 'Zenith Z2 8-core CPU',
                'RAM': '16GB RAM',
                'Storage': '512GB SSD',
                'Weight': '1.24 kg'
            },
            warranty: '1 Year Zenith Care',
            inBox: ['Zenith Air 13', '30W Power Adapter', 'USB-C Cable']
        }
    },

    // AUDIO (Gadget)
    {
        name: 'Acoustic Elite ANC Headphones',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800'],
        description: 'Industry-leading noise cancellation and immersive spatial audio. Experience music like never before.',
        brand: 'Acoustic',
        category: 'Audio',
        type: 'Gadget',
        price: 349.99,
        stock: 30,
        gadgetDetails: {
            specs: {
                'Drivers': '40mm Neodymium',
                'Battery Life': '40 Hours with ANC',
                'Connectivity': 'Bluetooth 5.3, LDAC',
                'App Support': 'Custom EQ'
            },
            warranty: '1 Year Global Warranty',
            inBox: ['Acoustic Elite', 'Carrying Case', 'USB-C Charging Cable', '3.5mm Jack']
        }
    },
    {
        name: 'Sonic Buds Pro 2',
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800'],
        description: 'Truly wireless earbuds with active noise cancellation and adaptive transparency mode.',
        brand: 'Sonic',
        category: 'Audio',
        type: 'Gadget',
        price: 199.00,
        stock: 50,
        gadgetDetails: {
            specs: {
                'Water Resistance': 'IPX4',
                'Battery': '6 hours (24 with case)',
                'Sensors': 'Skin-detect, Motion-detect'
            },
            warranty: '1 Year Limited',
            inBox: ['Sonic Buds Pro 2', 'MagSafe Charging Case', 'Silicone Ear Tips']
        }
    },

    // WEARABLES (Gadget)
    {
        name: 'Pulse Watch Series 9',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'],
        description: 'Track your health, stay connected, and push your limits with the most advanced health features ever.',
        brand: 'Pulse',
        category: 'Wearables',
        type: 'Gadget',
        price: 399.00,
        stock: 40,
        gadgetDetails: {
            specs: {
                'Display': 'Always-on Retina OLED',
                'Health Sensors': 'ECG, Heart Rate, SpO2',
                'GPS': 'Dual-Band High Precision'
            },
            warranty: '1 Year Manufacturer',
            inBox: ['Pulse Watch', 'Sport Band', 'Magnetic Fast Charger']
        }
    },
    {
        name: 'Orbit Aura Smart Ring',
        images: ['https://images.unsplash.com/photo-1746280978271-1ef1a2d9447f?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        description: 'Discreet and powerful sleep and recovery tracking in a stylish titanium ring.',
        brand: 'Orbit',
        category: 'Wearables',
        type: 'Gadget',
        price: 299.00,
        stock: 15,
        gadgetDetails: {
            specs: {
                'Material': 'Aerospace Grade Titanium',
                'Sensors': 'Body Temp, Pulse Ox, PPG',
                'Battery': 'Up to 7 days'
            },
            warranty: '1 Year',
            inBox: ['Orbit Ring', 'USB-C Charging Base']
        }
    },

    // BAGS (Fashion)
    {
        name: 'Nomad Leather Weekender',
        images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800'],
        description: 'Handcrafted full-grain leather bag designed for the modern traveler. Spacious and timeless.',
        brand: 'Nomad Goods',
        category: 'Bags',
        type: 'Fashion',
        price: 450.00,
        stock: 12,
        fashionDetails: {
            sizes: ['Large (45L)'],
            materials: ['Full-Grain Italian Leather', 'Brass Hardware'],
            washCare: 'Leather conditioner recommended'
        }
    },
    {
        name: 'Commuter Tech Backpack',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800'],
        description: 'Water-resistant backpack with specialized compartments for your laptop, tablet, and accessories.',
        brand: 'Urban Core',
        category: 'Bags',
        type: 'Fashion',
        price: 120.00,
        stock: 35,
        fashionDetails: {
            sizes: ['Standard (20L)'],
            materials: ['Recycled Polyester', 'Water-repellent coating'],
            washCare: 'Wipe with damp cloth'
        }
    },

    // PHOTOGRAPHY (Gadget)
    {
        name: 'Lumix Alpha Z1',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800'],
        description: 'Full-frame mirrorless camera with 42.4 Megapixels and 4K video recording. Perfect for professionals.',
        brand: 'Lumix',
        category: 'Photography',
        type: 'Gadget',
        price: 1899.00,
        stock: 5,
        gadgetDetails: {
            specs: {
                'Resolution': '42.4 MP Full Frame',
                'Video': '4K @ 60fps',
                'ISO Range': '50 - 102,400'
            },
            warranty: '2 Year Professional Care',
            inBox: ['Lumix Z1 Body', 'Rechargeable Battery', 'Charger', 'Neck Strap']
        }
    },
    {
        name: 'Prime Focus 35mm f/1.4',
        images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800'],
        description: 'Ultra-fast prime lens with stunning bokeh and edge-to-edge sharpness. The grail for street photography.',
        brand: 'Prime',
        category: 'Photography',
        type: 'Gadget',
        price: 899.00,
        stock: 10,
        gadgetDetails: {
            specs: {
                'Focal Length': '35mm',
                'Aperture': 'f/1.4 - f/16',
                'Mount': 'Universal E-Mount'
            },
            warranty: '1 Year Replacement',
            inBox: ['Prime Lens', 'Lens Caps', 'Lens Hood']
        }
    }
];

export default products;
