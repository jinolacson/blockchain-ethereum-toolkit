# blockchain-ethereum-toolkit
Simple ethereum blockchain demonstration using infura.io, ethereum protocol, metamask and truffle framework

# INSTALLATION

1. Install dependencies
	- npm install

2. Create infura test account:
 	- https://infura.io/

3. Supply your .env with your newly created infura details:
	- INFURA_KOVAN_API_KEY=
	- INFURA_ROPSTEN_API_KEY=
	- MNEMONIC="something metamask secret paragraph here"

4. Deploy smart contract(choose: kovan): 
	- sudo truffle migrate --network ropsten|kovan|development --reset --compile-all

5. Run:
	- npm run dev

# List of sample local configuration

 -ONLINE COMPILER: https://remix.ethereum.org
 -REMIX COMPILER VERSION: 0.5.5-nightly.2019.2.19+commit.d9e4a10d.Emscripten.clang

 -DOCUMENTATION: https://solidity.readthedocs.io/en/v0.5.6/installing-solidity.html
 -VERSION: solcjs --version
 -OUTPUT: 0.5.5+commit.47a71e8f.Emscripten.clang
 
 -VERSION: solc --version
 -OUTPUT: 0.5.2+commit.1df8f40c.Linux.g++
 
 -COMPILE FOR ABI:
 -solc --evm-version byzantium test.sol --abi -o build 
 
 -COMPILE FOR BIN:
 -solc --evm-version byzantium test.sol --bin -o build





 # TRUFFLE FRAMEWORK:
 - https://truffleframework.com/boxes
   
 # ONLINE IDE:
 - https://remix.ethereum.org
  
 # DOCUMENTATIONS AND RESOURCES:
- http://www.dappuniversity.com/articles/blockchain-developer-toolkit  
- https://ylv.io/10-web3-metamask-use-cases-ever-blockchain-developer-needs/
   
 # BLOCK CHECKER:
 - ropsten: https://ropsten.etherscan.io
 - kovan:   https://kovan.etherscan.io/
