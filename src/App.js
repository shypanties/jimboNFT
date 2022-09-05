import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import jimboNFT from './JimboNFT.json';
import './App.css';

// adds
import jimbo from "./assets/jimbo.png";
import jimboSmile from './smilingjimboforwebsite.png';
import openseaImage from './assets/Logomark-Blue.png';
import discord from './assets/discord.png';
import twitterIcon from './assets/Twitter.png';
import linkedInIcon from './assets/linkedIn.png';
import fly from "./assets/flypng3.png";
import gif from './assets/giphy3.gif';
import ReactPlayer from 'react-player';

function App() {
  const [accounts, setAccounts] = useState([])
  const [hover, setHover] = useState();
  const [hover2, setHover2] = useState();
  const [hover3, setHover3] = useState();

  const jimboNFTAddress = "0xE9246aE663DC7317B6594a7fCb1708bB75B66D25";

  const handleMouseIn = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setHover(false);
  };

  const handleMouseIn2 = () => {
    setHover2(true);
  };
  const handleMouseOut2 = () => {
    setHover2(false);
  };

  const handleMouseIn3 = () => {
    setHover3(true);
  };
  const handleMouseOut3 = () => {
    setHover3(false);
  };

  const [mintAmount, setMintAmount] = useState(1);

  const [connectedWallet, changeConnectedWallet] = useState();

  const isConnected = Boolean(accounts[0]);



  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 10) return;
    setMintAmount(mintAmount + 1);
  };

  

  async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts)
        changeConnectedWallet(accounts[0].slice(0,6) + "..." + accounts[0].slice(-6,-1))
        
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
                value: ethers.utils.parseEther((0.069 * mintAmount).toString()),
            });
            console.log('response: ', response);
        } catch (err) {
            console.log("error: ", err)
        }
    }
  };
  
  return (
    
    <div className="App" style={{ 
      backgroundImage: `url(${gif})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      overflow:'hidden',
      backgroundSize: 'cover',
      minWidth: '100%',
      minHeight: '100%',
      minHeight:'100vh',
      
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <div style ={{display: 'flex',justifyContent:'flex-end', background: 'pink', 
      border: '0.002px solid white', alignItems: 'right', minHeight:'100px', maxHeight:'100px', verticalAlign:'center'}}>

        <form action="http://www.linkedin.com/in/jimbojimbo" style={{maxWidth:'200px',maxHeight:'60px', width:'40%',  height:'10%', marginLeft:'2%', alignSelf:'center',marginRight: '20px', marginTop:"-10px"}}>
       <input type="image" style={{borderRadius:'25px',boxShadow: '4px 5px #888888', backgroundColor:'white' , borderColor:'black',  width:'100%', height:'100%', padding: '8px'}}src={linkedInIcon} alt="sa"/> 
       </form>
       <form action="https://www.iconfinder.com/icons/107159/circle_linkedin_icon" style={{maxWidth:'60px', maxHeight:'60px',width:'10%', height:'10%', marginLeft:'2%', alignSelf:'center'}}>
       <input type="image" style={{boxShadow: '4px 5px #888888', borderColor:'black',borderRadius: "50%", marginLeft:'2%', width:'100%', height:'100%'}}src={openseaImage} alt="sa"/> 
       </form>
       <form action="https://discord.gg/MrMDn8NVvx" style={{maxWidth:'60px', maxHeight:'60px',width:'10%', height:'10%', marginLeft:'2%', alignSelf:'center'}}>
       <input type="image" style={{boxShadow: '4px 5px #888888', borderColor:'black',borderRadius: "50%", marginLeft:'2%', width:'100%', height:'100%'}}src={discord} alt="sa"/> 
       </form>
       <form action="https://twitter.com/42069jimbo69420" style={{maxWidth:'60px', maxHeight:'60px',width:'10%', height:'10%', marginLeft:'2%', alignSelf:'center'}}>
       <input type="image" style={{boxShadow: '4px 5px #888888', borderColor:'black',borderRadius: "50%", marginLeft:'2%', width:'100%', height:'100%'}}src={twitterIcon} alt="sa"/> 
       </form>

       {isConnected ? (
                <button style={{width:'150px', height:'40px',cursor: 'pointer' ,boxShadow: '4px 5px #888888',marginLeft:'2%', fontFamily: "Comic Sans MS", alignSelf:'center', marginRight:'2%'}}>{connectedWallet}</button>
            ) : (
        <button style={{width:'150px', height:'40px',cursor: 'pointer' ,boxShadow: '4px 5px #888888',marginLeft:'2%', fontFamily: "Comic Sans MS", alignSelf:'center', marginRight:'2%'}} onClick={connectAccount}>Connect Wallet</button>)}
      </div>
    
      <div style ={{justifyContent:'center'}}>
        
      <img src={hover?  jimboSmile: jimbo}  alt="logo"  style ={{marginLeft:'auto', marginRight:'auto', minHeight:'500px',minWidth:'500px',maxHeight:'800px',maxWidth:'800px',width:'50%',height:'50%'}}/>
        {isConnected ? (
          <div style= {{justifyContent:'center', alignContent: 'center'}}>
          
          <div style={{display:"flex", flexDirection:'row', justifyContent:'center'}}>
            <button onClick={() =>handleDecrement()} onMouseOver={handleMouseIn2} onMouseOut={handleMouseOut2} 
            style= {hover2?{border:'5px solid yellow',cursor:'pointer',fontSize:'30px',height: '40px', width: '40px',borderRadius:'50%'}: {cursor:'pointer',fontSize:'30px',height: '40px', width: '40px',borderRadius:'50%'}}>-</button>

            <h1 style={{fontSize: '20px', marginLeft: '20px', marginRight: '20px'}}>
            {mintAmount}/10 </h1>
        
            <button onClick={() =>handleIncrement()} onMouseOver={handleMouseIn3} onMouseOut={handleMouseOut3} 
            style= {hover3?{border:'5px solid yellow',cursor:'pointer',fontSize:'30px',height: '40px', width: '40px',borderRadius:'50%'}: {cursor:{fly},fontSize:'30px',height: '40px', width: '40px',borderRadius:'50%'}}>+</button>
          </div>
          <div>
          <button onClick={handleMint} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}  
          style={hover? {alignSelf: 'center', minHeight:'80px',minWidth:'80px', cursor:'pointer',width:'17%', height:'7%',border:'5px solid yellow', fontFamily: "Comic Sans MS", fontSize: '100%'}: {minHeight:'80px',minWidth:'80px',cursor:'pointer',boxShadow: '2px 2px #888888',width:'17%', height:'7%',fontFamily: "Comic Sans MS", fontSize: '100%', alignSelf: 'center'}}>Mint Now</button>
        </div>
      
        </div>
          
        ) : (

          <div style= {{justifyContent:'center', alignContent: 'center'}}>
          
          <p style={{textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000',alignSelf:'center',color:'white',fontWeight:'900',marginLeft:'auto', marginRight:'auto',height:'80px',width:'300px',backgroundImage:'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)',fontFamily: "Comic Sans MS", fontSize: '150%', borderRadius:'25px'}}> You must be connected to Mint.</p>
          
          </div>
        )}
      </div>
      

     <ReactPlayer loop={true} style={{justifyContent:'center', marginTop:'50px', margin:'20px'}} width='250px' height='200px'url="https://soundcloud.com/dolan-dark/axel-f-dolan-dark-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"/>
    </div>
  );
}

export default App;
