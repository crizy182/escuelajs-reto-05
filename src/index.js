const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let promesa;
let nextPage;
let API = 'https://rickandmortyapi.com/api/character/';
window.onload = localStorage.clear();

const getData = async api => {
  fetch(api)
    .then(response => {response.json()
    })
    .then(response => {
      const characters = response.results;
      next = response.info.next;
      if (next == ""){
        alert('Dude ya no hay más personajes deja de stalkear');
        intersectionObserver.unobserve($observe);
      }
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
    .catch(error => console.log(error,'It works, but there is a flick error but I don\'t where is it'));
}
const next_url = async() => {
  API = await nextPage;
  return API;
}
const loadData = async () => {
  if (localStorage.getItem('next_fetch')!==''){
    const apiUrl = localStorage.getItem('next_fetch')!== null ? localStorage.getItem('next_fetch') : API;
    const response = await getData(apiUrl);
  }
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