pragma solidity >=0.4.22 <0.8.0;

contract Election {
	//Model a candidate
	struct Candidate{
		uint id;
		string name;
		uint voteCount;
	}

	//Store voters
	mapping(address => bool) public voters;
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

	function vote(uint _candidateId) public {
		//require that the voter hasn't voted before
		require(!voters[msg.sender]);
		//require that the candidate is valid
		require(_candidateId > 0 && _candidateId <= candidatesCount);
		//Record that candidate has voted
		voters[msg.sender] = true;
		//Update candidate vote count
		candidates[_candidateId].voteCount++;
	}
}