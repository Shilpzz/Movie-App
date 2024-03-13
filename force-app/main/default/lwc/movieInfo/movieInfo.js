import { LightningElement, api } from 'lwc';
import getMovieDetails from '@salesforce/apex/MovieController.getMovieDetails';
import getCastMember from '@salesforce/apex/MovieController.getCastMember';
export default class MovieInfo extends LightningElement {
    @api movie;
    movieCast;

    movieDetail = [];
    connectedCallback(){
        // console.log(JSON.stringify(this.movie));
        this.getMovie();
        this.getMovieCast();
    }



    async getMovie(){
        this.movieDetail = await getMovieDetails({movieId:this.movie.Id});
        // console.log('movieDetails--->', JSON.stringify(this.movieDetail));
    }

    async getMovieCast(){
        this.movieCast = await getCastMember({SelectId: this.movie.Id});
        // console.log(this.movieCast);
      }

      

      handleActorClick(event){
        const actorId = event.currentTarget.dataset.actorId;
        this.dispatchEvent(new CustomEvent('actorclick',{
            detail: actorId
        }))
      }

      handleBack(event){
        this.dispatchEvent(new CustomEvent('goback'));
        console.log('movieInfo---->>');
      }

      get formattedReleaseDate() {
        if (this.movie && this.movie.Release_Date__c) {
            const releaseDate = new Date(this.movie.Release_Date__c);
            const day = ('0' + releaseDate.getDate()).slice(-2); 
            const month = ('0' + (releaseDate.getMonth() + 1)).slice(-2); 
            const year = releaseDate.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return '';
    }
}