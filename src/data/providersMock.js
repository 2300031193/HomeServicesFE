const providers = [
  {
    id: 1,
    name: "Mike Johnson",
    specialty: "Plumbing Specialist",
    rating: 4.9,
    reviewCount: 156,
    experience: 12,
    completedBookings: 450,
    bio: "Certified plumber with 12 years of experience in residential and commercial plumbing. Specializes in complex repairs and installations.",
    avatar: "/placeholder-avatar.jpg", // In a real app, this would be a real image URL
    location: "Downtown Area",
    services: [
      { name: "Leak Repair", price: 399 },
      { name: "Water Heater Replacement", price: 899 },
      { name: "Drain Cleaning", price: 249 }
    ],
    reviews: [
      {
        author: "Sarah Chen",
        rating: 5,
        comment: "Mike fixed our leaky faucet quickly and explained everything clearly. Very professional!",
        date: "2025-10-01"
      },
      {
        author: "Robert Lee",
        rating: 5,
        comment: "Excellent work on our bathroom plumbing. Arrived on time and cleaned up thoroughly.",
        date: "2025-09-28"
      }
    ]
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    specialty: "Electrical Technician",
    rating: 4.8,
    reviewCount: 89,
    experience: 8,
    completedBookings: 320,
    bio: "Licensed electrician specializing in residential electrical services. Certified in smart home installations and energy-efficient solutions.",
    avatar: "/placeholder-avatar.jpg",
    location: "Midtown District",
    services: [
      { name: "Outlet Installation", price: 149 },
      { name: "Circuit Breaker Repair", price: 299 },
      { name: "Smart Home Setup", price: 599 }
    ],
    reviews: [
      {
        author: "David Kim",
        rating: 5,
        comment: "Emily installed our whole home smart system. Knowledgeable and patient with all our questions.",
        date: "2025-09-25"
      }
    ]
  },
  {
    id: 3,
    name: "Juan Carlos",
    specialty: "HVAC Technician",
    rating: 4.7,
    reviewCount: 134,
    experience: 15,
    completedBookings: 640,
    bio: "Master HVAC technician with 15 years of experience. Expert in repair, maintenance, and installation of all heating and cooling systems.",
    avatar: "/placeholder-avatar.jpg",
    location: "Residential East",
    services: [
      { name: "AC Tune-Up", price: 149 },
      { name: "Refrigerant Recharge", price: 299 },
      { name: "Furnace Repair", price: 399 }
    ],
    reviews: [
      {
        author: "Lisa Thompson",
        rating: 5,
        comment: "Juan got our AC working again on a very hot day. Thank you for the quick service!",
        date: "2025-09-22"
      }
    ]
  },
  {
    id: 4,
    name: "CleanPro Services",
    specialty: "Professional Cleaning",
    rating: 4.8,
    reviewCount: 203,
    experience: 5,
    completedBookings: 980,
    bio: "Professional cleaning service specializing in deep cleaning, sanitization, and post-construction cleanup. Eco-friendly products used.",
    avatar: "/placeholder-avatar.jpg",
    location: "Metro Area",
    services: [
      { name: "Deep House Cleaning", price: 799 },
      { name: "Move-In/Move-Out Cleaning", price: 999 },
      { name: "Post-Construction Cleanup", price: 1199 }
    ],
    reviews: [
      {
        author: "Maria Gonzalez",
        rating: 5,
        comment: "Amazing attention to detail! Our house has never been cleaner. Will definitely book again.",
        date: "2025-09-20"
      }
    ]
  }
];

export default providers;