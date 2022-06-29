const API_KEY = 'api_key=a86f1ad1d039e27d489a36607616522f';
const BASE_URL = 'https://api.themoviedb.org/3';
const URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('swiper-wrapper');

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

        const{title, poster_path, vote_average, release_date} = movie;
        console.log(title);
        const movieEl = document.createElement("div");
        movieEl.classList.add('swiper-slide')
        movieEl.innerHTML = `
     <div class="main-slider-box">
    <div class="main-slider-img">
        <img alt="${title}" src="${IMG_URL+poster_path}"/>
    </div>

        <div class="main-slider-txt">
            <span class="quality">Full HD</span>
            <div class="bottom-text">
                <div class="movie-name">
<!--                    <span>2021</span>-->
                    <strong>${release_date} : ${title}</strong>
                </div>

                <div class="category-rating">
                    <div class="category">
                    <a href="">Horror</a>, <a href="">Mistery</a>, <a href="">Thriller</a>
                    </div>

                    <div class="rating">
                                    <img src="res/star-img.png" alt=""/>
                                    <span class="val">${vote_average}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>

        `;
        main.appendChild(movieEl);
    })
}