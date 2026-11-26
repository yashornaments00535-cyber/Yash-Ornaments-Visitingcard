
import { supabase } from './supabase.js';

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
    message.textContent = 'Login failed. Please check your details.';
    return;
  }

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
     message.textContent = 'Login successful!';
});
