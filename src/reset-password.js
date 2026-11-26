
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

      <h1>Reset Password</h1>
      <p class="admin-description">Create your new admin password.</p>

      <form id="resetPasswordForm">
        <label for="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          minlength="8"
          required
        />

        <label for="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          minlength="8"
          required
        />

        <button type="submit">UPDATE PASSWORD</button>
        <p id="resetMessage"></p>
      </form>
    </div>
  </main>
`;

const form = document.querySelector('#resetPasswordForm');
const message = document.querySelector('#resetMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const password = document.querySelector('#newPassword').value;
  const confirm = document.querySelector('#confirmPassword').value;

  if (password !== confirm) {
    message.textContent = 'Passwords do not match.';
    return;
  }

  message.textContent = 'Updating password...';

  const { error } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  message.textContent = 'Password updated successfully!';
});
