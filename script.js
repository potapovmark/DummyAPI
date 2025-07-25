const btn = document.getElementById('btn1')
const nameInput = document.getElementById('name')
const passwordInput = document.getElementById('password')
const form = document.getElementById('login-form')
const errorMessage = document.getElementById('error-message')
const userInfo = document.getElementById('user-info')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  errorMessage.textContent = ''
  userInfo.style.display = 'none'
  userInfo.innerHTML = ''

  const username = nameInput.value.trim()
  const password = passwordInput.value

  if (!username || !password) {
    errorMessage.textContent = 'Пожалуйста, заполните все поля.'
    return
  }

  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(
        data.message === 'Invalid credentials'
          ? 'Неверное имя пользователя или пароль.'
          : data.message || 'Ошибка авторизации'
      )
    }

    userInfo.innerHTML = `
      <h2>Информация о пользователе</h2>
      <p><b>Имя:</b> ${data.firstName} ${data.lastName}</p>
      <p><b>Почта:</b> ${data.email}</p>
      <p><b>Имя пользователя:</b> ${data.username}</p>
      <img src="${data.image}" alt="Фото пользователя" style="max-width:100px; border-radius:8px; margin-top:10px;" />
    `
    userInfo.style.display = 'block'
  } catch (err) {
    errorMessage.textContent = err.message || 'Ошибка авторизации'
  }
})
