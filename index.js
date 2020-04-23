// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  try {
      // ask user for permission
      ethereum.enable()
      // user approved permission
  } catch (error) {
      // user rejected permission
      console.log('user rejected permission')
  }
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  // no need to ask for permission
}
else {
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)

// contractAddress and abi are setted after contract deploy
var contractAddress = '0xc864D0fef177A69aFa8E302A1b90e450910A4c3E';
var abi = JSON.parse( '[{"inputs": [{"internalType": "string","name": "_color","type": "string"}],"name": "setColor","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_especie","type": "string"}],"name": "setEspecie","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_fechaNacimiento","type": "uint256"}],"name": "setFechaNacimiento","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_infoAdicional","type": "string"}],"name": "setInfoAdicional","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_lugarNacimiento","type": "string"}],"name": "setLugarNacimiento","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_microchip","type": "uint256"}],"name": "setMicrochip","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_nombreMascota","type": "string"}],"name": "setNombreMascota","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_personalidad","type": "string"}],"name": "setPersonalidad","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_raza","type": "string"}],"name": "setRaza","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_sexo","type": "string"}],"name": "setSexo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_veterinario","type": "string"}],"name": "setVeterinario","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getColor","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getEspecie","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getFechaNacimiento","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getInfoAdicional","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getLugarNacimiento","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getMicrochip","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getNombreMascota","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getPersonalidad","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getRaza","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getSexo","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getVeterinario","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]');


//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
//Poner funciones de registro de mascotas

function registroSetNombreMascota() {
  nombreMascota = $("#newNombreMascota").val();
  contract.methods.setNombreMascota (_nombreMascota).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  $("#newNombreMascota").val('');
}
/*
function registroSetEspecieMascota() {
  nombreMascota = $("#newEspecieMascota").val();
  contract.methods.setEspecieMascota (especieMascota).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  $("#newNombreMascota").val('');
}

function registerSetInfo() {
  info = $("#newInfo").val();
  contract.methods.setInfo (info).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  $("#newInfo").val('');
} */

function registerGetInfo() {
  contract.methods.getInfo().call().then( function( info ) { 
    console.log("info: ", info);
    document.getElementById('lastInfo').innerHTML = info;
  });    
}

function registroGetNombreMascota() {
  contract.methods.getNombreMascota().call().then( function( nombreMascota ) { 
    console.log("info: ", nombreMascota);
    document.getElementById('nombreMascota').innerHTML = nombreMascota;
  });    
}