let users = [];
const api = "https://randomuser.me/api";
const results = 100;

fetch(`${api}?results=${results}`)
  .then((res) => res.json())
  .then((data) => {
    users = data.results;
    displayUsers(users);
    document.getElementById("loading").style.display = "none";
    document.getElementById("user-container").style.display = "grid";
  });

function displayUsers(users) {
  const userContainer = document.getElementById("user-container");
  userContainer.innerHTML = "";

  users.map((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `<img
            src="${user.picture.large}" 
            alt="${user.name.first}"
            />
            <div class="user-info">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>${user.email}</p>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>`;

    userContainer.appendChild(userCard);
  });
}

document.getElementById("search").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  // Tampilkan pengguna yang difilter
  displayUsers(filteredUsers);
});


