var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){

	var electionInstance;

	it("initializes with two candidates", function(){
		return Election.deployed().then(function(instance){
			return instance.candidatesCount();
		}).then(function(count){
			assert.equal(count,2);
		});
	});

	it("initializes all the candidates with correct values", function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate){
			assert.equal(candidate.id.toNumber(),1,"contains the correct id");
			assert.equal(candidate.name,"Candidate 1","contains the correct name");
			assert.equal(candidate.voteCount.toNumber(),0,"contains 0 votes");
			return electionInstance.candidates(2);
		}).then(function(candidate){
			assert.equal(candidate.id.toNumber(),2,"contains the correct id");
			assert.equal(candidate.name,"Candidate 2","contains the correct name");
			assert.equal(candidate.voteCount.toNumber(),0,"contains 0 votes");
		});
	});
});