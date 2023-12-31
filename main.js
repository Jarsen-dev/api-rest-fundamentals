const api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1'
});
const AUTH_TOKEN = 'live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z';
api.defaults.headers.common['X-API-KEY'] = AUTH_TOKEN;

const URL_API_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2';
const URL_API_FAVOURITES = 'https://api.thedogapi.com/v1/favourites';
const URL_API_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const URL_API_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const spanError = document.getElementById('error');
const section = document.getElementById('favouriteDogs');
const form = document.getElementById('uploadingForm');

async function loadRandomDogs() {
  const response = await fetch(URL_API_RANDOM);
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  } else {
    img1.src = data[0].url;
    img2.src = data[1].url; 
    
    btn1.onclick = () => saveFavouriteDog(data[0].id);
    btn2.onclick = () => saveFavouriteDog(data[1].id);
  }
}

async function loadFavoriteDogs() {
  const response = await fetch(URL_API_FAVOURITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z'
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  } else {
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Seccion de perritos favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(doggy => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al doggy de favoritos');

      img.src = doggy.image.url;
      img.height = 350;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteDog(doggy.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteDog(id) {
  const { data, status } = await api.post('/favourites', {
    image_id: id,
  });

  /*const response = await fetch(URL_API_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  
  const data = await response.json();*/
  
  if (status !== 200) {
    spanError.innerHTML = `Hubo un error: ${data.status} ${data.message}`;
  } else {
    console.log('Perrito guardado en favoritos');
    loadFavoriteDogs();
  }
}

async function deleteFavouriteDog(id) {
  const response = await fetch(URL_API_FAVOURITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z'
    }
  });
  
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  } else {
    console.log('Perrito eliminado de favoritos');
    loadFavoriteDogs();
  }
}

async function uploadDoggyPhoto() {
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const response = await fetch(URL_API_UPLOAD, {
    method:'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z',
    },
    body: formData,
  })

  const data = await response.json();

  if (response.status !== 201) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${data.message}`
  } else {
    console.log("Foto de doggy cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteDog(data.id) //para agregar el michi cargado a favoritos.
  }
}

loadRandomDogs();
loadFavoriteDogs();