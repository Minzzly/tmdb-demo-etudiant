document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();

    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilm(params.get("id"));
    } else {
        connexion.requeteDerniersFilm();
    }

});

class MovieDB {
    constructor() {
        console.log('new MovieDB()');
        this.appiKey = 'edfc0d8a17f0e7d7374973505bfaedc8';
        this.lang = 'fr-CA';
        this.baseURL = 'https://api.themoviedb.org/3/';
        this.imgPath = 'https://image.tmdb.org/t/p/';
        this.totaleFilm = 8;
    }

    requeteDerniersFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener('loadend', this.retourRequeteDerniersFilm.bind(this));
        requete.open('GET', this.baseURL + 'movie/now_playing?api_key=' + this.appiKey + '&language=' + this.lang + '&page=1')
        requete.send();
    }

    retourRequeteDerniersFilm(event) {
        console.log('ça marche');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        console.log(data);
        this.afficheDerniersFilm(data);
    }

    afficheDerniersFilm(data) {
        let section = document.querySelector(".liste-films");

        for (let i = 0; i < this.totaleFilm; i++) {
            //console.log(data[i].title);
            //console.log(data[i].overview);
            let article = document.querySelector(".template .film").cloneNode(true);
            article.querySelector("h2").innerHTML = data[i].title;
            article.querySelector(".description").innerHTML = data[i].overview || "Aucune description n'est disponible.";

            let src = this.imgPath + "w500" + data[i].poster_path;
            let image = article.querySelector("img");
            image.setAttribute("src", src);
            image.setAttribute("alt", data[i].title);

            article.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);


            section.appendChild(article);
        }
    }


    requeteInfoFilm(movieId) {
        let requete = new XMLHttpRequest();
        requete.addEventListener('loadend', this.retourRequeteInfoFilm.bind(this));
        requete.open('GET', this.baseURL + "movie/" + movieId + "?api_key=" + this.appiKey + '&language=' + this.lang)
        requete.send();
    }

    retourRequeteInfoFilm(event) {
        console.log('ça marche');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data);
        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data) {
        //requete acteur()
        document.querySelector("h1").innerHTML = data.title;

        //let section = document.querySelector(".liste-films");

        //for (let i = 0; i < this.totaleFilm; i++) {
            //console.log(data[i].title);
            //console.log(data[i].overview);
            //let article = document.querySelector(".template .film").cloneNode(true);
            //article.querySelector("h2").innerHTML = data[i].title;
            //article.querySelector(".description").innerHTML = data[i].overview || "Aucune description n'est disponible.";

            //let src = this.imgPath + "w500" + data[i].poster_path;
            //let image = article.querySelector("img");
            //image.setAttribute("src", src);
            //image.setAttribute("alt", data[i].title);

            //article.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);


            //section.appendChild(article);
        //}
    }

    requeteActeur(movieId){
        //GET Credits(moviedb)-requete AJAX
    }
    retourRequeteActeur(){
        //Faire attention au JSON...il n'y a pas de results
    }
    afficheActeur(){
        //boucle pour afficher tous les acteur avec un cloneNode
    }


}