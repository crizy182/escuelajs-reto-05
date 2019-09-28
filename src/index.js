const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let API = 'https://rickandmortyapi.com/api/character/';
let API2 = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters'
let next;
const getData = api => {
  fetch(api)
    .then(response => {response.json()
    })
    .then(response => {
      const characters = response.results;
      next = response.info.next;
      console.log(next);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const next_fetch = () => {
  API = next;
  // console.log(next);
}

const loadData = () => {
  getData(API);
  nextPage();
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);