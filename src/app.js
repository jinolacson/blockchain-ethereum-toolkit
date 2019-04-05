App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  contractInstance: null,
  desiredNetwork: '3', //ropsten network

  init: async () => {
    await App.initWeb3()
    await App.checkNetwork()
    await App.accountChange()
    await App.initContracts()
    await App.render()
    await App.getLatestBlock()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  initWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  checkNetwork : async() => {
    if (web3) {
      switch (web3.version.network) {
        case '1':
          console.log('This is mainnet');
          break;
        case '2':
          console.log('This is the deprecated Morden test network.');
          break;
        case '3':
          console.log('This is the ropsten test network.');
          break;
        case '4':
          console.log('This is the Rinkeby test network.');
          break;
        case '42':
          console.log('This is the Kovan test network.');
          break;
        default:
          console.log('This is an unknown network.');
      }
      if (web3.version.network !== App.desiredNetwork) {
        // ask user to switch to desired network
        alert('Please switch to ropsten network.');
      }
    }
  },

  accountChange : async() => {
    let account = web3.eth.accounts[0];
    let accountInterval = setInterval(() => {
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        if (account === undefined) {
          // if account changed to undefined, that means metamask is now locked
           window.location.reload(true);
        } else {
          // if account is not undefined, that means metamask is now unlocked
           window.location.reload(true);
        }
      }
    }, 1000);
  },

  initContracts: async () => {
    const contract = await $.getJSON('MyContract.json')
    App.contracts.MyContract = TruffleContract(contract)
    App.contracts.MyContract.setProvider(App.web3Provider)
  },

  /*getMyBalance : async() => {
    web3.eth.getBalance(web3.eth.accounts[0], (err, wei) => {
      console.log(web3.fromWei(wei, 'ether'))
    });
  },*/

 

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
    $('#account').html(App.account)

    // Load smart contract
    const contract = await App.contracts.MyContract.deployed()
    App.contractInstance = contract

    const value = await App.contractInstance.get()
    $('#value').html(value)
    $('#newValue').val(value)

    App.setLoading(false)
  },

  getLatestBlock : async() => {
      web3.eth.getBlockNumber(function(error, result){
          if(!error){
              console.log(result);
              document.getElementById('block').innerHTML = document.getElementById('block').innerHTML+"<br>"+result;
          }else{
            console.error(error);
          }
      });
  },

  set: async () => {
    App.setLoading(true)

    const newValue = $('#newValue').val()

    await App.contractInstance.set(newValue)
    window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    window.location.reload(true);
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.init()
  })
})