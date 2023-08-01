// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Petfundme is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _totalNFTs;
  uint public _totalFundraisers = 0;
  uint public _totalDonations = 0;

  mapping(uint => Fundraiser) public fundraiserList;
  mapping(uint => Donation) public donationList;

  struct Donation {
    uint id;
    uint fundraiser_id;
    uint donationAmount;
    address donator;
    string message;
  }

  struct Fundraiser {
    uint id;
    string cid;
    uint targetAmmount;
    uint totalDonations;
    address organizer;
  }

  event FundraiserCreated (
    uint id,
    string cid,
    uint targetAmmount,
    address organizer
  );


  constructor() ERC721("Community Pets", "CP") {}
  // calldata is read only, use for funct inputs as params

  function createFoundraiser(string calldata _cid, uint _targetAmmount) public {
    fundraiserList[_totalFundraisers] = Fundraiser(_totalFundraisers, _cid, _targetAmmount, 0, msg.sender);
    emit FundraiserCreated(_totalFundraisers, _cid, _targetAmmount, msg.sender);
    _totalFundraisers++;
  }

  function donate(uint fundraiserId, uint amount, address donator, string calldata message ) public {
    Fundraiser storage fundraiser = fundraiserList[fundraiserId];
    fundraiser.totalDonations += amount;
    donationList[_totalDonations] = Donation(_totalDonations, fundraiserId, amount, donator, message);
    _totalDonations++;
  }

  function getAllFundraisers() public view returns (Fundraiser[] memory) {
    Fundraiser[] memory fundraiserArray = new Fundraiser[](_totalFundraisers);
    for (uint i = 0; i < _totalFundraisers; i++) {
        Fundraiser storage currentItem = fundraiserList[i];
        fundraiserArray[i] = currentItem;
    }
    return fundraiserArray;
  }


  function getDonationsByFundraiserId(uint fundraiser_id) public view returns (Donation[] memory) {
    uint256 count;
    for (uint256 i = 0; i < _totalDonations; i++) {
      if (donationList[i].fundraiser_id == fundraiser_id) {
        count++;
      }
    }
    // Create a new array to store donations with the specified fundraiser_id
    Donation[] memory donationsForFundraiser = new Donation[](count);
    uint256 currentIndex = 0;

    // Populate the new array with donations matching the fundraiser_id
    for (uint256 i = 0; i < _totalDonations; i++) {
        if (donationList[i].fundraiser_id == fundraiser_id) {
          donationsForFundraiser[currentIndex] = donationList[i];
          currentIndex++;
        }
    }
    return donationsForFundraiser;
  }

  function getFundraiser(uint _fundraiserId) public view returns (Fundraiser memory) {
      Fundraiser storage currentFundraiser = fundraiserList[_fundraiserId];
      return currentFundraiser;
  }

}



// // SPDX-License-Identifier: MIT
// // Deploy using remix
// //  grab the amount, wallet add, message
// //   save the message in ipfs
// //   save the  amount, wallet, cid in sc

// pragma solidity ^0.8.4;
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// contract Petfundme is ERC721URIStorage {
//   using Counters for Counters.Counter;
//   Counters.Counter public _totalNFTs;
//   uint public _totalFundraisers = 0;

//   mapping(uint => Fundraiser) public fundraiserList;

//   struct Fundraiser {
//     uint id;
//     string cid;
//     uint targetAmmount;
//     uint totalDonations;
//     address organizer;
//   }

//   event FundraiserCreated (
//     uint id,
//     string cid,
//     uint targetAmmount,
//     address organizer
//   );

//   constructor() ERC721("Community Pets", "CP") {}
//   // calldata is read only, use for funct inputs as params
//   function createFoundraiser(string calldata _cid, uint _targetAmmount) public {
//     fundraiserList[_totalFundraisers] = Fundraiser(_totalFundraisers, _cid, _targetAmmount, 0, msg.sender);
//     emit FundraiserCreated(_totalFundraisers, _cid, _targetAmmount, msg.sender);
//     _totalFundraisers++;
//   }

//   function donate(uint _donationId, uint _donationAmmount) public {
//     Fundraiser storage _postFoundraise = fundraiserList[_donationId];
//     _postFoundraise.totalDonations += _donationAmmount;
//   }

//   function getAllFundraisers() public view returns (Fundraiser[] memory) {
//       Fundraiser[] memory fundraiserArray = new Fundraiser[](_totalFundraisers);

//       for (uint i = 0; i < _totalFundraisers; i++) {
//           Fundraiser storage currentItem = fundraiserList[i];
//           fundraiserArray[i] = currentItem;
//       }
//       return fundraiserArray;
//   }

// }
