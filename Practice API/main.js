let users = [];
const api = "https://randomuser.me/api";
const results = 100;
const usersPerPage = 10;
let currentPage = 1;

function fetchUsers(page) {
  fetch(`${api}?results=${results}`)
    .then((res) => res.json())
    .then((data) => {
      users = data.results;
      const paginatedUsers = paginate(users, page);
      displayUsers(paginatedUsers);
      updatePaginationControls(page);
      document.getElementById("loading").style.display = "none";
      document.getElementById("user-container").style.display = "grid";
    });
}

function paginate(users, page) {
  const startIndex = (page - 1) * usersPerPage;
  return users.slice(startIndex, startIndex + usersPerPage);
}

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

function updatePaginationControls(page) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  if (page > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerText = "Sebelumnya";
    prevButton.addEventListener("click", () => {
      currentPage--;
      fetchUsers(currentPage);
    });
    paginationContainer.appendChild(prevButton);
  }

  if (page * usersPerPage < users.length) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Selanjutnya";
    nextButton.addEventListener("click", () => {
      currentPage++;
      fetchUsers(currentPage);
    });
    paginationContainer.appendChild(nextButton);
  }
}

fetchUsers(currentPage);

document.getElementById("search").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  displayUsers(filteredUsers);
});
