import { LightningElement } from 'lwc';
import getMovies from '@salesforce/apex/MovieController.getMovies';
export default class Movies extends LightningElement {
    movies = [];

    async getMyMovies() {
      this.movies = await getMovies();
      console.log(this.movies);
    }
}

