
/*input of the form should be captured 

captured input of the form can be used to search github users by name 
and display the results on the screen.

Clicking on a specific user will  show all the repositories for that user.
------
When form is submited it should take value of input and serch github for
user matches using the User Search ENdpoint

After getting the user, should display user name on screen

*/

const form = document.querySelector('#github-form');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = document.querySelector('#search').value;
  fetch(`https://api.github.com/search/users?q=${searchValue}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      userList.innerHTML = '';
      data.items.forEach(user => {
        const userContainer = document.createElement('li');
        userContainer.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}'>
          <a href='${user.html_url}'>${user.login}</a>
        `;
        userContainer.addEventListener('click', () => {
          fetch(`https://api.github.com/users/${user.login}/repos`, {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          })
            .then(response => response.json())
            .then(data => {
              reposList.innerHTML = '';
              data.forEach(repo => {
                const repoContainer = document.createElement('li');
                repoContainer.innerHTML = `
                  <a href='${repo.html_url}'>${repo.name}</a>
                `;
                reposList.appendChild(repoContainer);
              });
            });
        });
        userList.appendChild(userContainer);
      });
    });
});
