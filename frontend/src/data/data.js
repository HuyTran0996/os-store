import DashboardIcon from "@mui/icons-material/Dashboard";

import StoreIcon from "@mui/icons-material/Store";
import BookIcon from "@mui/icons-material/Book";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import service from "../images/service/service.png";
import service2 from "../images/service/service-02.png";
import service3 from "../images/service/service-03.png";
import service4 from "../images/service/service-04.png";
import service5 from "../images/service/service-05.png";

//////MENU LIST//////////////
export const NAVIGATION = [
  {
    segment: "",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "product",
    title: "Our Store",
    icon: <StoreIcon />,
  },
  {
    segment: "blogs",
    title: "Blogs",
    icon: <BookIcon />,
  },
  {
    segment: "contact",
    title: "Contact",
    icon: <ConnectWithoutContactIcon />,
  },
  {
    segment: "profile",
    title: "User",
    icon: <AccountCircleIcon />,
  },
];
////////menu list end//////////

//////home/////
export const services = [
  {
    image: service,
    title: "Free Shipping",
    tagline: "From all orders over $100",
  },
  {
    image: service2,
    title: "Daily Surprise Offer",
    tagline: "Save up to 25% off",
  },
  {
    image: service3,
    title: "Support 24/7",
    tagline: "Shop with an expert",
  },
  {
    image: service4,
    title: "Affordable Prices",
    tagline: "Get Factory direct price",
  },
  {
    image: service5,
    title: "Secure Payments",
    tagline: "100% protected payments",
  },
];

///////Privacy Policy//////
export const privacy = [
  {
    title: "Privacy Policy",
    message:
      "OS-Store respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website and make purchases.",
  },
  {
    title: "Information We Collect:",
    message:
      "Personal Information: When you place an order or create an account, we may collect your name, email address, shipping address, billing address, and phone number.",
  },
  {
    title: "How We Use Your Information:",
    list: [
      "Process Orders: We use your information to process your orders, fulfill shipments, and provide customer support.",
      "Improve Our Services: We may use your information to improve our website, products, and services.",
      "Marketing Communications: With your consent, we may send you marketing emails about our products and promotions. You can opt out of these communications at any time.",
    ],
  },
  {
    title: "How We Protect Your Information:",
    message:
      "We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.",
  },
  {
    title: "Your Rights:",
    message:
      "You have the right to access, correct, or delete your personal information. You can also request to limit or object to the processing of your information.",
  },
  {
    title: "Changes to This Policy:s:",
    message:
      "We may update this Privacy Policy from time to time. We will notify you of any significant changes.",
  },
];

/////Privacy Policy end/////

///////About//////
export const about = [
  {
    title: "About Us",
    message:
      "OS-Store is your one-stop shop for all your tech needs. We're committed to bringing you the latest innovations in technology, from cutting-edge smartphones to powerful laptops and sleek tablets.At OS-Store, we believe technology should enhance your life, not complicate it. That's why we're dedicated to providing you with the best possible shopping experience. From our easy-to-navigate website to our knowledgeable customer support team, we're here to help you find the perfect device.",
  },
  {
    title: "Our Mission",
    message:
      "To empower our customers by providing them with the tools they need to stay connected, productive, and entertained.",
  },
  {
    title: "Our Vision",
    message:
      "To be the leading online retailer of technology products, trusted for our quality, service, and customer satisfaction.",
  },
  {
    title: "Our Commitment to You:",
    list: [
      "Quality Products: We only offer the highest quality products from trusted brands.",
      "Expert Advice: Our team is passionate about tech and can help you make informed decisions.",
      "Hassle-Free Returns: We offer a hassle-free return policy for your peace of mind.",
    ],
  },
];

/////About end/////

///////Refund Policy//////
export const refund = [
  {
    title: "Refund Policy",
    message:
      "At OS-Store, we strive to provide the best possible shopping experience. If, for any reason, you're not completely satisfied with your purchase, we offer a hassle-free return and refund policy.",
  },
  {
    title: "Eligibility for Returns and Refunds",
    message: "To be eligible for a return or refund, your item must be:",
    list: [
      "In its original condition",
      "Unopened and unused",
      "In its original packaging",
    ],
  },
  {
    title: "Return Process",
    list: [
      "Contact Us: Please contact our customer support team within [Number] days of receiving your order to initiate a return.",
      "Shipping: You will be responsible for the cost of shipping the item back to us. We recommend using a trackable shipping service.",
      "Refund: Once we receive your returned item and verify its condition, we will process your refund to your original payment method.",
    ],
  },
  {
    title: "Exceptions",
    message:
      "Please note that certain items may not be eligible for returns or refunds, such as:",
    list: [
      "Digital products",
      "Personalized items",
      "Items sold as final sale",
    ],
  },
  {
    title: "Damaged or Defective Items",
    message:
      "If you receive a damaged or defective item, please contact our customer support team immediately. We will provide you with a prepaid shipping label to return the item and will process a full refund or replacement.",
  },
];

/////Refund Policy end/////

///////Shipping Policy//////
export const shipping = [
  {
    title: "Shipping Costs",
    message:
      "Shipping costs vary depending on the shipping address, product weight, and shipping method selected. You can view the estimated shipping cost for your order during the checkout process.",
  },
  {
    title: "Shipping Time",

    list: [
      "Processing Time: Orders are typically processed within 7 business days.",
      "Shipping Time: Once your order is processed, it will be shipped. The estimated delivery time will depend on your shipping address and the shipping method selected.",
    ],
  },
  {
    title: "Shipping Methods",
    message: "We offer various shipping methods to cater to your needs:",
    list: [
      "Standard Shipping: within 7 business days.",
      "Expedited Shipping: within 5 business days.",
    ],
  },
  {
    title: "Tracking Your Order",
    message:
      "Once your order is shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the progress of your shipment on the carrier's website.",
  },
  {
    title: "International Shipping",
    message:
      "We ship to many countries worldwide. International shipping rates and delivery times may vary. Please note that international shipments may be subject to customs duties and taxes, which are the responsibility of the recipient.",
  },
];

/////Refund Policy end/////

///////////Term And Conditions/////
export const termsAndConditions = [
  {
    title: "Acceptance of Terms",
    message:
      "By accessing and using our website, you agree to be bound by these terms and conditions. If you disagree with any part of these terms and conditions, please do not use our website.",
  },
  {
    title: "Use of Website",
    message:
      "You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of our website by any third party.",
  },
  {
    title: "Intellectual Property",
    message:
      "All content on our website, including text, graphics, logos, images, and software, is the property of [Your Company Name] or its licensors and is protected by copyright and other intellectual property laws.",
  },
  {
    title: "Product Information",
    message:
      "We make every effort to ensure that product information on our website is accurate. However, we cannot guarantee that all information is error-free.",
  },
  {
    title: "Orders and Payments",
    message:
      "When you place an order, you agree to provide accurate and complete information. We reserve the right to cancel any order if we suspect fraudulent activity.",
  },
  {
    title: "Shipping and Delivery",
    message:
      "We will make reasonable efforts to deliver your order on time. However, we cannot guarantee delivery times.",
  },
  {
    title: "Returns and Refunds",
    message: "Our return and refund policy is outlined in our Refund Policy.",
  },
  {
    title: "Limitation of Liability",
    message:
      "To the fullest extent permitted by law, OS-Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
  },
  {
    title: "Governing Law",
    message:
      "These terms and conditions shall be governed by and construed in accordance with the laws of [Your Country].",
  },
  {
    title: "Changes to Terms and Conditions",
    message:
      "We reserve the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on our website.",
  },
];

////Term And Conditions end//////

///FAQ/////////

export const faq = [
  {
    title: "Shipping",
    list: [
      {
        question: "How long does shipping take?",
        answer:
          "Orders are typically processed within 2-3 business days. Shipping times vary depending on your location and the shipping method selected. You can expect your order to arrive within 5-7 business days.",
      },
      {
        question: "How much does shipping cost?",
        answer:
          "Shipping costs vary depending on the shipping address, product weight, and shipping method selected. You can view the estimated shipping cost for your order during the checkout process.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes, you can track your order using the tracking number provided in your shipping confirmation email. You can track your order on the carrier's website.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship internationally. However, please note that international shipping rates and delivery times may vary. Additionally, international shipments may be subject to customs duties and taxes, which are the responsibility of the recipient.",
      },
    ],
  },
  {
    title: "Returns and Refunds",
    list: [
      {
        question: "What is your return policy?",
        answer:
          "You may return most new, unopened items within 30 days of delivery for a full refund. To be eligible for a return, your item must be in its original condition and packaging.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Please contact our customer support team to initiate a return. We will provide you with a return shipping label. Once we receive your returned item, we will process your refund.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Once we receive your returned item, we will process your refund within 5-7 business days. You will receive a notification email once your refund has been processed.",
      },
    ],
  },
  {
    title: "Orders and Payments",
    list: [
      {
        question: "How do I place an order?",
        answer:
          "To place an order, simply browse our website, select the items you wish to purchase, and add them to your cart. Once you're ready to checkout, provide your shipping and payment information and complete your order.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, debit cards, and PayPal.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, your payment information is secure. We use industry-standard encryption technology to protect your personal information.",
      },
    ],
  },
  {
    title: "Products",
    list: [
      {
        question: "Are your products authentic?",
        answer:
          "Yes, all of our products are 100% authentic and sourced directly from reputable manufacturers or authorized distributors.",
      },
      {
        question: "How do I care for my product?",
        answer:
          "Please refer to the specific care instructions provided with your product. If you have any questions, please contact our customer support team.",
      },
      {
        question: "Do you offer warranties on your products?",
        answer:
          "Yes, we offer warranties on many of our products. Please refer to the specific product page for more information on warranty coverage.",
      },
    ],
  },
];
///FAQ end///////
