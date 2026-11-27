
import { supabase } from './supabase.js';
import './style.css';

const app = document.querySelector('#app');

document.body.classList.add('admin-page');

app.innerHTML = `
  <main class="admin-login">
    <div class="admin-login-card">
      <div class="admin-brand">YASH ORNAMENTS</div>
      <p class="admin-tagline">DEFINING MODERN LUXURY</p>

      <div class="admin-divider"></div>

      <h1>Admin Login</h1>
      <p class="admin-description">Welcome back. Please sign in.</p>

      <form id="adminLoginForm">
        <label for="adminEmail">Email Address</label>
        <input
          id="adminEmail"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label for="adminPassword">Password</label>
        <input
          id="adminPassword"
          type="password"
          placeholder="Enter your password"
          required
        />

        <button type="submit">SECURE LOGIN</button>
        <p id="adminMessage"></p>
      </form>
    </div>
  </main>
`;

const form = document.querySelector('#adminLoginForm');
const message = document.querySelector('#adminMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  message.textContent = 'Checking login...';

  const email = document.querySelector('#adminEmail').value.trim();
  const password = document.querySelector('#adminPassword').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
     message.textContent = error.message;
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', data.user.id)
    .maybeSingle();

if (adminError || !admin) {
  await supabase.auth.signOut();
  message.textContent = 'You are not authorised as admin.';
  return;
}

message.textContent = 'Login successful!';

app.innerHTML = `
  <div class="admin-dashboard">

    <aside class="admin-sidebar">
      <div class="admin-sidebar-brand">YASH ORNAMENTS</div>
      <div class="admin-sidebar-tagline">DEFINING MODERN LUXURY</div>

      <nav class="admin-nav">
        <button class="active" data-section="overview">⌂ &nbsp; Overview</button>
        <button data-section="gallery">▧ &nbsp; Gallery Manager</button>
        <button data-section="products">◇ &nbsp; Products</button>
        <button data-section="contacts">♧ &nbsp; Contacts</button>
        <button data-section="settings">⚙ &nbsp; Website Settings</button>
      </nav>
    </aside>

    <main class="admin-main">

      <header class="admin-topbar">
        <div>
          <h1>Dashboard Overview</h1>
          <p class="admin-welcome">Welcome to your Yash Ornaments control panel.</p>
        </div>
        <button class="admin-logout" id="logoutButton">LOG OUT</button>
      </header>

     <section class="admin-content-card" id="adminSectionContent">
  <h2>Welcome to Admin Panel</h2>
  <p class="admin-muted">
    Manage your jewellery gallery, products, contact information
    and website settings from one place.
  </p>
</section>
    </main>
  </div>
`;
const adminSections = {
  overview: {
    title: 'Dashboard Overview',
    heading: 'Welcome to Admin Panel',
    description: 'Manage your Yash Ornaments website from one place.'
  },
  gallery: {
    title: 'Gallery Manager',
    heading: 'Manage Gallery',
    description: 'Here you will be able to upload, view, reorder and delete gallery photos.'
  },
  products: {
    title: 'Product Manager',
    heading: 'Manage Products',
    description: 'Here you will be able to add and manage product photos, videos and details.'
  },
  contacts: {
    title: 'Contact Manager',
    heading: 'Manage Contacts',
    description: 'Here you will be able to update department names, phone numbers and WhatsApp details.'
  },
  settings: {
    title: 'Website Settings',
    heading: 'Manage Website',
    description: 'Here you will be able to update your logo, tagline and website information.'
  }
};

async function loadGalleryManager() {
  const content = document.querySelector('#adminSectionContent');

  content.innerHTML = `
    <h2>Gallery Manager</h2>
    <p class="admin-muted">Manage your jewellery collection.</p>

    <div class="gallery-admin-form">
      <label>Category</label>
      <select id="galleryCategory">
        <option value="">Loading categories...</option>
      </select>

      <label>Subcategory</label>
      <select id="gallerySubcategory">
        <option value="">Select subcategory</option>
      </select>

      <label>Select Photos</label>
      <input type="file" id="galleryFiles" accept="image/*" multiple>

      <button id="uploadGalleryButton">UPLOAD PHOTOS</button>
      <p id="galleryMessage" class="admin-muted"></p>
    </div>

<div class="gallery-bulk-actions">
  <label>
    <input type="checkbox" id="selectAllGalleryPhotos">
    Select All
  </label>

  <button id="deleteSelectedGalleryPhotos" disabled>
    DELETE SELECTED
  </button>
</div>

<div id="galleryPhotoList"></div>
<div id="galleryImagePreview" class="gallery-image-preview">
  <button id="closeGalleryPreview">✕</button>
  <img id="galleryPreviewImage" src="" alt="Large gallery preview">
</div>
  `;

  const categorySelect = document.querySelector('#galleryCategory');
  const subcategorySelect = document.querySelector('#gallerySubcategory');
  const message = document.querySelector('#galleryMessage');

  const { data: categories, error } = await supabase
    .from('gallery_categories')
    .select('id, name')
    .order('id');

  if (error) {
    message.textContent = error.message;
    return;
  }

  categorySelect.innerHTML =
    '<option value="">Select category</option>' +
    categories.map(c =>
      `<option value="${c.id}">${c.name}</option>`
    ).join('');

  categorySelect.addEventListener('change', async () => {
    const { data, error } = await supabase
      .from('gallery_subcategories')
      .select('id, name')
      .eq('category_id', categorySelect.value)
      .order('id');

    if (error) {
      message.textContent = error.message;
      return;
    }

    subcategorySelect.innerHTML =
      '<option value="">Select subcategory</option>' +
      data.map(s =>
        `<option value="${s.id}">${s.name}</option>`
      ).join('');

    await loadPhotos();
  });

  subcategorySelect.addEventListener('change', loadPhotos);

  async function loadPhotos() {
    const subcategoryId = subcategorySelect.value;
    const photoList = document.querySelector('#galleryPhotoList');

    if (!subcategoryId) {
      photoList.innerHTML = '';
      return;
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      message.textContent = error.message;
      return;
    }

    const selectAll = document.querySelector('#selectAllGalleryPhotos');
    const deleteSelected = document.querySelector('#deleteSelectedGalleryPhotos');

    selectAll.checked = false;
    deleteSelected.disabled = true;

    selectAll.onchange = () => {
      photoList.querySelectorAll('[data-select-photo]').forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });

      deleteSelected.disabled =
        !photoList.querySelector('[data-select-photo]:checked');
    };

    photoList.onchange = (event) => {
      if (!event.target.matches('[data-select-photo]')) return;

      const checkboxes = [...photoList.querySelectorAll('[data-select-photo]')];

      selectAll.checked = checkboxes.length > 0 &&
        checkboxes.every(checkbox => checkbox.checked);

      deleteSelected.disabled =
        !checkboxes.some(checkbox => checkbox.checked);
    };

    deleteSelected.onclick = async () => {
      const selectedIds = [...photoList.querySelectorAll('[data-select-photo]:checked')]
        .map(checkbox => checkbox.dataset.selectPhoto);

      if (!selectedIds.length) return;

      if (!confirm(`Delete ${selectedIds.length} selected photos?`)) return;

      deleteSelected.disabled = true;
      message.textContent = 'Deleting selected photos...';

      for (const id of selectedIds) {
        const photo = data.find(p => String(p.id) === id);
        if (!photo) continue;

        const path = decodeURIComponent(
          new URL(photo.image_url).pathname.split('/yash-gallery/')[1]
        );

        const { error: storageError } = await supabase.storage
          .from('yash-gallery')
          .remove([path]);

        if (storageError) {
          message.textContent = storageError.message;
          deleteSelected.disabled = false;
          return;
        }

        const { error: deleteError } = await supabase
          .from('gallery_items')
          .delete()
          .eq('id', id);

        if (deleteError) {
          message.textContent = deleteError.message;
          deleteSelected.disabled = false;
          return;
        }
      }

      message.textContent = 'Selected photos deleted successfully!';
      await loadPhotos();
    };

    photoList.innerHTML = data.length
      ? data.map((photo, index) => `
          <div class="gallery-admin-photo">
            <img src="${photo.image_url}" alt="Gallery photo">
            <label>
  <input type="checkbox" data-select-photo="${photo.id}">
  Select Photo
</label>

            <div class="gallery-order-controls">
              <button data-move-up="${photo.id}" ${index === 0 ? 'disabled' : ''}>↑</button>
              <button data-move-down="${photo.id}" ${index === data.length - 1 ? 'disabled' : ''}>↓</button>
            </div>

            <button data-delete-photo="${photo.id}">DELETE</button>
          </div>
        `).join('')
      : '<p class="admin-muted">No photos in this subcategory yet.</p>';

        photoList.querySelectorAll('[data-move-up], [data-move-down]').forEach(button => {
      button.addEventListener('click', async () => {
        const photoId = button.dataset.moveUp || button.dataset.moveDown;
        const index = data.findIndex(p => String(p.id) === photoId);

        if (index === -1) return;

        const newIndex = button.dataset.moveUp ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= data.length) return;

        const reordered = [...data];
        [reordered[index], reordered[newIndex]] =
          [reordered[newIndex], reordered[index]];

        message.textContent = 'Saving photo order...';

        for (let i = 0; i < reordered.length; i++) {
          const { error: orderError } = await supabase
            .from('gallery_items')
            .update({ sort_order: i })
            .eq('id', reordered[i].id);

          if (orderError) {
            message.textContent = orderError.message;
            return;
          }
        }

        message.textContent = 'Photo order updated!';
        await loadPhotos();
      });
    });
    photoList.querySelectorAll('[data-delete-photo]').forEach(button => {
      button.addEventListener('click', async () => {
        if (!confirm('Delete this photo?')) return;

        const photo = data.find(p => String(p.id) === button.dataset.deletePhoto);
        const path = decodeURIComponent(
          new URL(photo.image_url).pathname.split('/yash-gallery/')[1]
        );

        const { error: storageError } = await supabase.storage
          .from('yash-gallery')
          .remove([path]);

        if (storageError) {
          message.textContent = storageError.message;
          return;
        }

        const { error: deleteError } = await supabase
          .from('gallery_items')
          .delete()
          .eq('id', photo.id);

        if (deleteError) {
          message.textContent = deleteError.message;
          return;
        }

        message.textContent = 'Photo deleted successfully.';
        await loadPhotos();
      });
    });
    const previewBox = document.querySelector('#galleryImagePreview');
    const previewImage = document.querySelector('#galleryPreviewImage');
    const closePreview = document.querySelector('#closeGalleryPreview');

    photoList.querySelectorAll('.gallery-admin-photo img').forEach(img => {
      img.style.cursor = 'zoom-in';

      img.addEventListener('click', () => {
        previewImage.src = img.src;
        previewBox.classList.add('active');
      });
    });

    closePreview.onclick = () => {
      previewBox.classList.remove('active');
      previewImage.src = '';
    };

    previewBox.onclick = (event) => {
      if (event.target === previewBox) {
        previewBox.classList.remove('active');
        previewImage.src = '';
      }
    };
  }

  document.querySelector('#uploadGalleryButton').addEventListener('click', async () => {
    const files = document.querySelector('#galleryFiles').files;
    const category = categories.find(c => String(c.id) === categorySelect.value);
    const subcategoryId = subcategorySelect.value;
    const subcategory = subcategorySelect.selectedOptions[0]?.textContent;

    if (!category || !subcategoryId || !files.length) {
      message.textContent = 'Please select category, subcategory and photos.';
      return;
    }

    const uploadButton = document.querySelector('#uploadGalleryButton');
    uploadButton.disabled = true;
    message.textContent = 'Uploading photos...';

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
      const path = `${category.name}/${subcategory}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('yash-gallery')
        .upload(path, file);

      if (uploadError) {
        message.textContent = uploadError.message;
        uploadButton.disabled = false;
        return;
      }

      const { data: publicData } = supabase.storage
        .from('yash-gallery')
        .getPublicUrl(path);

      const { error: insertError } = await supabase
        .from('gallery_items')
.insert({
  subcategory_id: Number(subcategoryId),
  image_url: publicData.publicUrl,
  sort_order: Date.now()
});

      if (insertError) {
        message.textContent = insertError.message;
        uploadButton.disabled = false;
        return;
      }
    }

    document.querySelector('#galleryFiles').value = '';
    message.textContent = 'All photos uploaded successfully!';
    uploadButton.disabled = false;
    await loadPhotos();
  });
}

document.querySelectorAll('.admin-nav button').forEach((button) => {
  button.addEventListener('click', async () => {
    const section = adminSections[button.dataset.section];
    if (!section) return;

    document.querySelectorAll('.admin-nav button').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    document.querySelector('.admin-topbar h1').textContent = section.title;

    if (button.dataset.section === 'gallery') {
      await loadGalleryManager();
    } else {
      document.querySelector('#adminSectionContent').innerHTML = `
        <h2>${section.heading}</h2>
        <p class="admin-muted">${section.description}</p>
      `;
    }
  });
});
  document.querySelector('#logoutButton').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});
});
