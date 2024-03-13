public with sharing class MovieController {
    @AuraEnabled
	public static List<Movie__c> getMovies(Integer offset) {
		return [select id,Name,Genres__c,
                            Original_Language__c,Original_Title__c,
                            Overview__c,Poster_URL__c,Tmdb_Id__c,
                            Release_Date__c,Runtime_Minutes__c,Tagline__c
                    from Movie__c
                    limit 9 offset :offset];
	}

    @AuraEnabled
    public static List<Cast_Member__c> getMovieDetails(String movieId) {
		return [select id,Name,Actor_Id__r.Id, 
                        Actor_Id__r.Name,Actor_Id__r.Profile_URL__c 
                        from Cast_Member__c
                    where Movie_Id__c = :movieId ];
	}

    @AuraEnabled
    public static List<Cast_Member__c> getCastMember(String SelectId) {
		return [select Name, Id, Actor_Id__r.Name,Actor_Id__r.Birth_Day__c,
        Actor_Id__r.Birth_Place__c,Actor_Id__r.Death_Day__c,
        Actor_Id__r.Gender__c,Actor_Id__r.Profile_URL__c 
        from Cast_Member__c 
        where Movie_Id__c = :SelectId];
	}

    // @AuraEnabled
    // public static List<Actor__c> getActor(String selectedId) {
    //     return [
    //         SELECT Name,
    //         Biography__c, Birth_Day__c,Birth_Place__c,Death_Day__c,Gender__c,Known_For__c,Profile_URL__c
    //         FROM Actor__c
    //         WHERE Id = :selectedId
    //     ];
    // }

    @AuraEnabled
    public static List<Cast_Member__c> getActorMember(String SelectId) {
		return [select Name, Id, Actor_Id__r.Name,Actor_Id__r.Birth_Day__c,
        Actor_Id__r.Birth_Place__c,Actor_Id__r.Death_Day__c,
        Actor_Id__r.Gender__c,Actor_Id__r.Profile_URL__c,Actor_Id__r.Biography__c,Actor_Id__r.Known_For__c
        from Cast_Member__c 
        where Actor_Id__c = :SelectId];
	}
    
}

