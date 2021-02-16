import Web3 from 'web3';

let web3;

if( typeof window !=='undefined' && typeof window.web3 !=='undefined')
{
    //we in in browser and metamask is installed
    web3 = new Web3(window.web3.currentProvider);
}
else
{
    //On server or metamask not installed
    const provider = new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/bb21d84758a84428ad3dd0768728748b'
    );//using infura provider
    web3 = new Web3(provider);
}
export default web3;