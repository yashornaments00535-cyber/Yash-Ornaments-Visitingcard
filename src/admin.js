
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

      <section class="admin-stats">
        <div class="admin-stat-card">
          <span>Gallery</span>
          <h2>Manage Photos</h2>
        </div>

        <div class="admin-stat-card">
          <span>Products</span>
          <h2>Manage Items</h2>
        </div>

        <div class="admin-stat-card">
          <span>Contacts</span>
          <h2>Manage Details</h2>
        </div>

        <div class="admin-stat-card">
          <span>Website</span>
          <h2>Manage Settings</h2>
        </div>
      </section>

      <section class="admin-content-card">
        <h2>Welcome to Admin Panel</h2>
        <p class="admin-muted">
          Manage your jewellery gallery, products, contact information
          and website settings from one place.
        </p>
      </section>

      <section class="admin-content-card">
        <h2>Quick Access</h2>
        <p class="admin-muted">
          Your website management workspace is ready.
          Select a section from the sidebar to get started.
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

document.querySelectorAll('.admin-nav button').forEach((button) => {
  button.addEventListener('click', () => {
    const section = adminSections[button.dataset.section];

    if (!section) return;

    document.querySelectorAll('.admin-nav button').forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    document.querySelector('.admin-topbar h1').textContent = section.title;
    document.querySelector('.admin-content-card h2').textContent = section.heading;
    document.querySelector('.admin-content-card .admin-muted').textContent = section.description;
  });
});
document.querySelector('#logoutButton').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});
});
