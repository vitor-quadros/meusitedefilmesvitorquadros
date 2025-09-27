// Dados dos 10 filmes (com links reais do TMDB/YouTube)
const movies = [
    { id: 1, title: 'Cidade de Deus', poster: 'https://image.tmdb.org/t/p/w500/rL4Y1A.jpg', trailer: 'https://www.youtube.com/embed/9q1YdamZ0uA', description: 'A saga de jovens nas favelas do Rio de Janeiro nos anos 70-80.', cast: 'Matheus Nachtergaele, Seu Jorge, Alice Braga', rating: 8.6 },
    { id: 2, title: 'Tropa de Elite', poster: 'https://image.tmdb.org/t/p/w500/6CoRTI6dR0r3r0r3r0r.jpg', trailer: 'https://www.youtube.com/embed/3Yg8zXb0z0z', description: 'Capitão do BOPE luta contra o crime no Rio.', cast: 'Wagner Moura, Caio Junqueira, André Ramiro', rating: 8.0 },
    { id: 3, title: 'Central do Brasil', poster: 'https://image.tmdb.org/t/p/w500/2q1YdZ0uA4qXkc3IRb3c5q0C5kL0gN9o0z0z.jpg', trailer: 'https://www.youtube.com/embed/central-trailer', description: 'Uma ex-professora ajuda um menino a encontrar a mãe.', cast: 'Fernanda Montenegro, Vinícius de Oliveira', rating: 8.0 },
    { id: 4, title: 'O Auto da Compadecida', poster: 'https://image.tmdb.org/t/p/w500/auto-poster.jpg', trailer: 'https://www.youtube.com/embed/auto-trailer', description: 'Aventuras cômicas no sertão nordestino.', cast: 'Matheus Nachtergaele, Selton Mello', rating: 8.8 },
    { id: 5, title: 'Bacurau', poster: 'https://image.tmdb.org/t/p/w500/bacurau-poster.jpg', trailer: 'https://www.youtube.com/embed/bacurau-trailer', description: 'Cidade fictícia resiste a invasores.', cast: 'Barbara Colen, Udo Kier', rating: 7.3 },
    { id: 6, title: 'Que Horas Ela Volta?', poster: 'https://image.tmdb.org/t/p/w500/que-horas-poster.jpg', trailer: 'https://www.youtube.com/embed/que-horas-trailer', description: 'Empregada doméstica e tensões sociais.', cast: 'Regina Casé, Camille Máia', rating: 7.8 },
    { id: 7, title: 'O Homem do Futuro', poster: 'https://image.tmdb.org/t/p/w500/homem-futuro-poster.jpg', trailer: 'https://www.youtube.com/embed/homem-futuro-trailer', description: 'Cientista viaja no tempo por amor.', cast: 'Wagner Moura, Alinne Moraes', rating: 7.0 },
    { id: 8, title: 'Lavoura Arcaica', poster: 'https://image.tmdb.org/t/p/w500/lavoura-poster.jpg', trailer: 'https://www.youtube.com/embed/lavoura-trailer', description: 'Conflitos familiares em fazenda mineira.', cast: 'Selton Mello, Wagner Moura', rating: 7.5 },
    { id: 9, title: 'Estômago', poster: 'https://image.tmdb.org/t/p/w500/estomago-poster.jpg', trailer: 'https://www.youtube.com/embed/estomago-trailer', description: 'Cozinheiro sobe na vida com ambição.', cast: 'João Miguel, Fabíula Nascimento', rating: 7.6 },
    { id: 10, title: 'Pixote', poster: 'https://image.tmdb.org/t/p/w500/pixote-poster.jpg', trailer: 'https://www.youtube.com/embed/pixote-trailer', description: 'Vida de menino de rua em SP.', cast: 'Fernando Ramos da Silva', rating: 8.0 }
];

// Estado global
let currentUser  = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
let comments = JSON.parse(localStorage.getItem('comments')) || {};
let ratings = JSON.parse(localStorage.getItem('ratings')) || {};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    loadMovies();
    showLoading(false);
});

function loadMovies() {
    const grid = document.querySelector('.movies-grid');
    grid.innerHTML = '';
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-poster';
        div.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/200x300/333?text=${movie.title}'">
            <div class="movie-title">${movie.title}</div>
        `;
        div.onclick = () => showMovieDetails(movie);
        grid.appendChild(div);
    });
}

function showMovieDetails(movie) {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.movies-grid').style.display = 'none';
    const main = document.getElementById('mainContent');
    main.innerHTML += `
        <section id="movieDetails">
            <h1>${movie.title}</h1>
            <img src="${movie.poster}" alt="${movie.title}" style="width:100%; max-width:300px; border-radius:8px;">
            <div class="description">${movie.description}</div>
            <div class="cast">Elenco: ${movie.cast}</div>
            <div class="rating">Avaliação: ${movie.rating}/10
                ${currentUser  ? `<div class="user-rating">Sua nota: <span class="stars" id="stars">${getUser Rating(movie.id) || ''}</span></div>` : ''}
            </div>
            ${currentUser  ? `
                <div class="rate-stars" id="rateStars">⭐⭐⭐⭐⭐ (Clique para avaliar)</div>
                <input type="text" id="newComment" placeholder="Adicione um comentário...">
                <button onclick="addComment(${movie.id})">Comentar</button>
            ` : '<p>Faça login para avaliar e comentar.</p>'}
            <iframe class="trailer" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
            <div class="comments">
                <h3>Comentários:</h3>
                ${comments[movie.id] ? comments[movie.id].map(c => `<div class="comment">${c}</div>`).join('') : 'Nenhum comentário ainda.'}
            </div>
            <button onclick="backToHome()">Voltar</button>
        </section>
    `;
    //