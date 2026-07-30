export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Attractions", href: "#attractions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Tickets", href: "#tickets" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "Adventure Attractions" },
  { value: 10000, suffix: "+", label: "Happy Families" },
  { value: 5, suffix: "★", label: "Experience" },
  { value: 365, suffix: "", label: "Open Everyday" },
] as const;

export const ATTRACTIONS = [
  {
    id: "giant-wheel",
    title: "Giant Wheel",
    description: "Soar above Kurnool with panoramic views from our iconic Ferris wheel.",
    icon: "FerrisWheel",
  },
  {
    id: "panda-train",
    title: "Panda Train",
    description: "A delightful ride through scenic park pathways for all ages.",
    icon: "Train",
  },
  {
    id: "kids-play",
    title: "Kids Play Area",
    description: "Safe, supervised play zones designed for endless imagination.",
    icon: "Baby",
  },
  {
    id: "mini-gym",
    title: "Outdoor Mini Gym",
    description: "Stay fit outdoors with modern equipment surrounded by nature.",
    icon: "Dumbbell",
  },
  {
    id: "yoga-zone",
    title: "Yoga Zone",
    description: "Find peace and balance in our serene outdoor yoga sanctuary.",
    icon: "Heart",
  },
  {
    id: "family-seating",
    title: "Family Seating",
    description: "Comfortable rest areas for families to relax and reconnect.",
    icon: "Users",
  },
  {
    id: "adventure-games",
    title: "Adventure Games",
    description: "Thrilling games and challenges for the whole family.",
    icon: "Gamepad2",
  },
  {
    id: "photography",
    title: "Photography Spots",
    description: "Instagram-worthy locations capturing unforgettable moments.",
    icon: "Camera",
  },
  {
    id: "garden-walk",
    title: "Garden Walk",
    description: "Stroll through lush greenery and beautifully landscaped paths.",
    icon: "TreePine",
  },
  {
    id: "snack-area",
    title: "Snack Area",
    description: "Delicious treats and refreshments for every craving.",
    icon: "UtensilsCrossed",
  },
  {
    id: "weekend-events",
    title: "Weekend Events",
    description: "Special performances, shows, and celebrations every weekend.",
    icon: "Calendar",
  },
] as const;

export const EXPERIENCES = [
  {
    id: "sunset-rides",
    title: "Sunset Rides",
    subtitle: "Golden Hour Magic",
    description:
      "Experience the park as the sun sets over Kurnool. Our Giant Wheel transforms into a beacon of light, offering breathtaking views and unforgettable family moments.",
    image: "/images/park-scene.svg",
    reverse: false,
  },
  {
    id: "family-bonding",
    title: "Family Bonding",
    subtitle: "Create Lasting Memories",
    description:
      "From the Panda Train to adventure games, every corner of our park is designed to bring families closer together. Watch your children laugh, play, and discover.",
    image: "/images/park-scene.svg",
    reverse: true,
  },
  {
    id: "weekend-festivals",
    title: "Weekend Festivals",
    subtitle: "Live Entertainment",
    description:
      "Every weekend brings new excitement — live performances, themed events, and special activities that turn ordinary visits into extraordinary adventures.",
    image: "/images/park-scene.svg",
    reverse: false,
  },
] as const;

export const MAP_LOCATIONS = [
  { id: "giant-wheel", name: "Giant Wheel", x: 72, y: 18, description: "Panoramic views from 40 feet high" },
  { id: "panda-train", name: "Panda Train", x: 28, y: 35, description: "Scenic train ride through the park" },
  { id: "kids-play", name: "Kids Play Area", x: 55, y: 45, description: "Safe supervised play zones" },
  { id: "mini-gym", name: "Outdoor Mini Gym", x: 15, y: 62, description: "Outdoor fitness equipment" },
  { id: "yoga-zone", name: "Yoga Zone", x: 82, y: 55, description: "Peaceful meditation space" },
  { id: "snack-area", name: "Snack Area", x: 45, y: 72, description: "Food and refreshments" },
  { id: "garden-walk", name: "Garden Walk", x: 65, y: 78, description: "Landscaped garden paths" },
  { id: "photography", name: "Photo Spots", x: 38, y: 22, description: "Picture-perfect locations" },
] as const;

export const TIMELINE_STEPS = [
  { id: "arrival", title: "Arrival", description: "Welcome to paradise", icon: "MapPin" },
  { id: "explore", title: "Explore", description: "Discover the park", icon: "Compass" },
  { id: "ride", title: "Ride", description: "Thrilling adventures", icon: "Zap" },
  { id: "relax", title: "Relax", description: "Family rest areas", icon: "Coffee" },
  { id: "food", title: "Food", description: "Delicious treats", icon: "UtensilsCrossed" },
  { id: "photos", title: "Photos", description: "Capture memories", icon: "Camera" },
  { id: "memories", title: "Memories", description: "Take them home", icon: "Heart" },
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/park-scene.svg", alt: "Ferris wheel at sunset", span: "col-span-2 row-span-2" },
  { src: "/images/park-scene.svg", alt: "Family fun", span: "col-span-1 row-span-1" },
  { src: "/images/park-scene.svg", alt: "Park celebration", span: "col-span-1 row-span-1" },
  { src: "/images/park-scene.svg", alt: "Children playing", span: "col-span-1 row-span-2" },
  { src: "/images/park-scene.svg", alt: "Amusement rides", span: "col-span-1 row-span-1" },
  { src: "/images/park-scene.svg", alt: "Park lights", span: "col-span-2 row-span-1" },
  { src: "/images/park-scene.svg", alt: "Outdoor activities", span: "col-span-1 row-span-1" },
  { src: "/images/park-scene.svg", alt: "Nature walk", span: "col-span-1 row-span-1" },
] as const;

export const GYM_ACTIVITIES = [
  { title: "Workout", description: "Full-body outdoor training stations", icon: "Dumbbell" },
  { title: "Cycling", description: "Scenic cycling paths around the park", icon: "Bike" },
  { title: "Stretching", description: "Dedicated stretching and warm-up zones", icon: "Activity" },
  { title: "Walking", description: "Paved walking trails through greenery", icon: "Footprints" },
  { title: "Monkey Bars", description: "Challenge courses for all skill levels", icon: "Grip" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Priya & Rajesh",
    location: "Kurnool",
    rating: 5,
    text: "We've visited parks across Andhra Pradesh, but nothing compares to this experience. The attention to detail, safety standards, and premium ambiance make every visit special.",
  },
  {
    name: "Anitha Reddy",
    location: "Nandyal",
    rating: 5,
    text: "My children absolutely love the Giant Wheel and Panda Train. The park feels safe, clean, and beautifully designed. It's become our family's favorite weekend destination.",
  },
  {
    name: "Vikram & Family",
    location: "Kurnool",
    rating: 5,
    text: "The yoga zone and outdoor gym are incredible additions. We can stay active while the kids play. This park truly offers something for every member of the family.",
  },
  {
    name: "Sneha Kumar",
    location: "Anantapur",
    rating: 5,
    text: "Weekend events here are phenomenal! Live performances, great food, and the most photogenic spots. We've captured so many beautiful family memories here.",
  },
] as const;

export const PRICING = [
  {
    id: "adult",
    title: "Adults",
    price: "₹150",
    period: "per person",
    features: ["All attractions access", "Garden walk", "Weekend events", "Free parking"],
    popular: false,
  },
  {
    id: "family",
    title: "Family Package",
    price: "₹499",
    period: "2 adults + 2 children",
    features: ["All attractions access", "Priority ride access", "Snack voucher ₹100", "Photo spot guide", "Weekend events"],
    popular: true,
  },
  {
    id: "child",
    title: "Children",
    price: "₹99",
    period: "per child (under 12)",
    features: ["All kid attractions", "Play area access", "Panda Train ride", "Weekend events"],
    popular: false,
  },
] as const;

export const FOOTER_LINKS = {
  quick: [
    { label: "About", href: "#about" },
    { label: "Attractions", href: "#attractions" },
    { label: "Gallery", href: "#gallery" },
    { label: "Tickets", href: "#tickets" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;
