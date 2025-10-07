const services = [
  {
    id: 1,
    title: "Professional Plumbing",
    short: "Expert leak repair & installations",
    long: "Certified plumbers for leaks, pipe replacement, and installations. We handle all types of plumbing emergencies and scheduled maintenance with professional tools and licensed technicians.",
    price: 499,
    icon: "🔧",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1621905251189-0052d07ae05c?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
    includes: [
      "Leak detection and repair",
      "Pipe installation and replacement",
      "Water heater maintenance",
      "Fixture installation",
      "Emergency service available"
    ]
  },
  {
    id: 2,
    title: "Electrical Services",
    short: "Wiring, repairs & safety checks",
    long: "Licensed electricians for home wiring, appliance fixing, and safety checks. From simple switch repairs to complete electrical panel upgrades, our certified team ensures all work meets current building codes.",
    price: 599,
    icon: "⚡",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab0b?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-yellow-400 to-orange-500",
    featured: true,
    includes: [
      "Circuit breaker repair",
      "Electrical panel upgrades",
      "Outlet and switch installation",
      "Lighting fixture installation",
      "Electrical safety inspection"
    ]
  },
  {
    id: 3,
    title: "Home Deep Cleaning",
    short: "Spotless home sanitization",
    long: "Professional cleaning team for full home deep clean, sanitization. We use eco-friendly cleaning products and thorough techniques to make your home sparkle from top to bottom.",
    price: 999,
    icon: "🧹",
    category: "Cleaning",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-green-400 to-emerald-500",
    featured: true,
    includes: [
      "Dust and vacuum all areas",
      "Clean and sanitize bathrooms",
      "Clean and polish floors",
      "Wash windows and mirrors",
      "Eco-friendly products used"
    ]
  },
  {
    id: 4,
    title: "AC & HVAC Service",
    short: "Cooling system maintenance",
    long: "Experienced HVAC technicians for AC servicing and repairs. Regular maintenance extends equipment life, improves efficiency, and ensures optimal cooling performance.",
    price: 1299,
    icon: "❄️",
    category: "HVAC",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-cyan-400 to-blue-500",
    featured: true,
    includes: [
      "Complete AC system cleaning",
      "Refrigerant level check",
      "Filter replacement",
      "Thermostat calibration",
      "Performance efficiency test"
    ]
  },
  {
    id: 5,
    title: "Professional Painting",
    short: "Interior & exterior excellence",
    long: "Professional painting services for interior walls, exterior siding, trim, and more. We use premium paints and techniques to create beautiful, durable finishes that last.",
    price: 1499,
    icon: "🎨",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-rose-400 to-pink-500",
    featured: true,
    includes: [
      "Interior wall painting",
      "Ceiling painting",
      "Door and trim painting",
      "Paint color consultation",
      "Premium quality materials"
    ]
  },
  {
    id: 6,
    title: "Carpentry & Woodwork",
    short: "Custom woodworking solutions",
    long: "Skilled carpenter services for custom furniture, cabinet installation, door repair, and general woodworking. From deck construction to fine cabinetry, we handle all woodworking needs.",
    price: 799,
    icon: "🔨",
    category: "Carpentry",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-amber-600 to-yellow-600",
    featured: true,
    includes: [
      "Custom woodwork",
      "Cabinet installation",
      "Door and window repair",
      "Deck and fence construction",
      "Furniture restoration"
    ]
  },
  {
    id: 7,
    title: "Smart Home Installation",
    short: "IOT devices & automation",
    long: "Complete smart home device installation and setup. From smart locks and security cameras to voice assistants and automated lighting, transform your home into a connected living space.",
    price: 699,
    icon: "🤖",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1558618047-2796e2fc7ddd?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-purple-500 to-violet-600",
    featured: false,
    includes: [
      "Smart security systems",
      "Voice assistant setup",
      "Automated lighting",
      "Smart thermostat installation",
      "Mobile app configuration"
    ]
  },
  {
    id: 8,
    title: "Bathroom Renovation",
    short: "Complete bathroom makeovers",
    long: "Full bathroom renovations including plumbing updates, tile work, fixtures, and modern design. Transform your bathroom into a spa-like retreat with professional craftsmanship.",
    price: 3499,
    icon: "🚿",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1584622781564-1d987fa4e8e4?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-teal-400 to-cyan-500",
    featured: false,
    includes: [
      "Custom tile installation",
      "New plumbing fixtures",
      "Vanity and mirror setup",
      "Shower/tub replacement",
      "Modern design consultation"
    ]
  },
  {
    id: 9,
    title: "Flooring Solutions",
    short: "Hardwood, tile & laminate",
    long: "Professional flooring installation and repair services. From hardwood floors to luxury vinyl tile and everything in between, we provide expert installation for beautiful, durable floors.",
    price: 1899,
    icon: "🏠",
    category: "Flooring",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-gray-600 to-slate-700",
    featured: false,
    includes: [
      "Hardwood installation",
      "Tile and stone flooring",
      "Carpet installation",
      "Floor refinishing",
      "Subfloor preparation"
    ]
  },
  {
    id: 10,
    title: "Pest Control Solutions",
    short: "Safe & effective pest management",
    long: "Professional pest control services using eco-friendly methods. From ants and termites to rodents and insects, we provide comprehensive pest management solutions for your home.",
    price: 349,
    icon: "🐛",
    category: "Pest Control",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-red-500 to-rose-600",
    featured: false,
    includes: [
      "Comprehensive inspection",
      "Eco-friendly treatments",
      "Preventive maintenance",
      "Guaranteed results",
      "Follow-up service"
    ]
  },
  {
    id: 11,
    title: "Kitchen Appliances Repair",
    short: "Fix all kitchen electronics",
    long: "Expert appliance repair service for refrigerators, ovens, dishwashers, microwaves, and all kitchen electronics. Same-day service and genuine parts replacement available.",
    price: 399,
    icon: "⚙️",
    category: "Appliance Repair",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-indigo-500 to-purple-600",
    featured: false,
    includes: [
      "Refrigerator repair",
      "Oven and stove repair",
      "Dishwasher maintenance",
      "Microwave and coffee maker",
      "Same-day service"
    ]
  },
  {
    id: 12,
    title: "Garden & Landscaping",
    short: "Beautiful outdoor spaces",
    long: "Complete landscaping and garden maintenance services. From lawn care and tree trimming to patio construction and garden design, create the outdoor space you've always wanted.",
    price: 599,
    icon: "🌳",
    category: "Garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-green-500 to-emerald-600",
    featured: false,
    includes: [
      "Lawn mowing and maintenance",
      "Tree trimming and removal",
      "Garden design consulting",
      "Flower bed creation",
      "Seasonal landscaping"
    ]
  },
  {
    id: 13,
    title: "Roofing & Gutter Service",
    short: "Roof repair & maintenance",
    long: "Professional roofing services including repairs, maintenance, and inspections. Keep your home protected with expert roof care, gutter cleaning, and preventive maintenance.",
    price: 899,
    icon: "🏠",
    category: "Roofing",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-gray-700 to-gray-900",
    featured: false,
    includes: [
      "Roof inspection and repair",
      "Gutter cleaning and repair",
      "Leak detection and fix",
      "Preventive maintenance",
      "Emergency repairs"
    ]
  },
  {
    id: 14,
    title: "Window Installation & Repair",
    short: "Energy-efficient windows",
    long: "Complete window services including installation, repair, and replacement. Upgrade to energy-efficient windows that save money and improve comfort throughout the year.",
    price: 599,
    icon: "🪟",
    category: "Windows",
    image: "https://images.unsplash.com/photo-1564768282543-a49d6cc7b7ff?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-slate-400 to-slate-600",
    featured: false,
    includes: [
      "Window installation",
      "Energy-efficient upgrades",
      "Screen repair/replacement",
      "Weatherstripping",
      "Hardware repair"
    ]
  },
  {
    id: 15,
    title: "Security System Installation",
    short: "Home safety & protection",
    long: "Complete home security system installation including cameras, alarms, smart locks, and monitoring setup. Protect your home with professional-grade security solutions.",
    price: 1299,
    icon: "🛡️",
    category: "Security",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-red-600 to-red-800",
    featured: false,
    includes: [
      "Security camera installation",
      "Alarm system setup",
      "Smart lock installation",
      "Motion sensor setup",
      "Remote monitoring"
    ]
  },
  {
    id: 16,
    title: "Pool & Spa Maintenance",
    short: "Crystal clear water solutions",
    long: "Complete pool and spa maintenance services including cleaning, chemical balancing, equipment repair, and seasonal preparations. Keep your pool pristine year-round.",
    price: 449,
    icon: "🏊",
    category: "Pool Service",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-blue-600 to-blue-800",
    featured: false,
    includes: [
      "Pool cleaning and maintenance",
      "Chemical balancing",
      "Equipment repair",
      "Filter replacement",
      "Seasonal preparations"
    ]
  },
  {
    id: 17,
    title: "Chimney & Fireplace Service",
    short: "Safe and efficient hearth care",
    long: "Professional chimney and fireplace services including cleaning, inspection, repair, and maintenance. Ensure safe operation and efficient heating with expert chimney care.",
    price: 299,
    icon: "🏠",
    category: "Chimney",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-orange-700 to-orange-900",
    featured: false,
    includes: [
      "Chimney inspection",
      "Cleaning and maintenance",
      "Creosote removal",
      "Damper repair",
      "Fire safety inspection"
    ]
  },
  {
    id: 18,
    title: "Handyman Services",
    short: "All minor repairs & fixes",
    long: "Versatile handyman services for all your home repair needs. From hanging shelves to fixing loose door knobs, we handle all minor home improvements and repairs.",
    price: 199,
    icon: "🔧",
    category: "Handyman",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=250&fit=crop&crop=center&auto=format&q=80",
    gradient: "from-gray-500 to-gray-700",
    featured: false,
    includes: [
      "General home repairs",
      "Hanging installations",
      "Door and hardware fixes",
      "Minor plumbing repairs",
      "Small appliance fixes"
    ]
  }
];

export default services;