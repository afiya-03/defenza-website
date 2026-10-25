
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import {
  Phone,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Award,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ========================================
   HOME CAROUSEL IMAGES
======================================== */

import kinzaDoor1 from "./assets/kinza/door1.jpg";
import kinzaDoor2 from "./assets/kinza/door2.jpg";
import kinzaDoor3 from "./assets/kinza/door3.jpg";

import fusimDoor1 from "./assets/fusim/door1.jpg";
import fusimDoor2 from "./assets/fusim/door2.jpg";
import fusimDoor3 from "./assets/fusim/door3.jpg";

import contactDoor from "./assets/kinza/door1.jpg";

/* ========================================
   SERVICE IMAGES
======================================== */

import premiumSteelDoors from "./assets/services/premium-steel-doors.jpg";
import luxurySmartDoors from "./assets/services/luxury-smart-doors.jpg";
import giGalvalumeSolutions from "./assets/services/steel-doors-windows.jpg";

/* ========================================
   CONTACT DETAILS
======================================== */

const PHONE = "+91 9010600096";
const EMAIL = "Defenzahome@gmail.com";
const INSTAGRAM = "https://www.instagram.com/fusim_steeldoor/";

const WHATSAPP = PHONE.replace(/\D/g, "");

const whatsappLink = (
  message = "Hello DEFENZA, I would like to know more about your steel doors."
) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

/* ========================================
   INSTAGRAM ICON
======================================== */

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

/* ========================================
   HOME CAROUSEL DATA
======================================== */

const doorImages = [
  { src: kinzaDoor1, brand: "KINZA", title: "Premium Steel Doors" },
  { src: fusimDoor1, brand: "FUSIM", title: "Modern Steel Doors" },
  { src: kinzaDoor2, brand: "KINZA", title: "Elegant Door Designs" },
  { src: fusimDoor2, brand: "FUSIM", title: "Contemporary Doors" },
  { src: kinzaDoor3, brand: "KINZA", title: "Classic Steel Doors" },
  { src: fusimDoor3, brand: "FUSIM", title: "Stylish Door Designs" },
];

/* ========================================
   PRODUCT IMAGE LOADER
======================================== */

const productImageModules = import.meta.glob(
  [
    "./products/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    "./assets/products/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  ],
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/* ========================================
   KINZA PRODUCT NAMES AND SIZES
   Size format: Height × Width × Thickness
======================================== */

const kinzaProductsData = [
  ["Crysta", "2200 × 1500 × 110 mm"],
  ["Emperor", "2350 × 1500 × 90 mm"],
  ["Gothic", "2050 × 1500 × 90 mm"],
  ["Artis", "2200 × 1800 × 110 mm"],
  ["Vinayaka", "2050 × 1080 × 90 mm"],
  ["Heaven with Pillar", "2050 × 1500 × 90 mm"],
  ["Golden", "2050 × 1080 × 90 mm"],
  ["Rich", "2050 × 1200 × 90 mm"],
  ["Maharaja Plazza Glass with Pillar", "2200 × 1800 × 90 mm"],
  ["Sonet", "2050 × 1080 × 90 mm"],
  ["Canva DCW", "2050 × 1200 × 90 mm"],
  ["Shalome", "2050 × 1080 × 90 mm"],
  ["Retro", "2050 × 1080 × 90 mm"],
  ["Windoor", "2350 × 1500 × 90 mm"],
  ["Brown", "2050 × 1200 × 90 mm"],
  ["Defender", "2050 × 1200 × 70 mm"],
  ["Mapple", "2050 × 1080 × 70 mm"],
  ["Tectano", "2050 × 1080 × 70 mm"],
  ["Portia DCW", "2050 × 1200 × 70 mm"],
  ["Alcove", "2050 × 1080 × 90 mm"],
];

/* ========================================
   FUSIM PRODUCT NAMES AND SIZES
======================================== */

const fusimProductsData = [
  ["Proxy with Pillar", "2050 × 1500 / 1800 × 90 mm (M/L)"],
  ["Proxy", "Confirm from catalog"],
  ["Neta", "Confirm from catalog"],
  ["Helen Gold", "Confirm from catalog"],
  ["Zeno", "Confirm from catalog"],
  ["Rush", "Confirm from catalog"],
  ["Neo", "Confirm from catalog"],
  ["Elite", "Confirm from catalog"],
  ["Rush Twin Door", "Confirm from catalog"],
  ["Grill Door", "Confirm from catalog"],
  ["Vigneswara", "Confirm from catalog"],
  ["Odox", "Confirm from catalog"],
  ["Oscar", "Confirm from catalog"],
  ["Atlas", "Confirm from catalog"],
  ["Zion", "Confirm from catalog"],
  ["Victoria", "Confirm from catalog"],
  ["Protector", "Confirm from catalog"],
  ["Aura", "Confirm from catalog"],
  ["Valor", "Confirm from catalog"],
  ["Opal", "Confirm from catalog"],
];
   
/* ========================================
   LOAD PRODUCT IMAGES
======================================== */

function loadProductImages(brandFolder, brandName) {
  const folder = brandFolder.toLowerCase();

  const productData =
    folder === "kinza" ? kinzaProductsData : fusimProductsData;

  return Object.entries(productImageModules)
    .filter(([path]) => {
      const normalizedPath = path.replace(/\\/g, "/").toLowerCase();

      const expectedPath = new RegExp(
        `^\\./(?:assets/)?products/${folder}/door\\d+\\.(jpg|jpeg|png|webp)$`,
        "i"
      );

      return expectedPath.test(normalizedPath);
    })
    .sort(([pathA], [pathB]) => {
      const numberA = Number(pathA.match(/door(\d+)/i)?.[1] || 0);
      const numberB = Number(pathB.match(/door(\d+)/i)?.[1] || 0);

      return numberA - numberB;
    })
    .map(([path, image], index) => {
      const doorNumber = Number(
        path.match(/door(\d+)/i)?.[1] || index + 1
      );

      const [title, size] = productData[doorNumber - 1] || [
        `${brandName} Door ${doorNumber}`,
        "Confirm from catalog",
      ];

      return {
        id: `${folder}-${doorNumber}`,
        image,
        brand: brandName,
        title,
        doorNumber,
        size,
      };
    });
}

/* ========================================
   BRAND PRODUCT LISTS
======================================== */

const kinzaProducts = loadProductImages("kinza", "KINZA");
const fusimProducts = loadProductImages("fusim", "FUSIM");
/* ========================================
   FUSIM PRODUCTS FIRST, THEN KINZA
======================================== */

const products = [...fusimProducts, ...kinzaProducts];
/* ========================================
   SERVICES DATA
======================================== */

const services = [
  {
    number: "01",
    title: "Premium Steel Doors",
    description:
      "We offer high-quality wooden-finish steel doors for main entrances, bedrooms, balconies and terraces, combining strength, durability and elegant design.",
    tags: ["Main Doors", "Bedroom Doors", "Balcony Doors", "Terrace Doors"],
    image: premiumSteelDoors,
    alt: "Premium steel door design",
  },
  {
    number: "02",
    title: "Luxury & Smart Doors",
    description:
      "Discover premium door designs with modern security options, elegant finishes and smart-lock compatibility for a more secure and convenient lifestyle.",
    tags: ["Smart Locks", "Camera Doors", "Multi-Lock Options", "Custom Designs"],
    image: luxurySmartDoors,
    alt: "Luxury modern steel door",
  },
  {
    number: "03",
    title: "GI & Galvalume Solutions",
    description:
      "Explore practical steel door and window solutions designed for everyday use, with a focus on lasting performance, dependable quality and a clean finish.",
    tags: ["GI Solutions", "Galvalume", "Steel Windows", "Durable Finishes"],
    image: giGalvalumeSolutions,
    alt: "Steel door and window solutions",
  },
];

/* ========================================
   PRODUCT DETAILS PAGE
======================================== */

function ProductDetailsPage({ product }) {
  const message = `Hello DEFENZA, I would like to know more about the ${product.brand} steel door design ${product.doorNumber}. Please share its price and specifications.`;

  return (
    <main className="product-details-page">
      <div className="container">
        <div className="product-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/#products">Products</a>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="product-details-layout">
          <div className="product-details-image">
            <img
              src={product.image}
              alt={`${product.brand} steel door`}
            />
          </div>

          <div className="product-details-content">
            <span className="eyebrow">{product.brand} COLLECTION</span>

            <h1>{product.title}</h1>

            <p>
              Discover this {product.brand} steel door design from
              DEFENZA DOORS &amp; WINDOWS. Contact us for product
              specifications, available finishes, pricing and ordering
              information.
            </p>

            <a
              className="product-details-enquire"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp
              <ArrowUpRight size={18} />
            </a>

            <a className="product-details-back" href="/#products">
              ← Back to Products
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ========================================
   MAIN APP
======================================== */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(6);

  const [visibleFusimProducts, setVisibleFusimProducts] = useState(6);
  const [visibleKinzaProducts, setVisibleKinzaProducts] = useState(6);

  const servicesRef = useRef(null);

  const pathname = window.location.pathname;

  const productSlug = pathname.startsWith("/products/")
    ? decodeURIComponent(pathname.split("/").filter(Boolean).pop())
    : "";

  const selectedProduct = products.find(
    (product) => product.id === productSlug
  );

  /* SERVICE SCROLL ANIMATION */

  useEffect(() => {
    if (productSlug) return;

    const section = servicesRef.current;
    if (!section) return;

    const serviceRows = section.querySelectorAll(".service-showcase");

    if (!("IntersectionObserver" in window)) {
      serviceRows.forEach((row) => row.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    serviceRows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, [productSlug]);

  if (productSlug && selectedProduct) {
    return <ProductDetailsPage product={selectedProduct} />;
  }

  const closeMenu = () => setMenuOpen(false);

  const showMoreProducts = () => setVisibleProducts(products.length);
  const showLessProducts = () => setVisibleProducts(6);

  return (
    <>
      {/* TOP CONTACT BAR */}

      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>
              <Phone size={15} />
              <span>{PHONE}</span>
            </a>

            <a href={`mailto:${EMAIL}`}>
              <Mail size={15} />
              <span>{EMAIL}</span>
            </a>
          </div>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="topbar-instagram"
            aria-label="Follow DEFENZA on Instagram"
          >
            <InstagramIcon size={15} />
            <span>Follow Us</span>
          </a>
        </div>
      </div>

      {/* HEADER */}

      <header className="main-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand-logo"
            aria-label="DEFENZA home"
            onClick={closeMenu}
          >
            <span className="brand-mark">
              <span>D</span>
            </span>

            <span className="brand-name">
              <strong>DEFENZA</strong>
              <small>DOORS &amp; WINDOWS</small>
            </span>
          </a>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            className={`navigation ${menuOpen ? "navigation-open" : ""}`}
            aria-label="Main navigation"
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#products" onClick={closeMenu}>Products</a>
            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>

            <a
              href={whatsappLink("Hello DEFENZA, I would like to enquire about your doors.")}
              target="_blank"
              rel="noreferrer"
              className="enquire-button"
              onClick={closeMenu}
            >
              Enquire Now
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HOME CAROUSEL */}

        <section className="door-showcase" id="home">
          <div className="showcase-heading">
            <span className="eyebrow">SINCE 2026</span>
            <h1>
              Premium Steel Doors
              <br />
              <span>for Modern Homes</span>
            </h1>
          </div>

          <div className="container carousel-container">
            <Swiper
              className="defenza-swiper"
              modules={[Autoplay, Navigation, Pagination]}
              loop
              speed={800}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={22}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
            >
              {doorImages.map((door, index) => (
                <SwiperSlide key={`${door.brand}-${index}`}>
                  <div className="door-card">
                    <img
                      src={door.src}
                      alt={`${door.brand} ${door.title}`}
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="showcase-bottom">
            <span className="showcase-line" />
            <span>Strength</span>
            <span>·</span>
            <span>Security</span>
            <span>·</span>
            <span>Style</span>
            <span className="showcase-line" />
          </div>
        </section>

        {/* ABOUT */}

        <section className="about-section section-padding" id="about">
          <div className="container about-grid">
            <div className="about-images">
              <div className="about-image-main">
                <img
                  src={kinzaDoor1}
                  alt="DEFENZA premium steel entrance door"
                  loading="lazy"
                />
              </div>

              <div className="about-image-small">
                <img
                  src={fusimDoor2}
                  alt="Modern steel door from Fusim"
                  loading="lazy"
                />
                <span className="since-label">SINCE 2026</span>
              </div>

              <div className="about-decoration" />
            </div>

            <div className="about-content">
              <span className="eyebrow">ABOUT DEFENZA</span>

              <h2>
                Designed for
                <br />
                <span>Strength &amp; Style</span>
              </h2>

              <p>
                DEFENZA DOORS &amp; WINDOWS provides premium steel
                doors from Kinza and Fusim, designed to deliver
                strength, security, durability and modern style.
              </p>

              <p>
                From elegant main entrances to practical everyday
                solutions, we help you explore door designs that
                complement your home.
              </p>

              <div className="about-features">
                <div><ShieldCheck size={21} /><span>Security Focus</span></div>
                <div><Sparkles size={21} /><span>Modern Designs</span></div>
                <div><Award size={21} /><span>Quality Focus</span></div>
              </div>

              <a href="#services" className="text-link">
                Explore Our Services
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES */}

        <section
          className="services-section section-padding"
          id="services"
          ref={servicesRef}
        >
          <div className="container">
            <div className="services-intro">
              <span className="eyebrow">OUR SERVICES</span>

              <h2>
                We Provide Premium
                <br />
                <span>Steel Door Solutions</span>
              </h2>

              <p>
                Discover door solutions that balance everyday
                practicality, security, durability and modern style.
              </p>

              <a href="#contact" className="services-browse-link">
                Browse All Services <span>↗</span>
              </a>
            </div>

            <div className="services-showcase">
              {services.map((service, index) => (
                <article
                  className={`service-showcase ${index === 1 ? "reverse" : ""}`}
                  key={service.number}
                >
                  <div className="service-showcase-content">
                    <span className="service-index">{`{${service.number}}`}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <div className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <a
                      href={whatsappLink(`Hello DEFENZA, I am interested in ${service.title}. Please share more details.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="service-enquire"
                    >
                      Enquire <span>↗</span>
                    </a>
                  </div>

                  <div className="service-showcase-image">
                    <img src={service.image} alt={service.alt} loading="lazy" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>


{/* PRODUCTS */}

<section className="products-section section-padding" id="products">
  <div className="container">
    <div className="section-heading">
      <span className="eyebrow">OUR PRODUCTS</span>
      <h2>
        Explore Our Luxury
        <br />
        <span>Steel Door Collection</span>
      </h2>
    </div>

    {/* FUSIM COLLECTION */}
    <div className="brand-products-section">
      <h2 className="brand-products-title">FUSIM Steel Doors</h2>

      <div className="products-grid">
        {fusimProducts
          .slice(0, visibleFusimProducts)
          .map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img
                  src={product.image}
                  alt={`FUSIM ${product.title} steel door`}
                  loading="lazy"
                />
              </div>

              <div className="product-info">
                <div>
                  <span>FUSIM</span>
                  <h3>{product.title}</h3>
                  
<div className="product-size">
  <span className="product-size-label">SIZE</span>
  <span className="product-size-value">{product.size}</span>
</div>

                </div>
              </div>

              <a
                className="product-explore-link"
                href={`/products/${product.id}`}
              >
                Read More
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
      </div>

      {fusimProducts.length > visibleFusimProducts && (
        <button
          className="products-view-more"
          type="button"
          onClick={() =>
            setVisibleFusimProducts(fusimProducts.length)
          }
        >
          View More FUSIM Doors
        </button>
      )}
    </div>

    {/* KINZA COLLECTION */}
    <div className="brand-products-section">
      <h2 className="brand-products-title">KINZA Steel Doors</h2>

      <div className="products-grid">
        {kinzaProducts
          .slice(0, visibleKinzaProducts)
          .map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img
                  src={product.image}
                  alt={`KINZA ${product.title} steel door`}
                  loading="lazy"
                />
              </div>

              <div className="product-info">
                <div>
                  <span>KINZA</span>
                  <h3>{product.title}</h3>
                  <p className="product-size">
                    Size: {product.size}
                  </p>
                </div>
              </div>

              <a
                className="product-explore-link"
                href={`/products/${product.id}`}
              >
                Read More
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
      </div>

      {kinzaProducts.length > visibleKinzaProducts && (
        <button
          className="products-view-more"
          type="button"
          onClick={() =>
            setVisibleKinzaProducts(kinzaProducts.length)
          }
        >
          View More KINZA Doors
        </button>
      )}
    </div>
  </div>
</section>

{/* WHY CHOOSE US SECTION */}
<section className="why-choose-section" id="why-choose-us">
  <div className="why-choose-container">
    <div className="why-choose-content">
      <span className="section-eyebrow">WHY CHOOSE US</span>

      <h2>
        Trusted Excellence in
        <br />
        Premium Steel Door Solutions
      </h2>

      <div className="why-choose-features">
        <div className="why-choose-feature">
          <svg
            className="why-choose-icon"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 4L40 10V22C40 32 33 40 24 44C15 40 8 32 8 22V10L24 4Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 24L22 30L33 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3>Superior Build Quality</h3>
          <p>
            Engineered with precision using high-strength steel
            and premium wooden finishes for lasting durability
            and protection.
          </p>
        </div>

        <div className="why-choose-feature">
          <svg
            className="why-choose-icon"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="15"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 41C8 31 14 26 24 26S40 31 40 41"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M31 12L34 15L40 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3>Reliable Customer Trust</h3>
          <p>
            Delivering secure, stylish, and performance-driven
            door solutions trusted by homeowners and businesses.
          </p>
        </div>
      </div>

      <a className="why-choose-button" href="#contact">
        Discover More →
      </a>
    </div>

    <div className="why-choose-image">
      <img
        src={kinzaDoor1}
        alt="DEFENZA premium steel entrance door"
      />

      <div className="why-choose-brand">
        <strong>DEFENZA</strong>
        <span>DOORS &amp; WINDOWS</span>
      </div>
    </div>
  </div>
</section>

        {/* AUTOMATIC MOVING DOOR CATEGORIES */}

        <section className="door-marquee" aria-label="Door categories">
          <div className="door-marquee-track">
            {[1, 2].map((group) => (
              <div
                className="door-marquee-group"
                key={group}
                aria-hidden={group === 2 ? "true" : undefined}
              >
                {[
                  "Luxury & Secure Door Solutions",
                  "Premium Steel Doors",
                  "Wooden-Finish Doors",
                  "Main Entrance Doors",
                  "GI Windows & Galvalume Doors",
                ].map((item, index) => (
                  <span className="marquee-item" key={index}>
                    <img
                      className="marquee-icon"
                      src="https://aivarsteeldoors.com/assets/images/icons/marquee-icon.png"
                      alt=""
                    />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}

        <section className="process-section" id="process">
          <div className="container">
            <div className="process-heading">
              <h2>PROCESS</h2>
            </div>

            <div className="process-timeline">
              <article className="process-item">
                <div className="process-card">
                  <div className="process-icon">
                    <img
                      src="https://aivarsteeldoors.com/assets/images/process/hm1-icon2.webp"
                      alt="Model selection and quotation"
                      loading="lazy"
                    />
                  </div>
                  <span className="process-number">STEP 01</span>
                  <h3>Finalising Model and Quotation</h3>
                  <p>
                    Confirming the final model and providing the
                    detailed quotation for approval.
                  </p>
                </div>
              </article>

              <article className="process-item">
                <div className="process-card">
                  <div className="process-icon">
                    <img
                      src="https://aivarsteeldoors.com/assets/images/process/hm1-icon1.webp"
                      alt="Consultation and measurement"
                      loading="lazy"
                    />
                  </div>
                  <span className="process-number">STEP 02</span>
                  <h3>Consult &amp; Measure</h3>
                  <p>
                    Understanding your space requirements and
                    security needs with expert guidance.
                  </p>
                </div>
              </article>

              <article className="process-item">
                <div className="process-card">
                  <div className="process-icon">
                    <img
                      src="https://aivarsteeldoors.com/assets/images/process/hm1-icon3.webp"
                      alt="Steel door manufacturing and delivery"
                      loading="lazy"
                    />
                  </div>
                  <span className="process-number">STEP 03</span>
                  <h3>Manufacture &amp; Deliver</h3>
                  <p>
                    Precision-built steel doors crafted for
                    durability and long-lasting performance.
                  </p>
                </div>
              </article>

              <article className="process-item">
                <div className="process-card">
                  <div className="process-icon">
                    <img
                      src="https://aivarsteeldoors.com/assets/images/process/hm1-icon4.webp"
                      alt="Door installation and customer support"
                      loading="lazy"
                    />
                  </div>
                  <span className="process-number">STEP 04</span>
                  <h3>Install &amp; Support</h3>
                  <p>
                    Professional installation and reliable
                    after-sales service for complete satisfaction.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* GALLERY */}

        <section className="services-section section-padding" id="gallery">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">OUR PRODUCTS GALLERY</span>
              <h2>
                Luxury &amp; Wooden-Finish
                <br />
                <span>Steel Door Collections</span>
              </h2>
            </div>

            <div className="products-grid gallery-grid">
              {doorImages.slice(0, 5).map((door, index) => (
                <article
                  className="product-card gallery-card"
                  key={`${door.brand}-${door.title}-${index}`}
                >
                  <div className="product-image">
                    <img
                      src={door.src}
                      alt={`${door.brand} ${door.title}`}
                      loading="lazy"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="gallery-view-more">
              <a href="#products" className="gallery-view-button">
                View More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}

        <section className="testimonials-section" id="testimonials">
          <div className="testimonials-container">
            <div className="testimonials-heading">
              <div className="testimonials-intro">
                <span className="section-label">TESTIMONIAL</span>

                <h2>
                  Trusted by 1000+
                  <br />
                  Happy Customers
                </h2>

                <p>Across Hyderabad</p>

                <div className="client-avatars">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Customer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Customer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div className="client-count-box">
                <h3>1000+</h3>
                <p>Satisfied Clients</p>
                <span>Across Hyderabad</span>
              </div>
            </div>

            <div className="testimonials-scroll">
              <article className="testimonial-card">
                <div className="testimonial-customer">
                  <div className="customer-avatar">C</div>
                  <div>
                    <h3>DEFENZA Customer</h3>
                    <p>Hyderabad</p>
                  </div>
                </div>

                <div className="testimonial-rating">
                  ★★★★★ <span>(5.0)</span>
                </div>

                <p className="testimonial-review">
                  Share genuine feedback about the quality, finish
                  and durability of a DEFENZA door here.
                </p>
              </article>

              <article className="testimonial-card">
                <div className="testimonial-customer">
                  <div className="customer-avatar">C</div>
                  <div>
                    <h3>DEFENZA Customer</h3>
                    <p>Hyderabad</p>
                  </div>
                </div>

                <div className="testimonial-rating">
                  ★★★★★ <span>(5.0)</span>
                </div>

                <p className="testimonial-review">
                  Add genuine customer feedback about the door
                  design, ordering experience and installation.
                </p>
              </article>

              <article className="testimonial-card">
                <div className="testimonial-customer">
                  <div className="customer-avatar">C</div>
                  <div>
                    <h3>DEFENZA Customer</h3>
                    <p>Hyderabad</p>
                  </div>
                </div>

                <div className="testimonial-rating">
                  ★★★★★ <span>(5.0)</span>
                </div>

                <p className="testimonial-review">
                  Add a genuine review from a customer who purchased
                  a Kinza or Fusim door.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* DEFENZA STATISTICS */}

        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle cx="24" cy="20" r="8" />
                  <circle cx="43" cy="23" r="6" />
                  <path d="M8 51v-3c0-10 7-16 16-16s16 6 16 16v3z" />
                  <path d="M40 35c8 0 14 5 15 13v3H44" />
                </svg>
              </div>
              <h3>1000+</h3>
              <p>Happy Clients</p>
            </div>

            <div className="stat-item">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <path d="M8 53V27l13-9 13 9v26M34 53V13h15v40M49 31h8v22" />
                  <path d="M14 34h5m-5 8h5m6-8h5m-5 8h5M40 21h4m-4 8h4m-4 8h4m-4 8h4M5 53h54" />
                </svg>
              </div>
              <h3>100+</h3>
              <p>Builders &amp; Engineers</p>
            </div>

            <div className="stat-item">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle cx="32" cy="25" r="17" />
                  <path d="m32 14 3.5 7 7.5 1.1-5.5 5.3 1.3 7.5-6.8-3.6-6.8 3.6 1.3-7.5-5.5-5.3 7.5-1.1z" />
                  <path d="m21 39-3 15 14-7 14 7-3-15" />
                </svg>
              </div>
              <h3>5</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH */}

        <section
          className="defenza-contact-section"
          id="contact"
          style={{ backgroundImage: `url(${contactDoor})` }}
        >
          <div className="defenza-contact-overlay">
            <div className="defenza-contact-content">
              <span className="defenza-contact-label">GET IN TOUCH</span>

              <h2>
                High-Security
                <br />
                Steel Doors
              </h2>

              <h3>Crafted for Style &amp; Protection</h3>

              <p className="defenza-contact-location">
                Across Hyderabad
              </p>

              <a
                href="tel:+919010600096"
                className="defenza-contact-button"
              >
                Contact Us Now <span aria-hidden="true">→</span>
              </a>

              <div className="defenza-contact-phone">
                <span className="defenza-phone-icon" aria-hidden="true">
                  ☎
                </span>

                <div>
                  <h4>Call Our Sales Team</h4>
                  <a href="tel:+919010600096">
                    +91 9010600096
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* DEFENZA FOOTER */}

      <footer className="defenza-footer">
        <div className="defenza-footer-container">
          {/* COLUMN 1: BRAND */}

          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              DEFENZA
              <span>DOORS &amp; WINDOWS</span>
            </a>

            <p>
              DEFENZA DOORS &amp; WINDOWS provides premium steel
              doors and windows, combining strength, security,
              and modern design for homes and businesses.
            </p>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="footer-instagram"
            >
              Follow us on Instagram ↗
            </a>
          </div>

          {/* COLUMN 2: QUICK LINKS */}

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#products">Products</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact Us</a>
          </div>

          {/* COLUMN 3: PRODUCTS */}

          <div className="footer-column">
            <h3>Products</h3>
            <a href="#products">Kinza Doors</a>
            <a href="#products">Fusim Doors</a>
            <a href="#products">Steel Doors</a>
            <a href="#products">Steel Windows</a>
          </div>

          {/* COLUMN 4: CONTACT */}

          <div className="footer-column footer-contact">
            <h3>Contact Us</h3>

            <p>Call Our Sales Team</p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>
              {PHONE}
            </a>

            <p>Email Us</p>
            <a href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>

            <p>Instagram</p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              @fusim_steeldoor
            </a>
          </div>
        </div>

        {/* FOOTER BOTTOM */}

        <div className="defenza-footer-bottom">
          <a href="#home" className="footer-bottom-brand">
            DEFENZA DOORS &amp; WINDOWS · SINCE 2026
          </a>

          <p>
            Strength, security and style for modern homes.
          </p>

          <p>
            © {new Date().getFullYear()} DEFENZA DOORS &amp; WINDOWS.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
