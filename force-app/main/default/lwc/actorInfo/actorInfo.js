import { LightningElement, api } from 'lwc';
import getActorMember from '@salesforce/apex/MovieController.getActorMember';


export default class ActorInfo extends LightningElement {
    @api actorId
    actor
    findActor

    connectedCallback(){
        this.getActorDetail();
    }
    
    async getActorDetail(){
        this.actor = await getActorMember({ SelectId: this.actorId });
        this.findActor = this.actor[0];
            console.log('find actor', this.findActor);
            console.log('Actor Detail:', this.actor);
    }

    handleBack(event){
        this.dispatchEvent(new CustomEvent('goback'));
        console.log('actorInfo---->>');
      }
}