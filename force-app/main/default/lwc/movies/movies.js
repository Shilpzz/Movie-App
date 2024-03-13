import { LightningElement } from 'lwc';
import getMovies from '@salesforce/apex/MovieController.getMovies';
// import getCastMember from '@salesforce/apex/MovieController.getCastMember';

export default class Movies extends LightningElement {
  movies = [];
  pageNumber = 1;
  chosenView = 'showMovies';
  selectedMovie;
  previousDisabled = true;
  nextDisabled = false;
  movieCast = [];
  selectedActorId

  connectedCallback() {
    this.getMyMovies();
  }

  get showMovies() {
    if (this.chosenView === 'showMovies') {
      return true;
    }
    return false;
  }

  get showMovie() {
    if (this.chosenView === 'showMovie') {
      return true;
    }
    return false;
  }

  get showActor() {
    if (this.chosenView === 'showActor') {
      return true;
    }
    return false;
  }

  get headerTitle(){
    if(this.showMovie){
      return 'Movie Detail';
    } else if (this.showActor){
      return 'Actor Detail';
    }
    return 'Movies';
  }

  next() {
    if (this.pageNumber <= 11) {
        this.pageNumber += 1;
        this.getMyMovies();
        this.previousDisabled = false;
    }
    if(this.pageNumber === 11){
      this.nextDisabled = true;
    }
}

previous() {
    if (this.pageNumber > 1) {
        this.pageNumber -= 1;
        this.getMyMovies();
        this.nextDisabled = false;
    }
    if(this.pageNumber === 1){
      this.previousDisabled = true;
    }
}


  async getMyMovies() {
    const movies = await getMovies({offset: this.getOffset()});
    this.movies = movies.map(mov => {
      const genres = mov.Genres__c.split(';').join(', ');
      const poster = mov.Poster_URL__c.includes('undefined') ? null : mov.Poster_URL__c;
      if (mov.Name !== mov.Original_Title__c) {
        return {...mov, Name: `${mov.Name} (${mov.Original_Title__c})`, Genres__c: genres, Poster_URL__c: poster};
      } 
      return {...mov, Genres__c: genres, Poster_URL__c: poster};
    })
    console.log(this.movies);
  }

  getOffset() {
    return (this.pageNumber - 1) * 9;
  }

  handleMovieSelected(event){
  console.log("Movie lwc",event.detail);
  this.selectedMovie = this.movies.find(movieId => movieId.Id === event.detail);
  console.log('selected movie ---->>',JSON.stringify(this.selectedMovie));
  this.chosenView = 'showMovie';
  // this.getMovieCast();
  }

  handleActorSelected(event){
    this.selectedActorId=event.detail;
    console.log('Actor Id', this.selectedActorId);
    this.chosenView = 'showActor';
  }
 
  handleGoBack(event) {
    if(this.chosenView ==='showMovie'){
    this.chosenView='showMovies';
    }else if(this.chosenView ==='showActor'){
      this.chosenView = 'showMovie';
    }else{
      this.chosenView = 'showMovies';
    }
    console.log('handleGoBack');
}

}