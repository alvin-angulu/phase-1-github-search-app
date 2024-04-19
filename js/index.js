document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search').value;
        searchGitHubUsers(searchInput);
    });
});

function searchGitHubUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error fetching user data:', error));
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';  // Clear previous results

    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
            <a href="#" onclick="fetchUserRepos('${user.login}')">${user.login}</a>
        `;
        userList.appendChild(userItem);
    });
}

// Function to fetch repositories for a given user
function fetchUserRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(repos => displayRepos(repos))
        .catch(error => console.error('Error fetching repositories:', error));
}

// Function to display repositories
function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';  // Clear previous results

    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(repoItem);
    });
}
