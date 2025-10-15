
const services = [
  {
    id: 1,
    title: "Professional Plumbing",
    short: "Expert leak repair & installations",
    long: "Certified plumbers for leaks, pipe replacement, and installations. We handle all types of plumbing emergencies and scheduled maintenance with professional tools and licensed technicians.",
    price: 499,
    icon: "🔧",
    category: "Plumbing",
    image: "https://img.freepik.com/free-photo/plumber-at-work-in-a-bathroom-plumbing-repair-service-assemble-and-install-concept_183219-2323.jpg?w=996&t=st=1715268595~exp=1715269195~hmac=11a16c4e766b92de358a21db55467a94378af662c69128a4b75a505e3f87c11c",
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
    image: "https://img.freepik.com/free-photo/electrician-fixing-wires_23-2148747546.jpg?w=996&t=st=1715268635~exp=1715269235~hmac=5a2b533f0d29a03c3b2b159f7f8e7b8c8e7e8c8c8e7e8c8c8e7e8c8c8e7e8c8c",
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
    image: "https://img.freepik.com/free-photo/man-cleaning-his-home_23-2148820744.jpg?w=996&t=st=1715268670~exp=1715269270~hmac=0f2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b",
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
    image: "https://img.freepik.com/free-photo/technician-service-using-measuring-equipment-checking-air-conditioner_33799-2839.jpg?w=996&t=st=1715268701~exp=1715269301~hmac=b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2",
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
    image: "https://img.freepik.com/free-photo/man-painting-wall-with-roller_23-2148820754.jpg?w=996&t=st=1715268731~exp=1715269331~hmac=c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2",
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
    image: "https://img.freepik.com/free-photo/carpenter-working-with-wood_23-2148820765.jpg?w=996&t=st=1715268761~exp=1715269361~hmac=d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2",
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
    image: "https://img.freepik.com/free-photo/smart-home-concept-with-devices_23-2148820777.jpg?w=996&t=st=1715268791~exp=1715269391~hmac=e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2",
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
    image: "https://img.freepik.com/free-photo/modern-bathroom-with-shower_23-2148820788.jpg?w=996&t=st=1715268821~exp=1715269421~hmac=f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2f2",
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
    image: "https://img.freepik.com/free-photo/man-installing-laminate-flooring_23-2148820799.jpg?w=996&t=st=1715268851~exp=1715269451~hmac=0202020202020202020202020202020202020202020202020202020202020202",
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
    image: "https://img.freepik.com/free-photo/pest-control-specialist-spraying-pesticides_23-2148820810.jpg?w=996&t=st=1715268881~exp=1715269481~hmac=1212121212121212121212121212121212121212121212121212121212121212",
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
    image: "https://img.freepik.com/free-photo/technician-repairing-kitchen-appliances_23-2148820821.jpg?w=996&t=st=1715268911~exp=1715269511~hmac=2222222222222222222222222222222222222222222222222222222222222222",
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
    image: "https://img.freepik.com/free-photo/gardener-working-in-the-garden_23-2148820832.jpg?w=996&t=st=1715268941~exp=1715269541~hmac=3232323232323232323232323232323232323232323232323232323232323232",
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
    image: "https://img.freepik.com/free-photo/roofer-working-on-roof_23-2148820843.jpg?w=996&t=st=1715268971~exp=1715269571~hmac=4242424242424242424242424242424242424242424242424242424242424242",
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
    image: "https://img.freepik.com/free-photo/man-installing-window_23-2148820854.jpg?w=996&t=st=1715269001~exp=1715269601~hmac=5252525252525252525252525252525252525252525252525252525252525252",
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
    image: "https://img.freepik.com/free-photo/security-camera-on-wall_23-2148820865.jpg?w=996&t=st=1715269031~exp=1715269631~hmac=6262626262626262626262626262626262626262626262626262626262626262",
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
    image: "https://img.freepik.com/free-photo/man-cleaning-pool_23-2148820876.jpg?w=996&t=st=1715269061~exp=1715269661~hmac=7272727272727272727272727272727272727272727272727272727272727272",
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
    image: "https://img.freepik.com/free-photo/man-cleaning-chimney_23-2148820887.jpg?w=996&t=st=1715269091~exp=1715269691~hmac=8282828282828282828282828282828282828282828282828282828282828282",
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
    image: "https://img.freepik.com/free-photo/man-doing-handyman-work_23-2148820898.jpg?w=996&t=st=1715269121~exp=1715269721~hmac=9292929292929292929292929292929292929292929292929292929292929292",
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
