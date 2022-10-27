import React from 'react';
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import jimboNFT from './JimboNFT.json';
import './App.css';
import shotcallers from "./assets/1.jpg";
import {Image} from '@chakra-ui/react';

// Assets
import Jimbo from "./assets/mascot.gif";

function App() {
  const [accounts, setAccounts] = useState([])
  const jimboNFTAddress = "0x1E036E89ce4A66ae0C5440aced0E51D79f6D22D6";
  const [mintAmount, setMintAmount] = useState(1);
  const [connectedWallet, changeConnectedWallet] = useState();
  const isConnected = Boolean(accounts[0]);
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 50) return;
    setMintAmount(mintAmount + 1);
  };
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts)
      changeConnectedWallet(accounts[0].slice(0, 6) + "..." + accounts[0].slice(-6, -1))
    };
  };
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        jimboNFTAddress,
        jimboNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0 * mintAmount).toString()),
        });
        console.log('response: ', response);
      } catch (err) {
        console.log("error: ", err)
      }
    }
  };
  
  return (
    <div class="App">
        <div class="scanline"></div>
      <div class="content clearfix">
      <div justify="space-between" align="left" padding="40px"> 
      <a2>Twitter  </a2>
      <a2>  Discord</a2>
      </div>
      <div justify="space-between" align="right" padding="40px">        
      {/*Right Side */}
        {isConnected ? (
          <div margin="0 15px">{connectedWallet}</div>
        ) : (
          <a3 onClick={connectAccount}> Connect Wallet </a3>
        )}
      </div> 
      <br></br>
      <div></div>

      {/* Main Mint */}
      <div justify="center" align="center" height="100vh" paddingBottom="150px">
        <div>
          <div>
            <div>
              <Image width = "120vh" src={shotcallers} max-width = "80%"></Image>
            </div>
          </div>
          {isConnected ? (
            <div>
              <div>
                <a 
                  onClick={() => handleDecrement()}
                >
                  -
                </a>
                <textarea readOnly value={mintAmount}/>
                <a
                  onClick={() => handleIncrement()}
                >
                  +
                </a>
              </div>
              <p>0.07 ETH | Max Mint: 5 per wallet</p>
              <div>
                <a
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  marginTop="10px"
                  onClick={handleMint} 
                >
                  MINT NOW
                </a>
              </div>
            </div>
          ) : (
            <text
              marginTop="20px"
              fontSize="25px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 3px #000000"
              color="#D6517D"
            > 
              You must be connected to Mint. 
            </text>
          )}
        </div>
      </div>
      </div>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <p><br></br><br></br><br></br><br></br><br></br><br></br></p>
      <div class="overlay"></div>
    </div>
  );
}

export default App;
