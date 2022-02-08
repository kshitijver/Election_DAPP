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

	it("allows a voter to cast a vote", function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			candidateId = 1;
			return electionInstance.vote(candidateId, {from : accounts[5] });
		}).then(function(receipt){
			assert.equal(receipt.logs.length,1,"an event was triggered");
			assert.equal(receipt.logs[0].event,"votedEvent","the event type is correct");
			assert.equal(receipt.logs[0].args._candidateId.toNumber(),candidateId,"the candidate id is correct");
			return electionInstance.voters(accounts[5]);
		}).then(function(voted){
			assert.equal(voted,true,"the voter was marked as voted");
			return electionInstance.candidates(candidateId);
		}).then(function(candidate){
			assert.equal(candidate.voteCount,1,"number of votes was incremented");
		});
	});

	it("throws an exception for invalid candidates", function(){
		return Election.deployed().then(function(i){
			electionInstance = i;
			return electionInstance.vote(99, {from:accounts[9]});
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, "error msg contains revert");
			return electionInstance.candidates(1);
		}).then(function(candidate){
			assert(candidate.voteCount.toNumber() == 1, "Candidate 1 vote count didn't change");
			return electionInstance.candidates(2);
		}).then(function(candidate){
			assert.equal(candidate.voteCount.toNumber(),0,"Candidate 2 vote count didn't change");
		});
	});

	it("throws an exception for double voting", function(){
		return Election.deployed().then(function(i){
			electionInstance = i;
			return electionInstance.vote(2,{from:accounts[8]});
		}).then(function(receipt){
			return electionInstance.vote(2,{from:accounts[8]});
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, "error message contains revert");
			return electionInstance.candidates(1);
		}).then(function(candidate){
			assert.equal(candidate.voteCount.toNumber(),1,"Candidate 1 votes didn't change");
			return electionInstance.candidates(2);
		}).then(function(candidate){
			assert.equal(candidate.voteCount.toNumber(),1,"Candidate 2 votes didn't change");
		});
	});
});