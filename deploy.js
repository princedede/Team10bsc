const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(process.env.METAMASK_SEED,
    'https://rinkeby.infura.io/v3/8ba15bf654b648fcb9a07708c1dc1c05'
);

const web3 = new Web3(provider);

let contractInstance;
const deploy = async () => {
    //get accounts
    const accounts = await web3.eth.getAccounts();
    console.log("------Account [0]-------\n" +accounts[0])

    await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'},
            function (error, transactionHash) {
                console.log("transactionHash : " +transactionHash)
            })
        .then(function (newContractInstance) {
            console.log("newContractInstance " + newContractInstance.options.address)
            // instance with the new contract address
            contractInstance = newContractInstance;
            console.log("interface: \n" +interface);

        })
        .catch(error => { throw error})
}
deploy();
