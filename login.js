document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtém usuários armazenados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica credenciais
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redireciona para a página principal
    } else {
        alert('Credenciais inválidas');
    }
});