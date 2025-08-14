// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//Import the library
import "./PriceConverter.sol";

contract FundMe{        
		using PriceConverter for uint256;
    uint256 public minimumUsd = 20*1e18; // We need to calculate this before funding otherwise it will error    //50/3000 = 0.016666666666 So 0.02eth should be enough to fund the contract.
    address [] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    
    //To make sure only the admin/owner withdraws. For that we want to make it such that whomever deploys the contract, owns the contract.    
    //We can do this using a constructor, which initializes when deployed. 
    address public owner; //A declared variable
    constructor() {       
	    owner = msg.sender; //Calling this inside the constructor ensures, whomever deploys it is name owner and should be able to call the withdraw function.             
    }
    
    function fund() public payable {                
		  require(msg.value.getConversionRate() >= minimumUsd, "Amount is not enough");        
		  funders.push(msg.sender);
      addressToAmountFunded [msg.sender] = msg.value;
    }    
    function withdraw () public onlyOwner{ //Now the function includes a modifier
        for (uint256 i = 0; i < funders.length; i++){
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;        
        }
        
        funders = new address[](0);                
        
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");         
        require(callSuccess, "Call failed.");
    }
    
    //Creating a modifier    
    modifier onlyOwner {        
		    require(msg.sender == owner, "You are not the owner!");        
		    _; // This is required to make a modifier. This means if the above is true, continue with the rest of the code.
        //If the _; came first, it would execute the function and then check the require.     
    }
}
