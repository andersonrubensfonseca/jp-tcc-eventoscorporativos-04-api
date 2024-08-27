document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtém usuários armazenados
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário já existe
    if (users.find(user => user.username === username)) {
        alert('Usuário já existe');
        return;
    }

    // Adiciona novo usuário
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuário registrado com sucesso!');
    window.location.href = 'login.html'; // Redireciona para a página de login
});