import React from 'react';
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import jimboNFT from './JimboNFT.json';
import './App.css';
import { Box, Button, Flex, Image, Link, Spacer, Input, Text } from '@chakra-ui/react';

// Assets
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Linkedin from "./assets/social-media-icons/linkedIn_32x32.png";
import Opensea from "./assets/social-media-icons/opensea_32x32.png";
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
    <div className="overlay">
      <div className="App">
        {/* Left Side */}
        <Flex justify="space-between" align="center" padding="40px">
          <Flex justify="space-around" width="auto" padding="0 25px">
            <Link href="https://www.opensea.io">
              <Image height="5vh" src={Opensea}/>
            </Link>
          </Flex>
          <Flex justify="space-around" width="auto" padding="0 25px">
            <Link href="https://discord.gg/psg3qjfq">
              <Image height="5vh" src={Discord}/>
            </Link>
          </Flex>
          <Flex justify="space-around" width="auto" padding="0 25px">
            <Link href="https://www.twitter.com">
              <Image height="5vh" src={Twitter}/>
            </Link>
          </Flex>
          <Flex justify="space-around" width="auto" padding="0 25px">
            <Link href="https://www.linkedin.com/">
              <Image height="5vh" src={Linkedin}/>
            </Link>
          </Flex>
        
        {/*Right Side */}
          <Spacer />
          {isConnected ? (
            <Box margin="0 15px">{connectedWallet}</Box>
          ) : (
            <Button 
              backgroundColor="#D6517D"
              borderRadius="10px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px 25px"
              margin="0 15px"
              onClick={connectAccount}>
              
              Connect
            </Button>
          )}
        </Flex> 

        {/* Main Mint */}
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
          <Box width="520px">
            <div>
              <Image 
                align="center" 
                justify="center" 
                height = "50vh" 
                paddingBottom= "20px" 
                src={Jimbo}
              />
              <p>JIMBO : Just Jimbo</p>
            </div>
            {isConnected ? (
              <div>
                <Flex align="center" justify="center">
                  <Button 
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    marginTop="10px"
                    onClick={() => handleDecrement()}
                  >
                    -
                  </Button>
                  <Input
                    readOnly
                    fontFamily="inherit"             
                    width="100px"
                    height="40px"
                    textAlign={'center'}
                    paddingLeft="19x"
                    marginTop="10px"
                    type="number"
                    value={mintAmount}
                  />
                  <Button 
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    marginTop="10px"
                    onClick={() => handleIncrement()}
                  >
                    +
                  </Button>
                </Flex>
                <div>
                  <Button 
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
                  </Button>
                </div>
              </div>
            ) : (
              <Text
                marginTop="20px"
                fontSize="25px"
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 3px #000000"
                color="#D6517D"
              > 
                You must be connected to Mint. 
              </Text>
            )}
          </Box>
        </Flex>
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
