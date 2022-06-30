const API_KEY = 'api_key=a86f1ad1d039e27d489a36607616522f';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL = 'https://api.themoviedb.org/3/tv/airing_today?api_key=a86f1ad1d039e27d489a36607616522f&language=en-US&page=1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('swiper-wrapper');
let latestPages;
let topPages;
getMovies(URL)
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        showMovies(data.results);
        console.log(data);

    })
}

function showMovies(data){
    main.innerHTML = ' ';
    data.forEach(movie =>{

        const{id,name, poster_path, vote_average, first_air_date, genre_ids} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add('swiper-slide')
        movieEl.innerHTML = `
     <div class="main-slider-box">
    <div class="main-slider-img">
        <img alt="${name}" src="${IMG_URL+poster_path}"/>
    </div>

        <div class="main-slider-txt">
            <span class="quality">Full HD</span>
            <div class="bottom-text">
                <div class="movie-name">
<!--                    <span>2021</span>-->
                    <a href="showTV.html?id=${id}"><strong>${first_air_date.substring(0,4)} : ${name}</strong></a>
                </div>

                <div class="category-rating">
                    <div class="category">
                     <a href="">${getGenre(genre_ids[0])}</a>
                     <a href="">${getGenre(genre_ids[1])}</a>
                     <a href="">${getGenre(genre_ids[2])}</a>
                     <a href="">${getGenre(genre_ids[3])}</a>

                    </div>

                    <div class="rating">
                                    <img src="res/star-img.png" alt=""/>
                                    <span class="val" style="color: ${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>

        `;
        main.appendChild(movieEl);
    })
}

// TOP RATED MOVIES

const post = document.getElementById('post-container');

const topURL = 'https://api.themoviedb.org/3/tv/top_rated?api_key=a86f1ad1d039e27d489a36607616522f&language=en-US&page=1';
getLatest(topURL);
function getLatest(lrl){
    fetch(lrl).then(res => res.json()).then(data =>{
        topratedShow(data.results);

    })
}

//   Setting last page number....
// if(topPages<latestPages){
//     document.getElementById('last-page').innerHTML = topPages;
// }
// else{
//     document.getElementById('last-page').innerHTML = latestPages;
// }

function topratedShow(topdata){
    post.innerHTML= ' ';
    topdata.forEach(topmovie => {
        const {id,name, poster_path, vote_average, first_air_date, genre_ids} = topmovie;

        const movieEl = document.createElement("div");
        movieEl.classList.add('post-box')
        movieEl.innerHTML = `
     <div class="main-slider-box">
    <div class="main-slider-img">
        <img alt="${name}" src="${IMG_URL+poster_path}"/>
    </div>

        <div class="main-slider-txt">
            <span class="quality">Full HD</span>
            <div class="bottom-text">
                <div class="movie-name">
<!--                    <span>2021</span>-->
                   <a href="showTV.html?id=${id}"> <strong>${first_air_date.substring(0,4)} : ${name}</strong> </a>
                </div>

                <div class="category-rating">
                    <div class="category">
                    <a href="">${getGenre(genre_ids[0])}</a>
                     <a href="">${getGenre(genre_ids[1])}</a>
                      <a href="">${getGenre(genre_ids[2])}</a>
                    </div>

                    <div class="rating">
                                    <img src="res/star-img.png" alt=""/>
                                    <span class="val" style="color: ${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>

        `;
        post.appendChild(movieEl);

    });
}

function getColor(vote){
    if(vote>=8) return 'lime';
    else if(vote>=5) return 'orange';
    else return 'red';
}

// {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}

function findId(genreData, idToLookFor) {

    for (let i = 0; i < genreData.length; i++) {
        if (genreData[i].id == idToLookFor) {
            return(genreData[i].name);
        }
    }
}

function getGenre(id){
    let genreData = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}];

    var genreName =  findId(genreData, id);
    if(genreName==undefined){
        return "";
    }
    else return genreName;

}
// url querry parrameters...

