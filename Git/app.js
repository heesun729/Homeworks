const userID = document.getElementById('search-user');
const profile = document.getElementById('profile');
const repos = document.getElementById('repository');
const apiURL = 'https://api.github.com/users/';

// input에 작성한 값 가져오기
userID.addEventListener('keyup', (e) => {
    const userData = e.target.value;

    if (userData != '') {
        fetchUserInfo(userData);
    }
});

const fetchUserInfo = async (userData) => {
    try {
        const response = await fetch(apiURL + userData, {
            headers: {
                Authorization: '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',
            },
        });
        if (response.ok) {
            // 성공했다면, JSON 형식으로 파싱해 유저 데이터 가져오기
            const userData = await response.json();

            //유저 데이터 UI
            userInfo(userData);

            //레포지터리 가져오기
            fetchRepos(userData.repos_url);
        } else {
            throw new Error('GitHub API 요청이 실패하였습니다. ' + response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
};

function userInfo(userData) {
    profile.innerHTML = `
        <section class="profile-container">
            <div class="profile">
                <img class="user-img" src="${userData.avatar_url}" />
                <a href="${userData.html_url}" target="_blank" class="profile-btn">View Profile</a>
            </div>
            <div class="profile-info">
                <div class="profile-status">
                    <span class="status repos">Public Repos:${userData.public_repos} </span>
                    <span class="status gists">Public Gists: ${userData.public_gists}</span>
                    <span class="status followers">Followers: ${userData.followers}</span>
                    <span class="status following">Following: ${userData.following}</span>
                </div>

                <table class="profile-table">
                    <tr class="profile-table-item">
                        <td>Company: ${userData.company}</td>
                    </tr>
                    <tr class="profile-table-item">
                        <td>Website / Blog: ${userData.blog}</td>
                    </tr>
                    <tr class="profile-table-item">
                        <td>Location: ${userData.location}</td>
                    </tr>
                    <tr class="profile-table-item">
                        <td>Member Since: ${userData.created_at}</td>
                    </tr>
                </table>
            </div>
        </section>
    `;
}

const fetchRepos = async (reposURL) => {
    try {
        const response = await fetch(reposURL + '?sort=updateed', {
            headers: {
                Authorization: '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',
            },
        });
        if (response.ok) {
            const reposList = await response.json();
            renderRepos(reposList);
        } else {
            throw new Error('GitHub API 요청이 실패하였습니다. ' + response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
};

function renderRepos(reposList) {
    repos.innerHTML = `
        <header>
            <h1 id="repos-header">Latest Repos</h1>
        </header>
    `;
    reposList.slice(0, 5).forEach((reposList) => {
        const newRepo = document.createElement('div');
        newRepo.classList.add('list', 'repo-list');
        newRepo.innerHTML = `
            <div class="repos-list">
                <div class="repos-list-name">
                <a href="${reposList.html_url}" target="_blank"> ${reposList.name} </a>
                </div>
                <div class="repos-status">
                    <span class="repos-stars">Stars: ${reposList.stargazers_count}</span>
                    <span class="repos-watchers">Watchers: ${reposList.watchers_count}</span>
                    <span class="repos-forks">Forks: ${reposList.forks_count}</span>
                </div>
            </div>
        `;
        repository.appendChild(newRepo);
    });
}
