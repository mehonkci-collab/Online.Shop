/**
 * Fashion E-Commerce - Main JavaScript
 * Customer-side functionality
 */

// ============================================
// DATA MANAGEMENT
// ============================================

// Initialize data from localStorage or use defaults
const getStoreData = () => {
  const data = localStorage.getItem('fashionStoreData');
  if (data) {
    return JSON.parse(data);
  }
  
  // Default data for first-time users
  const defaultData = {
    products: [
      {
        id: 1,
        name: "Elegant White Blouse",
        price: 350000,
        description: "A timeless white blouse crafted from premium cotton, perfect for both formal and casual occasions. Features a classic collar and pearl buttons.",
        images: [
          "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
          "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600"
        ],
        sizes: ["S", "M", "L", "XL"],
        badge: "New"
      },
      {
        id: 2,
        name: "Classic Black Dress",
        price: 585000,
        description: "A stunning black dress with elegant silhouette. Perfect for evening events and special occasions. Features subtle lace details and a flattering fit.",
        images: [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Best Seller"
      },
      {
        id: 3,
        name: "Tailored Navy Blazer",
        price: 750000,
        description: "A sophisticated navy blazer with modern tailoring. Features peak lapels, dual front pockets, and interior pockets for convenience.",
        images: [
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600"
        ],
        sizes: ["M", "L", "XL"],
        badge: null
      },
      {
        id: 4,
        name: "Silk Beige Blouse",
        price: 425000,
        description: "Luxurious silk blouse in a soft beige tone. Features a V-neckline and draped sleeves for an effortlessly elegant look.",
        images: [
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
          "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600",
          "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600"
        ],
        sizes: ["S", "M", "L", "XL"],
        badge: "Premium"
      },
      {
        id: 5,
        name: "High-Waist Trousers",
        price: 420000,
        description: "Elegant high-waist trousers with a wide leg fit. Features side pockets and a concealed back zipper for a sleek appearance.",
        images: [
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600"
        ],
        sizes: ["S", "M", "L", "XL"],
        badge: null
      },
      {
        id: 6,
        name: "Cashmere Sweater",
        price: 890000,
        description: "Ultra-soft cashmere sweater in a classic crew neck design. Perfect for layering or wearing alone. Available in multiple neutral tones.",
        images: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Luxury"
      }
    ],
    paymentSettings: {
      banks: [
        { name: "Bank Central Asia (BCA)", accountNumber: "1234567890", accountName: "Fashion Store" },
        { name: "Bank Mandiri", accountNumber: "0987654321", accountName: "Fashion Store" },
        { name: "Bank Negara Indonesia (BNI)", accountNumber: "5678901234", accountName: "Fashion Store" }
      ],
      eWallets: [
        { name: "GoPay", number: "081234567890" },
        { name: "OVO", number: "081234567890" },
        { name: "Dana", number: "081234567890" }
      ],
      qrCode: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=300",
      whatsappNumber: "6281234567890"
    },
    aboutUs: {
      logo: "LUXE<span>FASHION</span>",
      brandName: "LUXE FASHION",
      description: "LUXE FASHION is a premium fashion brand dedicated to providing elegant and timeless pieces for the modern individual. Our collections are carefully curated to bring you the finest quality clothing with impeccable craftsmanship.",
      vision: "To be the leading destination for luxury fashion, inspiring confidence and elegance in every individual who wears our creations.",
      mission: "We are committed to delivering exceptional quality, sustainable fashion that transcends seasons and trends. Our focus on customer satisfaction and ethical practices defines our brand.",
      contact: {
        email: "hello@luxefashion.com",
        phone: "+62 812 3456 7890",
        address: "Jl. Fashion Avenue No. 123, Jakarta Selatan, Indonesia"
      }
    },
    testimonials: [
      {
        id: 1,
        name: "Siti Rahayu",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        rating: 5,
        comment: "Kualitas bajunya sangat bagus! Bahannya nyaman dan jahitan rapih. Pasti akan belanja lagi.",
        productImage: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=200"
      },
      {
        id: 2,
        name: "Diana Putri",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        rating: 5,
        comment: "Suka banget sama koleksi terbaru mereka. Pemesanan mudah dan pengiriman cepat.",
        productImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200"
      },
      {
        id: 3,
        name: "Maya Sari",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        rating: 4,
        comment: "Bagus sekali, sesuai dengan foto. Ukurannya juga tepat. Recommended!",
        productImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200"
      }
    ]
  };
  
  localStorage.setItem('fashionStoreData', JSON.stringify(defaultData));
  return defaultData;
};

// Save data to localStorage
const saveStoreData = (data) => {
  localStorage.setItem('fashionStoreData', JSON.stringify(data));
};

// Get store data
let storeData = getStoreData();

// ============================================
// DOM ELEMENTS
// ============================================

const heroSection = document.getElementById('hero');
const productsSection = document.getElementById('products');
const checkoutSection = document.getElementById('checkout');
const aboutSection = document.getElementById('about');
const testimonialsSection = document.getElementById('testimonials');
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// ============================================
// NAVIGATION
// ============================================

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    if (window.scrollY > 300) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
});

// Navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href === '#home') {
      e.preventDefault();
      showHome();
    } else if (href === '#about') {
      e.preventDefault();
      showAbout();
    } else if (href === '#products') {
      e.preventDefault();
      showProducts();
    } else if (href === '#testimonials') {
      e.preventDefault();
      showTestimonials();
    }
    
    // Close mobile menu
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ============================================
// PAGE SHOW/HIDE FUNCTIONS
// ============================================

function showHome() {
  hideAllSections();
  if (heroSection) heroSection.style.display = 'block';
  if (productsSection) productsSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProducts() {
  hideAllSections();
  if (productsSection) productsSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
  hideAllSections();
  if (aboutSection) aboutSection.classList.add('active');
  renderAboutPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCheckout(product) {
  hideAllSections();
  if (checkoutSection) checkoutSection.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Populate checkout with product info
  populateCheckout(product);
}

function hideAllSections() {
  if (heroSection) heroSection.style.display = 'none';
  if (productsSection) productsSection.style.display = 'none';
  if (checkoutSection) checkoutSection.classList.remove('active');
  if (aboutSection) aboutSection.classList.remove('active');
  if (testimonialsSection) testimonialsSection.classList.remove('active');
}

function showTestimonials() {
  hideAllSections();
  if (testimonialsSection) testimonialsSection.classList.add('active');
  renderTestimonials();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// TESTIMONIALS
// ============================================

function renderTestimonials() {
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (!testimonialsGrid) return;
  
  // Always get fresh data from localStorage to reflect admin updates
  const currentStoreData = getStoreData();
  const testimonials = currentStoreData.testimonials || [];
  
  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (testimonials.length === 0) {
    testimonialsGrid.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3>Belum Ada Testimoni</h3>
        <p>Jadilah yang pertama memberikan testimoni!</p>
      </div>
    `;
    return;
  }
  
  testimonialsGrid.innerHTML = testimonials.map((testimonial, index) => `
    <div class="testimonial-card" style="animation-delay: ${index * 0.1}s">
      <div class="testimonial-header">
        <div class="testimonial-avatar">
          <span class="testimonial-initials">${getInitials(testimonial.name)}</span>
        </div>
        <div class="testimonial-info">
          <h4 class="testimonial-name">${testimonial.name}</h4>
          <div class="testimonial-rating">
            ${Array(5).fill(0).map((_, i) => `
              <span class="star ${i < testimonial.rating ? 'filled' : ''}">★</span>
            `).join('')}
          </div>
        </div>
      </div>
      <p class="testimonial-comment">"${testimonial.comment}"</p>
      ${testimonial.productImage ? `
        <div class="testimonial-product">
          <img src="${testimonial.productImage}" alt="Produk yang dibeli">
        </div>
      ` : ''}
    </div>
  `).join('');
}

// ============================================
// PRODUCT RENDERING
// ============================================

function renderProducts() {
  if (!productsGrid) return;
  
  // Always get fresh data from localStorage to reflect admin updates
  const currentStoreData = getStoreData();
  const products = currentStoreData.products;
  
  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3>No Products Available</h3>
        <p>Please check back later for our new collection.</p>
      </div>
    `;
    return;
  }
  
  productsGrid.innerHTML = products.map((product, index) => `
    <div class="product-card" data-product-id="${product.id}" style="animation-delay: ${index * 0.1}s">
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">Rp ${formatPrice(product.price)}</p>
        <div class="product-sizes">
          ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click listeners to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = parseInt(card.dataset.productId);
      const product = products.find(p => p.id === productId);
      if (product) {
        openProductModal(product);
      }
    });
  });
}

// ============================================
// PRODUCT MODAL
// ============================================

let currentProduct = null;
let selectedSize = null;

function openProductModal(product) {
  currentProduct = product;
  selectedSize = null;
  
  if (!productModal) return;
  
  const modalContent = productModal.querySelector('.modal-content');
  const modalGallery = modalContent.querySelector('.product-gallery');
  const modalDetails = modalContent.querySelector('.product-details');
  
  // Render gallery
  modalGallery.innerHTML = `
    <div class="main-image">
      <img src="${product.images[0]}" alt="${product.name}" id="mainImage">
    </div>
    <div class="thumbnail-list">
      ${product.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
          <img src="${img}" alt="${product.name}">
        </div>
      `).join('')}
    </div>
  `;
  
  // Render details
  modalDetails.innerHTML = `
    <h2>${product.name}</h2>
    <p class="product-price">Rp ${formatPrice(product.price)}</p>
    <p class="product-description">${product.description}</p>
    
    <div class="size-selection">
      <h4>Pilih Ukuran</h4>
      <div class="size-options">
        ${product.sizes.map(size => `
          <div class="size-option" data-size="${size}">${size}</div>
        `).join('')}
      </div>
    </div>
    
    <button class="buy-btn" id="buyNowBtn">Beli Sekarang</button>
  `;
  
  // Show modal
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Thumbnail click handlers
  modalGallery.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.dataset.index);
      const mainImg = document.getElementById('mainImage');
      mainImg.src = product.images[index];
      
      modalGallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
  
  // Size selection
  modalDetails.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', () => {
      modalDetails.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      selectedSize = option.dataset.size;
    });
  });
  
  // Buy now button
  const buyBtn = document.getElementById('buyNowBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!selectedSize) {
        showToast('Silakan pilih ukuran terlebih dahulu', 'error');
        return;
      }
      productModal.classList.remove('active');
      document.body.style.overflow = '';
      showCheckout({ ...product, selectedSize });
    });
  }
  
  // Close modal
  const closeBtn = productModal.querySelector('.modal-close');
  closeBtn.onclick = () => {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  productModal.onclick = (e) => {
    if (e.target === productModal) {
      productModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
}

// ============================================
// CHECKOUT
// ============================================

function populateCheckout(product) {
  const checkoutForm = document.getElementById('checkoutForm');
  if (!checkoutForm) return;
  
  // Update order summary
  const orderItems = checkoutForm.querySelector('.order-items');
  const orderTotal = checkoutForm.querySelector('.order-total-value');
  
  if (orderItems) {
    orderItems.innerHTML = `
      <div class="order-item">
        <span>${product.name} (${product.selectedSize})</span>
        <span>Rp ${formatPrice(product.price)}</span>
      </div>
    `;
  }
  
  if (orderTotal) {
    orderTotal.textContent = `Rp ${formatPrice(product.price)}`;
  }
  
  // Store current product for form submission
  checkoutForm.dataset.productId = product.id;
  checkoutForm.dataset.selectedSize = product.selectedSize;
  checkoutForm.dataset.productPrice = product.price;
  checkoutForm.dataset.productName = product.name;
  
  // Render payment options
  renderPaymentOptions();
  
  // Form submission
  checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}

function renderPaymentOptions() {
  const paymentContainer = document.getElementById('paymentOptions');
  if (!paymentContainer) return;
  
  // Always get fresh data from localStorage to reflect admin updates
  const currentStoreData = getStoreData();
  const { banks, eWallets, qrCode } = currentStoreData.paymentSettings;
  
  let paymentHTML = '';
  
  // Transfer Bank Option
  if (banks && banks.length > 0) {
    paymentHTML += `
      <div class="payment-option" data-payment="bank">
        <div class="payment-option-header">
          <input type="radio" name="payment" value="bank" id="paymentBank">
          <label for="paymentBank">Transfer Bank</label>
        </div>
        <div class="payment-details">
          <div class="bank-list">
            ${banks.map(bank => `
              <div class="bank-item">
                <span>${bank.name}</span>
                <span>${bank.accountNumber} (${bank.accountName})</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  // E-Wallet Option
  if (eWallets && eWallets.length > 0) {
    paymentHTML += `
      <div class="payment-option" data-payment="ewallet">
        <div class="payment-option-header">
          <input type="radio" name="payment" value="ewallet" id="paymentEwallet">
          <label for="paymentEwallet">E-Wallet</label>
        </div>
        <div class="payment-details">
          <div class="wallet-list">
            ${eWallets.map(wallet => `
              <div class="wallet-item">
                <span>${wallet.name}</span>
                <span>${wallet.number}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  
  // QR Code Option
  if (qrCode) {
    paymentHTML += `
      <div class="payment-option" data-payment="qrcode">
        <div class="payment-option-header">
          <input type="radio" name="payment" value="qrcode" id="paymentQR">
          <label for="paymentQR">QR Code</label>
        </div>
        <div class="payment-details">
          <div class="qr-code-container">
            <img src="${qrCode}" alt="QR Code Pembayaran">
            <p>Scan QR Code untuk pembayaran</p>
          </div>
        </div>
      </div>
    `;
  }
  
  paymentContainer.innerHTML = paymentHTML;
  
  // Payment option click handlers
  paymentContainer.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
      
      paymentContainer.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Get form values
  const buyerName = formData.get('buyerName');
  const buyerPhone = formData.get('buyerPhone');
  const buyerAddress = formData.get('buyerAddress');
  const courier = formData.get('courier');
  const payment = formData.get('payment');
  
  // Validation
  if (!buyerName || !buyerPhone || !buyerAddress || !courier || !payment) {
    showToast('Mohon lengkapi semua data dengan benar', 'error');
    return;
  }
  
  // Get product info
  const productName = form.dataset.productName;
  const productSize = form.dataset.selectedSize;
  const productPrice = form.dataset.productPrice;
  const whatsappNumber = storeData.paymentSettings.whatsappNumber;
  
  // Build WhatsApp message
  const message = `*PESANAN BARU - LUXE FASHION*

━━━━━━━━━━━━━━━━━━━━━━━━━

*Data Pembeli:*
• Nama: ${buyerName}
• No. WhatsApp: ${buyerPhone}
• Alamat: ${buyerAddress}

*Detail Pesanan:*
• Produk: ${productName}
• Ukuran: ${productSize}
• Harga: Rp ${formatPrice(parseInt(productPrice))}

*Pengiriman:*
• Kurir: ${courier}

*Pembayaran:*
• Metode: ${payment === 'bank' ? 'Transfer Bank' : payment === 'ewallet' ? 'E-Wallet' : 'QR Code'}

━━━━━━━━━━━━━━━━━━━━━━━━━

Terima kasih telah berbelanja di LUXE FASHION!`;
  
  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
  
  showToast('Pesanan berhasil! Anda akan diarahkan ke WhatsApp.', 'success');
  
  // Reset form
  form.reset();
  setTimeout(() => {
    showHome();
  }, 2000);
}

// ============================================
// ABOUT US
// ============================================

function renderAboutPage() {
  const aboutContainer = document.querySelector('.about-container');
  if (!aboutContainer) return;
  
  const { logo, description, vision, mission, contact } = storeData.aboutUs;
  
  aboutContainer.innerHTML = `
    <div class="about-header">
      <h1 class="about-logo">${logo}</h1>
      <p class="section-subtitle">Selamat Datang di ${storeData.aboutUs.brandName}</p>
    </div>
    
    <div class="about-content">
      <div class="about-card">
        <h3>Tentang Kami</h3>
        <p>${description}</p>
      </div>
      
      <div class="about-card">
        <h3>Visi Kami</h3>
        <p>${vision}</p>
      </div>
      
      <div class="about-card">
        <h3>Misi Kami</h3>
        <p>${mission}</p>
      </div>
      
      <div class="about-card">
        <h3>Hubungi Kami</h3>
        <p>
          📧 Email: ${contact.email}<br>
          📞 Telepon: ${contact.phone}<br>
          📍 Alamat: ${contact.address}
        </p>
      </div>
    </div>
  `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showToast(message, type = 'info') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Scroll to top
document.querySelector('.scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Render products
  renderProducts();
  
  // Handle URL hash on load
  const hash = window.location.hash;
  if (hash === '#about') {
    showAbout();
  } else if (hash === '#products') {
    showProducts();
  } else {
    showHome();
  }
});

// Export storeData for admin access
window.storeData = storeData;
window.refreshData = () => {
  storeData = getStoreData();
  renderProducts();
  renderPaymentOptions();
  renderTestimonials();
};

