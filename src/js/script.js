document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();
    connexion.requeteDerniersFilm();
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
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].overview);
        }
    }
}