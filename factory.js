import web3 from './web3';
import CampaignFactory from './contracts/CampaignCreator.json';

const instance = new web3.eth.Contract(CampaignFactory.abi,'0xaAcccd0E20E99adB4C9239B9531AF4719224C26E');

export default instance;