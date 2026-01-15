// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint goal;
        uint deadline;
        uint amountRaised;
        bool withdrawn;
    }

    uint public campaignCount = 0;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => mapping(address => uint)) public contributions;

    event CampaignCreated(uint indexed campaignId, address indexed owner, string title, uint goal);
    event ContributionMade(uint indexed campaignId, address indexed contributor, uint amount);
    event FundsWithdrawn(uint indexed campaignId, address indexed owner, uint amount);
    event RefundProcessed(uint indexed campaignId, address indexed contributor, uint amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _goal,
        uint _durationInSeconds
    ) public {
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInSeconds > 0, "Duration must be greater than 0");

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            owner: msg.sender,
            title: _title,
            description: _description,
            goal: _goal,
            deadline: block.timestamp + _durationInSeconds,
            amountRaised: 0,
            withdrawn: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal);
    }

    function contribute(uint _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];

        require(_campaignId > 0 && _campaignId <= campaignCount, "Campaign does not exist");
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Contribution amount must be greater than 0");

        campaign.amountRaised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function withdraw(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];

        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        require(campaign.amountRaised >= campaign.goal, "Goal not reached");
        require(!campaign.withdrawn, "Already withdrawn");

        campaign.withdrawn = true;
        payable(campaign.owner).transfer(campaign.amountRaised);

        emit FundsWithdrawn(_campaignId, campaign.owner, campaign.amountRaised);
    }

    function refund(uint _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];

        require(block.timestamp > campaign.deadline, "Campaign still active");
        require(campaign.amountRaised < campaign.goal, "Goal was reached, no refund");

        uint refundAmount = contributions[_campaignId][msg.sender];
        require(refundAmount > 0, "Nothing to refund");

        contributions[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(refundAmount);

        emit RefundProcessed(_campaignId, msg.sender, refundAmount);
    }

    function getCampaign(uint _campaignId) public view returns (Campaign memory) {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Campaign does not exist");
        return campaigns[_campaignId];
    }

    function getContributionAmount(uint _campaignId, address _contributor) public view returns (uint) {
        return contributions[_campaignId][_contributor];
    }
}
