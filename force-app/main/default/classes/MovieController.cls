public with sharing class MovieController {
    @AuraEnabled
	public static List<Movie__c> getMovies() {
		return [select id,Name,Genres__c,
                            Original_Language__c,Original_Title__c,
                            Overview__c,Poster_URL__c,
                            Release_Date__c,Runtime_Minutes__c
                    from Movie__c
                    limit 9];
	}
}