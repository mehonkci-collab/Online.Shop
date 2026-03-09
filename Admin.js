/**
 * Fashion E-Commerce - Admin JavaScript
 * Admin panel functionality
 */

// ============================================
// DATA MANAGEMENT
// ============================================

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Get store data from localStorage
const getStoreData = () => {
  const data = localStorage.getItem('fashionStoreData');
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

// Save store data to localStorage
const saveStoreData = (data) => {
  localStorage.setItem('fashionStoreData', JSON.stringify(data));
  // Refresh main page data
  if (window.refreshData) {
    window.refreshData();
  }
};

// Check if admin is logged in
const isAdminLoggedIn = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

// ============================================
// DOM ELEMENTS
// ============================================

const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const navBtns = document.querySelectorAll('.admin-nav-btn');
const adminSections = document.querySelectorAll('.admin-section');

// ============================================
// AUTHENTICATION
// ============================================

function checkAuth() {
  if (isAdminLoggedIn()) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  if (adminLogin) adminLogin.style.display = 'flex';
  if (adminDashboard) adminDashboard.classList.remove('active');
}

function showDashboard() {
  if (adminLogin) adminLogin.style.display = 'none';
  if (adminDashboard) adminDashboard.classList.add('active');
  renderAllAdminSections();
}

function login(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
    showToast('Login berhasil!', 'success');
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem('adminLoggedIn');
  showLogin();
  showToast('Anda telah logout', 'info');
}

// ============================================
// NAVIGATION
// ============================================

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    
    // Update active button
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show target section
    adminSections.forEach(section => {
      if (section.id === target) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});

// ============================================
// PRODUCT MANAGEMENT
// ============================================

let editingProductId = null;
let productImages = [];

// Render products table
function renderProductsTable() {
  const tableBody = document.getElementById('productsTableBody');
  if (!tableBody) return;
  
  const storeData = getStoreData();
  if (!storeData) return;
  
  const products = storeData.products || [];
  
  if (products.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">Belum ada produk</td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = products.map(product => `
    <tr>
      <td>${product.id}</td>
      <td>
        <img src="${product.images[0]}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
      </td>
      <td>${product.name}</td>
      <td>Rp ${formatPrice(product.price)}</td>
      <td>${product.sizes.join(', ')}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn-delete" onclick="deleteProduct(${product.id})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Initialize product form when dashboard loads
function initProductForm() {
  const saveBtn = document.getElementById('saveProductBtn');
  const cancelBtn = document.getElementById('cancelEditBtn');
  const imageInput = document.getElementById('productImages');
  const imageUploadArea = document.getElementById('imageUploadArea');
  
  // Reset form state
  resetProductForm();
  
  // Set up image upload handler
  if (imageUploadArea && imageInput) {
    imageUploadArea.addEventListener('click', () => {
      imageInput.click();
    });
    
    imageInput.addEventListener('change', handleImageUpload);
  }
  
  // Set up save button handler
  if (saveBtn) {
    saveBtn.onclick = saveProduct;
  }
  
  // Set up cancel button handler
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      resetProductForm();
      showToast('Edit dibatalkan', 'info');
    };
  }
  
  // Initialize size checkboxes
  document.querySelectorAll('input[name="sizes"]').forEach(cb => {
    cb.checked = false;
  });
}

function resetProductForm() {
  editingProductId = null;
  productImages = [];
  
  // Clear form fields
  const nameInput = document.getElementById('productName');
  const priceInput = document.getElementById('productPrice');
  const descInput = document.getElementById('productDescription');
  const badgeInput = document.getElementById('productBadge');
  
  if (nameInput) nameInput.value = '';
  if (priceInput) priceInput.value = '';
  if (descInput) descInput.value = '';
  if (badgeInput) badgeInput.value = '';
  
  // Clear sizes
  document.querySelectorAll('input[name="sizes"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Clear image preview
  const previewGrid = document.getElementById('imagePreview');
  if (previewGrid) previewGrid.innerHTML = '';
  
  // Reset form title and cancel button
  const formTitle = document.getElementById('formTitle');
  const cancelBtn = document.getElementById('cancelEditBtn');
  
  if (formTitle) formTitle.textContent = 'Tambah Produk Baru';
  if (cancelBtn) cancelBtn.style.display = 'none';
}

function handleImageUpload(e) {
  const files = e.target.files;
  const previewGrid = document.getElementById('imagePreview');
  if (!previewGrid) return;
  
  Array.from(files).forEach(file => {
    if (productImages.length >= 5) {
      showToast('Maksimal 5 foto per produk', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      productImages.push(event.target.result);
      renderImagePreview();
    };
    reader.readAsDataURL(file);
  });
  
  // Reset input
  e.target.value = '';
}

function renderImagePreview() {
  const previewGrid = document.getElementById('imagePreview');
  if (!previewGrid) return;
  
  previewGrid.innerHTML = productImages.map((img, index) => `
    <div class="image-preview-item">
      <img src="${img}" alt="Preview ${index + 1}">
      <button type="button" class="remove-btn" onclick="removeImage(${index})">×</button>
    </div>
  `).join('');
}

function removeImage(index) {
  productImages.splice(index, 1);
  renderImagePreview();
}

function saveProduct() {
  const name = document.getElementById('productName')?.value;
  const price = parseInt(document.getElementById('productPrice')?.value);
  const description = document.getElementById('productDescription')?.value;
  const badge = document.getElementById('productBadge')?.value;
  const sizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map(cb => cb.value);
  
  // Validation
  if (!name || !price || !description || sizes.length === 0) {
    showToast('Mohon lengkapi semua data produk', 'error');
    return;
  }
  
  if (productImages.length === 0) {
    showToast('Mohon upload minimal 1 foto produk', 'error');
    return;
  }
  
  const storeData = getStoreData();
  if (!storeData) {
    showToast('Gagal memuat data', 'error');
    return;
  }
  
  if (editingProductId) {
    // Update existing product
    const productIndex = storeData.products.findIndex(p => p.id === editingProductId);
    if (productIndex !== -1) {
      storeData.products[productIndex] = {
        ...storeData.products[productIndex],
        name,
        price,
        description,
        badge: badge || null,
        sizes,
        images: productImages.length > 0 ? productImages : storeData.products[productIndex].images
      };
      showToast('Produk berhasil diperbarui!', 'success');
    }
  } else {
    // Add new product
    const newId = storeData.products.length > 0 
      ? Math.max(...storeData.products.map(p => p.id)) + 1 
      : 1;
    
    storeData.products.push({
      id: newId,
      name,
      price,
      description,
      badge: badge || null,
      sizes,
      images: productImages
    });
    showToast('Produk berhasil ditambahkan!', 'success');
  }
  
  saveStoreData(storeData);
  initProductForm();
  renderProductsTable();
}

window.editProduct = function(id) {
  const storeData = getStoreData();
  if (!storeData) return;
  
  const product = storeData.products.find(p => p.id === id);
  if (!product) return;
  
  editingProductId = id;
  productImages = [...product.images];
  
  // Fill form
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productBadge').value = product.badge || '';
  
  // Check sizes
  document.querySelectorAll('input[name="sizes"]').forEach(cb => {
    cb.checked = product.sizes.includes(cb.value);
  });
  
  // Render image preview
  renderImagePreview();
  
  // Update form title and show cancel button
  const formTitle = document.getElementById('formTitle');
  const cancelBtn = document.getElementById('cancelEditBtn');
  if (formTitle) formTitle.textContent = 'Edit Produk';
  if (cancelBtn) cancelBtn.style.display = 'block';
  
  showToast('Mode edit produk diaktifkan', 'info');
  
  // Scroll to form
  document.querySelector('.admin-section.active .admin-form')?.scrollIntoView({ behavior: 'smooth' });
};

window.deleteProduct = function(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
  
  const storeData = getStoreData();
  if (!storeData) return;
  
  storeData.products = storeData.products.filter(p => p.id !== id);
  saveStoreData(storeData);
  renderProductsTable();
  showToast('Produk berhasil dihapus!', 'success');
};

window.removeImage = removeImage;

// ============================================
// PAYMENT SETTINGS
// ============================================

// Bank Management
function renderBanksTable() {
  const tableBody = document.getElementById('banksTableBody');
  if (!tableBody) return;
  
  const storeData = getStoreData();
  const banks = storeData?.paymentSettings?.banks || [];
  
  if (banks.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">Belum ada rekening bank</td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = banks.map((bank, index) => `
    <tr>
      <td>${bank.name}</td>
      <td>${bank.accountNumber}</td>
      <td>${bank.accountName}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editBank(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteBank(${index})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function addBank() {
  const name = document.getElementById('bankName')?.value;
  const accountNumber = document.getElementById('bankAccountNumber')?.value;
  const accountName = document.getElementById('bankAccountName')?.value;
  
  if (!name || !accountNumber || !accountName) {
    showToast('Mohon lengkapi data rekening', 'error');
    return;
  }
  
  const storeData = getStoreData();
  if (!storeData.paymentSettings) {
    storeData.paymentSettings = {};
  }
  if (!storeData.paymentSettings.banks) {
    storeData.paymentSettings.banks = [];
  }
  
  storeData.paymentSettings.banks.push({ name, accountNumber, accountName });
  saveStoreData(storeData);
  
  // Reset form
  document.getElementById('bankName').value = '';
  document.getElementById('bankAccountNumber').value = '';
  document.getElementById('bankAccountName').value = '';
  
  renderBanksTable();
  showToast('Rekening bank berhasil ditambahkan!', 'success');
}

window.editBank = function(index) {
  const storeData = getStoreData();
  const bank = storeData?.paymentSettings?.banks[index];
  if (!bank) return;
  
  document.getElementById('bankName').value = bank.name;
  document.getElementById('bankAccountNumber').value = bank.accountNumber;
  document.getElementById('bankAccountName').value = bank.accountName;
  
  // Change button to update
  const btn = document.querySelector('#bankForm button');
  btn.textContent = 'Update Rekening';
  btn.onclick = () => {
    storeData.paymentSettings.banks[index] = {
      name: document.getElementById('bankName').value,
      accountNumber: document.getElementById('bankAccountNumber').value,
      accountName: document.getElementById('bankAccountName').value
    };
    saveStoreData(storeData);
    renderBanksTable();
    btn.textContent = 'Tambah Rekening';
    btn.onclick = addBank;
    showToast('Rekening bank berhasil diperbarui!', 'success');
  };
};

window.deleteBank = function(index) {
  if (!confirm('Hapus rekening bank ini?')) return;
  
  const storeData = getStoreData();
  storeData.paymentSettings.banks.splice(index, 1);
  saveStoreData(storeData);
  renderBanksTable();
  showToast('Rekening bank dihapus!', 'success');
};

// E-Wallet Management
function renderEWalletsTable() {
  const tableBody = document.getElementById('walletsTableBody');
  if (!tableBody) return;
  
  const storeData = getStoreData();
  const wallets = storeData?.paymentSettings?.eWallets || [];
  
  if (wallets.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center">Belum ada E-Wallet</td>
      </tr>
    `;
    return;
  }
  
  tableBody.innerHTML = wallets.map((wallet, index) => `
    <tr>
      <td>${wallet.name}</td>
      <td>${wallet.number}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editWallet(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteWallet(${index})">Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function addWallet() {
  const name = document.getElementById('walletName')?.value;
  const number = document.getElementById('walletNumber')?.value;
  
  if (!name || !number) {
    showToast('Mohon lengkapi data E-Wallet', 'error');
    return;
  }
  
  const storeData = getStoreData();
  if (!storeData.paymentSettings) {
    storeData.paymentSettings = {};
  }
  if (!storeData.paymentSettings.eWallets) {
    storeData.paymentSettings.eWallets = [];
  }
  
  storeData.paymentSettings.eWallets.push({ name, number });
  saveStoreData(storeData);
  
  // Reset form
  document.getElementById('walletName').value = '';
  document.getElementById('walletNumber').value = '';
  
  renderEWalletsTable();
  showToast('E-Wallet berhasil ditambahkan!', 'success');
}

window.editWallet = function(index) {
  const storeData = getStoreData();
  const wallet = storeData?.paymentSettings?.eWallets[index];
  if (!wallet) return;
  
  document.getElementById('walletName').value = wallet.name;
  document.getElementById('walletNumber').value = wallet.number;
  
  // Change button to update
  const btn = document.querySelector('#walletForm button');
  btn.textContent = 'Update E-Wallet';
  btn.onclick = () => {
    storeData.paymentSettings.eWallets[index] = {
      name: document.getElementById('walletName').value,
      number: document.getElementById('walletNumber').value
    };
    saveStoreData(storeData);
    renderEWalletsTable();
    btn.textContent = 'Tambah E-Wallet';
    btn.onclick = addWallet;
    showToast('E-Wallet berhasil diperbarui!', 'success');
  };
};

window.deleteWallet = function(index) {
  if (!confirm('Hapus E-Wallet ini?')) return;
  
  const storeData = getStoreData();
  storeData.paymentSettings.eWallets.splice(index, 1);
  saveStoreData(storeData);
  renderEWalletsTable();
  showToast('E-Wallet dihapus!', 'success');
};

// QR Code Management
function handleQRCodeUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const storeData = getStoreData();
    if (!storeData.paymentSettings) {
      storeData.paymentSettings = {};
    }
    storeData.paymentSettings.qrCode = event.target.result;
    saveStoreData(storeData);
    
    // Show preview
    const preview = document.getElementById('qrCodePreview');
    if (preview) {
      preview.innerHTML = `<img src="${event.target.result}" alt="QR Code" style="max-width: 200px; border-radius: 4px;">`;
    }
    
    showToast('QR Code berhasil diupload!', 'success');
  };
  reader.readAsDataURL(file);
  
  // Reset input
  e.target.value = '';
}

// WhatsApp Number Management
function saveWhatsAppNumber() {
  const number = document.getElementById('whatsappNumber')?.value;
  
  if (!number) {
    showToast('Mohon masukkan nomor WhatsApp', 'error');
    return;
  }
  
  const storeData = getStoreData();
  if (!storeData.paymentSettings) {
    storeData.paymentSettings = {};
  }
  storeData.paymentSettings.whatsappNumber = number.replace(/[^0-9]/g, '');
  saveStoreData(storeData);
  
  showToast('Nomor WhatsApp berhasil disimpan!', 'success');
}

// ============================================
// ABOUT US MANAGEMENT
// ============================================

function renderAboutForm() {
  const storeData = getStoreData();
  if (!storeData?.aboutUs) return;
  
  const { brandName, description, vision, mission, contact } = storeData.aboutUs;
  
  document.getElementById('aboutBrandName').value = brandName || '';
  document.getElementById('aboutDescription').value = description || '';
  document.getElementById('aboutVision').value = vision || '';
  document.getElementById('aboutMission').value = mission || '';
  document.getElementById('aboutEmail').value = contact?.email || '';
  document.getElementById('aboutPhone').value = contact?.phone || '';
  document.getElementById('aboutAddress').value = contact?.address || '';
}

function saveAboutInfo() {
  const brandName = document.getElementById('aboutBrandName')?.value;
  const description = document.getElementById('aboutDescription')?.value;
  const vision = document.getElementById('aboutVision')?.value;
  const mission = document.getElementById('aboutMission')?.value;
  const email = document.getElementById('aboutEmail')?.value;
  const phone = document.getElementById('aboutPhone')?.value;
  const address = document.getElementById('aboutAddress')?.value;
  
  if (!brandName || !description) {
    showToast('Mohon lengkapi data tentang kami', 'error');
    return;
  }
  
  const storeData = getStoreData();
  storeData.aboutUs = {
    logo: brandName.toUpperCase().replace(/\s/g, '') + '<span>FASHION</span>',
    brandName,
    description,
    vision,
    mission,
    contact: {
      email,
      phone,
      address
    }
  };
  
  saveStoreData(storeData);
  showToast('Informasi tentang kami berhasil disimpan!', 'success');
}

// ============================================
// INITIALIZATION
// ============================================

// ============================================
// TESTIMONIALS MANAGEMENT
// ============================================

let editingTestimonialId = null;
let testimonialImage = null;
let testimonialProductImage = null;

function renderTestimonialsTable() {
  const tableBody = document.getElementById('testimonialsTableBody');
  if (!tableBody) return;
  
  const storeData = getStoreData();
  const testimonials = storeData?.testimonials || [];
  
  if (testimonials.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada testimoni</td></tr>';
    return;
  }
  
  tableBody.innerHTML = testimonials.map(t => {
    // Generate initials from name
    const initials = t.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
    return `
    <tr>
      <td>${t.id}</td>
      <td><div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg, #C9A962, #B8974F);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:16px;">${initials}</div></td>
      <td>${t.name}</td>
      <td>${Array(5).fill(0).map((_,i) => '<span style="color:' + (i < t.rating ? '#C9A962' : '#ddd') + '">★</span>').join('')}</td>
      <td>${t.comment.substring(0,50)}${t.comment.length > 50 ? '...' : ''}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editTestimonial(${t.id})">Edit</button>
          <button class="btn-delete" onclick="deleteTestimonial(${t.id})">Hapus</button>
        </div>
      </td>
    </tr>
  `}).join('');
}

function initTestimonialForm() {
  const nameInput = document.getElementById('testimonialName');
  const ratingSelect = document.getElementById('testimonialRating');
  const commentInput = document.getElementById('testimonialComment');
  const productImageInput = document.getElementById('testimonialProductImage');
  const saveBtn = document.getElementById('saveTestimonialBtn');
  const cancelBtn = document.getElementById('cancelTestimonialEditBtn');
  const formTitle = document.getElementById('testimonialFormTitle');
  
  // Reset form to add mode
  editingTestimonialId = null;
  testimonialImage = null;
  testimonialProductImage = null;
  
  // Clear input fields
  if (nameInput) nameInput.value = '';
  if (ratingSelect) ratingSelect.value = '5';
  if (commentInput) commentInput.value = '';
  
  // Clear image previews - hide customer photo preview, keep product photo
  const imagePreview = document.getElementById('testimonialImagePreview');
  const productImagePreview = document.getElementById('testimonialProductImagePreview');
  if (imagePreview) imagePreview.innerHTML = '';
  if (productImagePreview) productImagePreview.innerHTML = '';
  
  // Hide customer photo upload section entirely
  const customerPhotoSection = imagePreview?.closest('.form-group');
  if (customerPhotoSection) {
    customerPhotoSection.style.display = 'none';
  }
  
  // Reset form title and buttons
  if (formTitle) formTitle.textContent = 'Tambah Testimoni Baru';
  if (cancelBtn) cancelBtn.style.display = 'none';
  if (saveBtn) saveBtn.textContent = 'Simpan Testimoni';
  
  // Set up product photo upload only (not customer photo)
  if (productImageInput) {
    productImageInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran file maksimal 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (ev) => {
        testimonialProductImage = ev.target.result;
        const preview = document.getElementById('testimonialProductImagePreview');
        if (preview) {
          preview.innerHTML = `<img src="${ev.target.result}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;">`;
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    };
  }
  
  // Set up save button
  if (saveBtn) {
    saveBtn.onclick = saveTestimonial;
  }
  
  // Set up cancel button
  if (cancelBtn) {
    cancelBtn.onclick = () => {
      resetTestimonialForm();
      showToast('Edit dibatalkan', 'info');
    };
  }
}

function resetTestimonialForm() {
  const nameInput = document.getElementById('testimonialName');
  const ratingSelect = document.getElementById('testimonialRating');
  const commentInput = document.getElementById('testimonialComment');
  const formTitle = document.getElementById('testimonialFormTitle');
  const cancelBtn = document.getElementById('cancelTestimonialEditBtn');
  const saveBtn = document.getElementById('saveTestimonialBtn');
  
  editingTestimonialId = null;
  testimonialImage = null;
  testimonialProductImage = null;
  
  // Clear input fields
  if (nameInput) nameInput.value = '';
  if (ratingSelect) ratingSelect.value = '5';
  if (commentInput) commentInput.value = '';
  
  // Clear image previews
  document.getElementById('testimonialImagePreview').innerHTML = '';
  document.getElementById('testimonialProductImagePreview').innerHTML = '';
  
  // Hide customer photo upload section
  const imagePreview = document.getElementById('testimonialImagePreview');
  const customerPhotoSection = imagePreview?.closest('.form-group');
  if (customerPhotoSection) {
    customerPhotoSection.style.display = 'none';
  }
  
  // Reset form title and buttons
  if (formTitle) formTitle.textContent = 'Tambah Testimoni Baru';
  if (cancelBtn) cancelBtn.style.display = 'none';
  if (saveBtn) saveBtn.textContent = 'Simpan Testimoni';
}

function saveTestimonial() {
  const name = document.getElementById('testimonialName')?.value;
  const rating = parseInt(document.getElementById('testimonialRating')?.value);
  const comment = document.getElementById('testimonialComment')?.value;
  
  // Validation
  if (!name || !comment) {
    showToast('Mohon lengkapi nama dan komentar testimoni', 'error');
    return;
  }
  
  const storeData = getStoreData();
  if (!storeData) {
    showToast('Gagal memuat data', 'error');
    return;
  }
  
  // Initialize testimonials array if not exists
  if (!storeData.testimonials) {
    storeData.testimonials = [];
  }
  
  if (editingTestimonialId) {
    // Update existing testimonial
    const idx = storeData.testimonials.findIndex(t => t.id === editingTestimonialId);
    if (idx !== -1) {
      storeData.testimonials[idx] = {
        ...storeData.testimonials[idx],
        name,
        rating,
        comment,
        image: testimonialImage || storeData.testimonials[idx].image,
        productImage: testimonialProductImage || storeData.testimonials[idx].productImage
      };
      showToast('Testimoni berhasil diperbarui!', 'success');
    }
  } else {
    // Add new testimonial
    const newId = storeData.testimonials.length > 0 
      ? Math.max(...storeData.testimonials.map(t => t.id)) + 1 
      : 1;
    
    storeData.testimonials.push({
      id: newId,
      name,
      rating,
      comment,
      image: testimonialImage || 'https://via.placeholder.com/150?text=User',
      productImage: testimonialProductImage || null
    });
    showToast('Testimoni berhasil ditambahkan!', 'success');
  }
  
  saveStoreData(storeData);
  initTestimonialForm();
  renderTestimonialsTable();
}

window.editTestimonial = function(id) {
  const storeData = getStoreData();
  const t = storeData?.testimonials?.find(x => x.id === id);
  if (!t) return;
  
  editingTestimonialId = id;
  testimonialImage = t.image;
  testimonialProductImage = t.productImage;
  
  // Fill form fields
  document.getElementById('testimonialName').value = t.name;
  document.getElementById('testimonialRating').value = t.rating;
  document.getElementById('testimonialComment').value = t.comment;
  
  // Show existing product image in preview (customer photo is hidden)
  if (t.productImage) {
    document.getElementById('testimonialProductImagePreview').innerHTML = '<img src="' + t.productImage + '" style="width:80px;height:80px;object-fit:cover;border-radius:4px;">';
  }
  
  // Hide customer photo upload section
  const imagePreview = document.getElementById('testimonialImagePreview');
  const customerPhotoSection = imagePreview?.closest('.form-group');
  if (customerPhotoSection) {
    customerPhotoSection.style.display = 'none';
  }
  
  // Update form title and show cancel button for edit mode
  const formTitle = document.getElementById('testimonialFormTitle');
  const cancelBtn = document.getElementById('cancelTestimonialEditBtn');
  const saveBtn = document.getElementById('saveTestimonialBtn');
  
  if (formTitle) formTitle.textContent = 'Edit Testimoni';
  if (cancelBtn) cancelBtn.style.display = 'block';
  if (saveBtn) saveBtn.textContent = 'Perbarui Testimoni';
  
  showToast('Mode edit testimoni diaktifkan', 'info');
  
  // Scroll to form
  document.querySelector('.admin-section.active .admin-form')?.scrollIntoView({ behavior: 'smooth' });
};

window.deleteTestimonial = function(id) {
  if (!confirm('Hapus testimoni ini?')) return;
  const storeData = getStoreData();
  storeData.testimonials = storeData.testimonials.filter(t => t.id !== id);
  saveStoreData(storeData);
  renderTestimonialsTable();
  showToast('Testimoni dihapus!', 'success');
};

function renderAllAdminSections() {
  renderProductsTable();
  initProductForm();
  renderBanksTable();
  renderEWalletsTable();
  renderAboutForm();
  renderTestimonialsTable();
  initTestimonialForm();
  
  // Hide customer photo upload section in testimonial form
  const imagePreview = document.getElementById('testimonialImagePreview');
  const customerPhotoSection = imagePreview?.closest('.form-group');
  if (customerPhotoSection) {
    customerPhotoSection.style.display = 'none';
  }
  
  // QR Code preview
  const storeData = getStoreData();
  const qrCode = storeData?.paymentSettings?.qrCode;
  const preview = document.getElementById('qrCodePreview');
  if (preview && qrCode) {
    preview.innerHTML = `<img src="${qrCode}" alt="QR Code" style="max-width: 200px; border-radius: 4px;">`;
  }
  
  // WhatsApp number
  const waNumber = storeData?.paymentSettings?.whatsappNumber;
  if (waNumber && document.getElementById('whatsappNumber')) {
    document.getElementById('whatsappNumber').value = waNumber;
  }
}

// Login form handler
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!login(username, password)) {
      showToast('Username atau password salah!', 'error');
    }
  });
}

// QR Code upload handler
document.getElementById('qrCodeUpload')?.addEventListener('change', handleQRCodeUpload);

// WhatsApp save handler
document.getElementById('saveWhatsAppBtn')?.addEventListener('click', saveWhatsAppNumber);

// About us save handler
document.getElementById('saveAboutBtn')?.addEventListener('click', saveAboutInfo);

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', logout);

// Check authentication on load
document.addEventListener('DOMContentLoaded', checkAuth);

// Utility functions
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
