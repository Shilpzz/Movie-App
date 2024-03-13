import { LightningElement, api } from 'lwc';

export default class MoviesList extends LightningElement {
  @api movies = []
  showDetails(event){
    console.log(event.target.dataset.movieId);
    // The CustomEvent constructor is used to create a new event, and dispatchEvent is used to dispatch it.
    this.dispatchEvent (new CustomEvent('selectmovie',{
      detail: event.target.dataset.movieId
    }));
  }

}