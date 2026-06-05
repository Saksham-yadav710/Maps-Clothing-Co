import {
  TruckIcon,
  AwardIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import delivery_truck from "./delivery_truck.svg";

import heroImage from "./hero-image.jpg";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";

export const assets = {
  delivery_truck,
};

export const heroSlides = [img1, img2, img3, img4, img5, img6, img7, img8];

export const categoriesData = [
  {
    slug: "shirts",
    name: "Shirts",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=200&q=80",
  },
  {
    slug: "jeans",
    name: "Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80",
  },
  {
    slug: "trousers",
    name: "Trousers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80",
  },
];

export const heroSectionData = {
  hero_image: heroImage,
  description:
    "Welcome to MAPS : where quality meets affordability, style meets value, and every customer can truly Wear Confidence, Spend Smart.",
  hero_features: [
    { icon: TruckIcon, title: "Free Delivery", desc: "Orders over $50" },
    { icon: AwardIcon, title: "Premium Denim", desc: "Certified quality" },
    { icon: RotateCcwIcon, title: "Easy Returns", desc: "30-day policy" },
    { icon: ShieldCheckIcon, title: "Secure Pay", desc: "Safe checkout" },
  ],
};

export const deliveryPartnerLoginImage =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200";

export const appPromoBannerData = {
  title: "Wear Confidence, Spend Smart.",
  description:
    "Download the MAPS app to explore our diverse collection of high-quality men's fashion at prices that make sense. Enjoy seamless shopping and exclusive deals right in your pocket.",
};

export const footerData = {
  brand: {
    name: "MAPS",
    description:
      "At MAPS, we believe that great style shouldn't come with a premium price tag. Our mission is simple to bring high-quality men's fashion to every wardrobe.",
    socials: [
      { icon: FaFacebookF, link: "#" },
      { icon: FaXTwitter, link: "#" },
      { icon: FaInstagram, link: "#" },
    ],
  },

  sections: [
    {
      title: "Quick Links",
      links: [
        { label: "All Products", to: "/products" },
        { label: "New Arrivals", to: "/deals" },
        { label: "Track Order", to: "/orders" },
        { label: "Delivery Partner", to: "/delivery" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "My Account", to: "#" },
        { label: "Order History", to: "#" },
        { label: "Addresses", to: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
  ],

  contact: [
    { icon: MapPinIcon, text: "12 Thread Lane, New Delhi" },
    { icon: PhoneIcon, text: "+91 98765 43210" },
    { icon: MailIcon, text: "hello@maps.com" },
  ],

  bottom: {
    copyright: "© 2026 MAPS. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

export const statusColors: Record<string, string> = {
  Placed: "bg-blue-100 text-blue-700",
  Confirmed: "bg-indigo-100 text-indigo-700",
  Packed: "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-app-orange/10 text-app-orange",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export const iconsForLeafpad = {
  truck: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
  destination: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
};

export const dummyProducts = [];

export const dummyAdminDashboardData = {
  totalOrders: 1,
  totalUsers: 3,
  totalProducts: 50,
  outOfStock: 0,
  totalPartners: 2,
  recentOrders: [
    {
      shippingAddress: {
        label: "Home",
        address: "New Market Road ",
        city: "New York ",
        state: "NY",
        zip: "876543",
        lat: 40.7128,
        lng: -74.006,
      },
      liveLocation: {
        lat: 40.7128,
        lng: -74.006,
        updatedAt: "2026-04-06T08:41:27.211Z",
      },
      id: "69d366617ed7e54198d67dac",
      user: {
        id: "69bb6caf448f2d818db59122",
        name: "Admin",
        email: "admin@example.com",
      },
      items: [
        {
          product: "69c22613ae75a98c7cd13b3b",
          name: "Oxford Button-Down Shirt",
          image:
            "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=500&q=80",
          price: 1499,
          quantity: 2,
          unit: "piece",
          id: "69d366617ed7e54198d67dad",
        },
        {
          product: "69c22613ae75a98c7cd13b36",
          name: "Classic Slim Fit Dark Wash Jeans",
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
          price: 1999,
          quantity: 1,
          unit: "piece",
          id: "69d366617ed7e54198d67dae",
        },
      ],
      paymentMethod: "cash",
      subtotal: 4997,
      deliveryFee: 0,
      tax: 399.76,
      total: 5396.76,
      status: "Delivered",
      statusHistory: [
        {
          status: "Placed",
          note: "Order placed successfully",
          id: "69d366617ed7e54198d67daf",
          timestamp: "2026-04-06T07:53:05.769Z",
        },
        {
          status: "Assigned",
          note: "Assigned to Rahul",
          id: "69d366ab7ed7e54198d67dbe",
          timestamp: "2026-04-06T07:54:19.796Z",
        },
        {
          status: "Packed",
          note: "Status updated to Packed",
          id: "69d366b37ed7e54198d67ddc",
          timestamp: "2026-04-06T07:54:27.171Z",
        },
        {
          status: "Out for Delivery",
          note: "Status updated to Out for Delivery",
          id: "69d366b57ed7e54198d67e00",
          timestamp: "2026-04-06T07:54:29.226Z",
        },
        {
          status: "Delivered",
          note: "Delivered by partner",
          id: "69d373207ed7e54198d681b1",
          timestamp: "2026-04-06T08:47:28.983Z",
        },
      ],
      deliveryPartner: {
        id: "69bbfc3866db7c6cdea47ede",
        name: "Rahul",
        phone: "987654321",
      },
      deliveryOtp: "",
      isPaid: false,
      createdAt: "2026-04-06T07:53:05.774Z",
      updatedAt: "2026-04-06T08:47:28.984Z",
      __v: 4,
    },
  ],
};

export const dummyDeliveryPartnerData = [
  {
    id: "69bbfc6c66db7c6cdea47ee4",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "987654321",
    avatar: "",
    vehicleType: "bike",
    isActive: true,
    createdAt: "2026-03-19T13:38:52.827Z",
    updatedAt: "2026-03-19T13:38:52.827Z",
    __v: 0,
  },
  {
    id: "69bbfc3866db7c6cdea47ede",
    name: "Rahul",
    email: "rahul@example.com",
    phone: "987654321",
    avatar: "",
    vehicleType: "bike",
    isActive: true,
    createdAt: "2026-03-19T13:38:00.872Z",
    updatedAt: "2026-03-19T13:38:00.872Z",
    __v: 0,
  },
];

export const dummyDashboardOrdersData = [
  {
    shippingAddress: {
      label: "Home",
      address: "New Market Road ",
      city: "New York ",
      state: "NY",
      zip: "876543",
      lat: 40.7128,
      lng: -74.006,
    },
    liveLocation: {
      lat: 40.7128,
      lng: -74.006,
      updatedAt: "2026-04-06T08:41:27.211Z",
    },
    id: "69d366617ed7e54198d67dac",
    user: {
      id: "69bb6caf448f2d818db59122",
      name: "Admin",
      email: "admin@example.com",
    },
    items: [
      {
        product: "69c22613ae75a98c7cd13b3b",
        name: "Slim Fit Linen Shirt",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        price: 1799,
        quantity: 2,
        unit: "piece",
        id: "69d366617ed7e54198d67dad",
      },
      {
        product: "69c22613ae75a98c7cd13b36",
        name: "Slim Fit Chino Trousers",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
        price: 1499,
        quantity: 1,
        unit: "piece",
        id: "69d366617ed7e54198d67dae",
      },
    ],
    paymentMethod: "cash",
    subtotal: 5097,
    deliveryFee: 0,
    tax: 407.76,
    total: 5504.76,
    status: "Delivered",
    statusHistory: [
      {
        status: "Placed",
        note: "Order placed successfully",
        id: "69d366617ed7e54198d67daf",
        timestamp: "2026-04-06T07:53:05.769Z",
      },
      {
        status: "Assigned",
        note: "Assigned to Rahul",
        id: "69d366ab7ed7e54198d67dbe",
        timestamp: "2026-04-06T07:54:19.796Z",
      },
      {
        status: "Packed",
        note: "Status updated to Packed",
        id: "69d366b37ed7e54198d67ddc",
        timestamp: "2026-04-06T07:54:27.171Z",
      },
      {
        status: "Out for Delivery",
        note: "Status updated to Out for Delivery",
        id: "69d366b57ed7e54198d67e00",
        timestamp: "2026-04-06T07:54:29.226Z",
      },
      {
        status: "Delivered",
        note: "Delivered by partner",
        id: "69d373207ed7e54198d681b1",
        timestamp: "2026-04-06T08:47:28.983Z",
      },
    ],
    deliveryPartner: {
      id: "69bbfc3866db7c6cdea47ede",
      name: "Rahul",
      email: "rahul@example.com",
      phone: "987654321",
    },
    deliveryOtp: "",
    isPaid: false,
    createdAt: "2026-04-06T07:53:05.774Z",
    updatedAt: "2026-04-06T08:47:28.984Z",
    __v: 4,
  },
  {
    shippingAddress: {
      label: "Home",
      address: "New Market Road ",
      city: "New York ",
      state: "NY",
      zip: "876543",
      lat: 40.7128,
      lng: -74.006,
    },
    liveLocation: {
      lat: 40.7128,
      lng: -74.006,
      updatedAt: "2026-04-06T08:41:27.211Z",
    },
    id: "69d366617ed7e54198d67dad",
    user: {
      id: "69bb6caf448f2d818db59122",
      name: "Admin",
      email: "admin@example.com",
    },
    items: [
      {
        product: "69c22613ae75a98c7cd13b3b",
        name: "Ripped Distressed Slim Jeans",
        image:
          "https://images.unsplash.com/photo-1475178626620-a4d074967571?w=500&q=80",
        price: 2199,
        quantity: 1,
        unit: "piece",
        id: "69d366617ed7e54198d67dad",
      },
      {
        product: "69c22613ae75a98c7cd13b36",
        name: "Elastic Waist Jogger Trousers",
        image:
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",
        price: 999,
        quantity: 2,
        unit: "piece",
        id: "69d366617ed7e54198d67dae",
      },
    ],
    paymentMethod: "cash",
    subtotal: 4197,
    deliveryFee: 0,
    tax: 335.76,
    total: 4532.76,
    status: "Out for Delivery",
    statusHistory: [
      {
        status: "Placed",
        note: "Order placed successfully",
        id: "69d366617ed7e54198d67daf",
        timestamp: "2026-04-06T07:53:05.769Z",
      },
      {
        status: "Assigned",
        note: "Assigned to Rahul",
        id: "69d366ab7ed7e54198d67dbe",
        timestamp: "2026-04-06T07:54:19.796Z",
      },
      {
        status: "Packed",
        note: "Status updated to Packed",
        id: "69d366b37ed7e54198d67ddc",
        timestamp: "2026-04-06T07:54:27.171Z",
      },
      {
        status: "Out for Delivery",
        note: "Status updated to Out for Delivery",
        id: "69d366b57ed7e54198d67e00",
        timestamp: "2026-04-06T07:54:29.226Z",
      },
    ],
    deliveryPartner: {
      id: "69bbfc3866db7c6cdea47ede",
      name: "Rahul",
      email: "rahul@example.com",
      phone: "987654321",
    },
    deliveryOtp: "754730",
    isPaid: false,
    createdAt: "2026-04-06T07:53:05.774Z",
    updatedAt: "2026-04-06T08:47:28.984Z",
    __v: 4,
  },
];

export const dummyCartData = [
  { product: dummyProducts[0], quantity: 1 },
  { product: dummyProducts[1], quantity: 1 },
  { product: dummyProducts[2], quantity: 1 },
];

export const dummyAddressData = [
  {
    label: "Home",
    address: "123 Main St ",
    city: "New York ",
    state: "NY",
    zip: "10001",
    isDefault: true,
    lat: 40.7128,
    lng: -74.006,
    id: "69d3652df9a340288f1a0f8c",
  },
  {
    label: "Work",
    address: "456 Market St ",
    city: "New York ",
    state: "NY",
    zip: "10002",
    isDefault: false,
    lat: 40.7128,
    lng: -74.006,
    id: "69d3652df9a340288f1a0f8d",
  },
];
