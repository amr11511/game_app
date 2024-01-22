let games = document.querySelector("#games")
let detOfGame = document.querySelector("#detOfGame")
let itemOfGame = document.querySelector("#itemOfGame")
let exiteBtn = document.querySelector("#exiteBtn")
let itemClick = document.querySelector("#itemClick")
const mmorpg = document.querySelector("#mmorpg")
const shooter = document.querySelector("#shooter")
const sailing = document.querySelector("#sailing")
const permadeath = document.querySelector("#permadeath")
const superhero = document.querySelector("#superhero")
const pixel = document.querySelector("#pixel")
const allLinks = document.querySelectorAll('.nav-link');
(function () {
    allLinks.forEach((link) => {
      link.addEventListener('click', function () {
        document.querySelector('.nav-link.active').classList.remove('active');
        this.classList.add('active');
      });
    });
  })();
mmorpg.addEventListener('click' , function(){
    getApi("mmorpg")
})
shooter.addEventListener('click', function() {
    getApi("shooter")
})
sailing.addEventListener('click' , function(){
    getApi("sailing")
})
permadeath.addEventListener('click' , function(){
    getApi("permadeath")
})
superhero.addEventListener('click' , function(){
    getApi("superhero")
})
pixel.addEventListener('click', function(){
    getApi("pixel")
})
let myMovies = [];
async function getApi(category = "mmorpg"){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6038cb242fmshd79b87bf2ce17a2p1825e3jsn8fd53cef3399',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const finalResponse = await response.json()
    myMovies = finalResponse;
    console.log(myMovies);
    displayMovies()   
}
getApi()
/*********************************************/
let dispalyDetOfData;
async function getApiDet(idApi){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idApi}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6038cb242fmshd79b87bf2ce17a2p1825e3jsn8fd53cef3399',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
	const response = await fetch(url, options);
	const result = await response.json();
    dispalyDetOfData = result
	console.log(dispalyDetOfData);
    displayDetails(dispalyDetOfData)
}
/*********************************************/
function displayMovies(){
    let movies = ``
    for (let i=0 ;i<myMovies.length;i++){
        movies +=`
        <div class="col-lg-3 g-3">
              <div
                id="itemOfGame"
                class="item border border-black rounded-2 p-3 cursorPointer h-100"
                onclick="getDetails(${myMovies[i].id})"
              >
                <div id="itemClick" >
                    <img
                    src="${myMovies[i].thumbnail}"
                    class="w-100 mb-3 rounded-top-2"
                    alt=""
                    />
                    <div class="d-flex justify-content-between mb-3">
                    <p class="text-white pt-2">${myMovies[i].title}</p>
                    <button class="btn btn-info mb-3">Free</button>
                    </div>
                    <div class="text-center text-white-50 mb-5">
                        ${myMovies[i].short_description.split(" ",8)}
                    </div>
                </div>
                <div>
                    <div class="d-flex justify-content-between p-0 text-white">
                    <div class="phas1 rounded-1 me-3">${myMovies[i].genre}</div>
                    <div class="phas2 rounded-1">${myMovies[i].platform}</div>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("movie").innerHTML = movies;
}
function getDetails(id){
    getApiDet(id)
    games.style.display = 'none'
    detOfGame.style.display = 'block'
}
function displayDetails(respo){
    let movDet = `<div class="d-flex container justify-content-between my-4">
    <h1>Details Game</h1>
    <div id="exiteBtn" onclick="closeItem()" class="exite">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="item">
          <img src="${respo.thumbnail}" class="w-100 rounded-2" alt="" />
        </div>
      </div>
      <div class="col-lg-8">
        <h2>Title:<span>${respo.title}</span></h2>
        <p>Category: <span class = "bgColor">${respo.genre}</span></p>
        <p>platform: <span class = "bgColor">${respo.platform}</span></p>
        <p>status: <span class = "bgColor">${respo.status}</span></p>
        <p>${respo.description}</p>
        <a href="${respo.game_url}" target="_blank" class="btn btn-outline-primary text-decoration-none">Show Game</a>
      </div>
    </div>
  </div>`
  detOfGame.innerHTML = movDet
}


function closeItem(){
    games.style.display = 'block'
    detOfGame.style.display = 'none'
}
$(window).scroll(function() {
    if ($(window).scrollTop() > 30) {
        $('.navbar').addClass('fixed-top');
        $('.navbar').addClass('mtt');
    }else{
        $('.navbar').removeClass('fixed-top');
        $('.navbar').removeClass('mtt');
    }
    });
