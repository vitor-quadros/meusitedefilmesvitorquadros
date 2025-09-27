// Mostrar usuário logado
function updateUserUI() {
  const user = localStorage.getItem("cineUser");
  const loginLink = document.getElementById("login-link");
  const userInfo = document.getElementById("user-info");
  if (user && userInfo) {
    loginLink.style.display = "none";
    userInfo.innerText = "Olá, " + user + " | Sair";
    userInfo.style.cursor = "pointer";
    userInfo.onclick = () => { localStorage.removeItem("cineUser"); location.reload(); };
  }
}

// Login simples
function login() {
  const username = document.getElementById("username").value;
  if (username.trim() !== "") {
    localStorage.setItem("cineUser", username);
    window.location.href = "index.html";
  }
}

// Renderizar filmes na home
if (document.getElementById("movie-list")) {
  const movieList = document.getElementById("movie-list");
  movies.forEach(m => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `<img src="${m.poster}" alt="${m.title}"><h3>${m.title}</h3>`;
    div.onclick = () => { window.location.href = `movie.html?id=${m.id}`; };
    movieList.appendChild(div);
  });
}

// Detalhes do filme
if (window.location.pathname.includes("movie.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const movie = movies.find(m => m.id == id);

  if (movie) {
    document.getElementById("movie-title").innerText = movie.title;
    document.getElementById("movie-details").innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="poster-large">
      <p><strong>Descrição:</strong> ${movie.description}</p>
      <p><strong>Elenco:</strong> ${movie.cast}</p>
      <iframe width="560" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
    `;
  }

  const user = localStorage.getItem("cineUser");
  if (user) {
    document.getElementById("comment-form").style.display = "block";
    document.getElementById("login-message").style.display = "none";
  }

  renderComments(id);
}

// Comentários
function addComment() {
  const text = document.getElementById("comment-text").value;
  if (text.trim() === "") return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const user = localStorage.getItem("cineUser");
  const comments = JSON.parse(localStorage.getItem("comments_" + id) || "[]");

  comments.push({ user, text });
  localStorage.setItem("comments_" + id, JSON.stringify(comments));
  document.getElementById("comment-text").value = "";
  renderComments(id);
}

function renderComments(movieId) {
  const list = document.getElementById("comments-list");
  list.innerHTML = "";
  const comments = JSON.parse(localStorage.getItem("comments_" + movieId) || "[]");
  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `<strong>${c.user}:</strong> ${c.text}`;
    list.appendChild(div);
  });
}

updateUserUI();

 
