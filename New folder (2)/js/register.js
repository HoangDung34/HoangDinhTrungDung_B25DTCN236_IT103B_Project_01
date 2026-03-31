let loginform = document.getElementById(`login-form`)
loginform.addEventListener(`submit`, (e) => {
    e.preventDefault()
    window.location.href = 'dashboard.html'
})
