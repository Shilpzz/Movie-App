import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
  'Movie__c.Poster_URL__c',
  'Movie__c.Name'
];

export default class MoviePoster extends LightningElement {
  @api recordId;
  posterPath; //will be null if Poster Path is not set
  name;
  @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    wiredRecord({data}) {
      if (data) {
        this.posterPath = data.fields.Poster_URL__c.value;
        this.name = data.fields.Name.value;
        console.log(this.posterPath);
      }
    }
  get validUrl() {
    if (this.posterPath) {
      return true;
    }
    return false;
  }
}