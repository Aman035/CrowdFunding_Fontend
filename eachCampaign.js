import web3 from './web3';
import Campaign from './contracts/Campaign.json';

export default function EachCampaign(address){
    return new web3.eth.Contract(Campaign.abi,address);
}
