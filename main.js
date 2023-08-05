const URL_API_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z';
const URL_API_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?api_key=live_5gjlVeonu44CFzDm3sTaXoJ0TF8JJIow0d9Ay1GmZoeto8O8jgLZM5pJEH6KHO1z';
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const spanError = document.getElementById('error');
const content = null || document.getElementById('favouritesDogs');

async function loadRandomDogs() {
  const response = await fetch(URL_API_RANDOM);
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  } else {
    img1.src = data[0].url;
    img2.src = data[1].url; 
    console.log(data);
  }
}

async function loadFavoriteDogs() {
  const response = await fetch(URL_API_FAVOURITES);
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  }
}

async function saveFavouriteDogs() {
  const response = await fetch(URL_API_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: 'jfljgFCTj'
    }),
  });
  
  const data = await response.json();
  
  if (response.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${response.status} ${response.message}`;
  } else {
    let view = `
    
    `
  }

}

loadRandomDogs();
loadFavoriteDogs();