const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let promesa;
let nextPage;
let API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      next = response.info.next;
      localStorage.setItem('next_fetch', next);
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
    }).then(next_url())
    .catch(error => console.log(error));
}
const next_url = async() => {
  API = await nextPage;
  //return API;
}
const loadData = () => {
  promesa = new Promise( function(resolve, reject) {
    nextPage = localStorage.getItem('next_fetch');
    resolve(nextPage);
  });
  promesa
  .then(
    verificator => console.log(verificator ? verificator : API)   
  )

  next_url();
  getData(API);
  //const next_url()=;

}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 95% 0px',
});

intersectionObserver.observe($observe);