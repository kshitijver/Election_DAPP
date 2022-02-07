pragma solidity >=0.4.22 <0.8.0;

contract Election {
	//Model a candidate
	struct Candidate{
		uint id;
		string name;
		uint voteCount;
	}
	//Store candidates
	//Fetch candidate
		//Smoke test (Solidity automatically gives a getter function)
	mapping(uint => Candidate) public candidates;
	//Store candidate count
	uint public candidatesCount;

	constructor () public {
		addCandidate("Candidate 1");
		addCandidate("Candidate 2");
	}

	function addCandidate(string memory _name) private{
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount,_name,0);
	}
}