import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";
import initialize from "./initialize";


const WalletMenu = ({handleClose}) => {
  const [menuOption, setMenuOption] = useState("main");
  const [state, setState] = useContext(LoginContext);



  const handleOptionClick = option => {
    setMenuOption(option);
  };

  const handleSubmitSeed = async (e) => {
    
        e.preventDefault()
        let pass = e.target.pass.value
        let seed = e.target.seed.value
        console.log(state)
        if(!state.initialized){
          const init = await initialize()
   await setState({...state,"initialized":init})
     console.log(state)
     const walletInfo = window.RecoverWalletFromSeed(pass,seed)
     const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
     const decoder = new TextDecoder();
     const jsonString = decoder.decode(arrayBuffer);
     const jsonObject = JSON.parse(jsonString);
     const fileData=JSON.stringify(jsonObject)
 
     let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
     console.log(err)
     console.log(walletInfo)

     setState({...state,"walletInfo":walletInfo})
        }
        

      
        if (state.initialized) {
         
          const walletInfo = window.RecoverWalletFromSeed(pass,seed)
        const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(arrayBuffer);
        const jsonObject = JSON.parse(jsonString);
        const fileData=JSON.stringify(jsonObject)
    
        let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
        console.log(err)
        console.log(walletInfo)

        setState({...state,"walletInfo":walletInfo})

        }
     
       
    
    
}

const handleSubmitHexSeed = async (e) => {
    
  e.preventDefault()
  let pass = e.target.pass.value
  let seed = e.target.seed.value
  console.log(state)
  if(!state.initialized){
    const init = await initialize()
await setState({...state,"initialized":init})
console.log(state)
const walletInfo = window.RecoverWalletFromHexSeed(pass,seed)
const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
const decoder = new TextDecoder();
const jsonString = decoder.decode(arrayBuffer);
const jsonObject = JSON.parse(jsonString);
const fileData=JSON.stringify(jsonObject)

let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
console.log(err)
console.log(walletInfo)

setState({...state,"walletInfo":walletInfo})
  }
  


  if (state.initialized) {
   
    const walletInfo = window.RecoverWalletFromHexSeed(pass,seed)
  const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(arrayBuffer);
  const jsonObject = JSON.parse(jsonString);
  const fileData=JSON.stringify(jsonObject)

  let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
  console.log(err)
  console.log(walletInfo)

  setState({...state,"walletInfo":walletInfo})

  }

 


}

const handleSubmitCreateNewWallet = async (e) => {
    
  e.preventDefault()
  let pass = e.target.pass.value
  console.log(state)
  if(!state.initialized){
    const init = await initialize()

console.log("state",state)
const walletInfo = window.CreateNewWallet(pass)
const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
const decoder = new TextDecoder();
const jsonString = decoder.decode(arrayBuffer);
const jsonObject = JSON.parse(jsonString);
const fileData=JSON.stringify(jsonObject)

let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
console.log(err)
console.log(walletInfo)

setState({...state,"walletInfo":walletInfo,"initialized":init})
  }
  


  if (state.initialized) {
   
    const walletInfo = window.CreateNewWallet(pass)
  const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(arrayBuffer);
  const jsonObject = JSON.parse(jsonString);
  const fileData=JSON.stringify(jsonObject)

  let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
  console.log(err)
  console.log(walletInfo)

  setState({...state,"walletInfo":walletInfo})

  }

 


}

const handleSubmitDisk = async (e) => {
    
  e.preventDefault()
  console.log(e.target.file.value)
  let pass = e.target.pass.value
  let file = await e.target.file.files[0].text()

  
  
  if(!state.initialized){
    const init = await initialize()
await setState({...state,"initialized":init})
console.log(state)
const walletInfo = window.RecoverWalletFromDisk(pass,file)
const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
const decoder = new TextDecoder();
const jsonString = decoder.decode(arrayBuffer);
const jsonObject = JSON.parse(jsonString);
const fileData=JSON.stringify(jsonObject)

let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
console.log(err)
console.log(walletInfo)

setState({...state,"walletInfo":walletInfo})
  }
  


  if (state.initialized) {
   
    const walletInfo = window.RecoverWalletFromDisk(pass,file)
  const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(arrayBuffer);
  const jsonObject = JSON.parse(jsonString);
  const fileData=JSON.stringify(jsonObject)

  let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
  console.log(err)
  console.log(walletInfo)

  setState({...state,"walletInfo":walletInfo})

  }

 


}

const renderMainMenu = () =>{
  return(
    <div className="menu">
      <button onClick={()=>handleClose()}>X</button>
      <div><h3>RPC Wallet</h3></div>
      <div><h3>Integrated Wallets</h3>
      <button onClick={()=>handleOptionClick("addWallet")}>Add Wallet</button></div>
    </div>
  )
}


  const renderAddWalletMenu = () => {
    return (
      <div className="menu">
        <button onClick={()=>handleOptionClick("main")}>Back</button>
        <button onClick={handleClose}>X</button>
        <h2>Select an option:</h2>
        <div className="menu-options">
        <div className="menu-option" onClick={() => handleOptionClick("Fast Registration")}>Fast Registration</div>
        <div className="menu-option" onClick={() => handleOptionClick("Create New Wallet")}>Create New Wallet</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Seed")}>Recover From Seed</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Hex Seed")}>Recover From Hex Seed</div>
        <div className="menu-option" onClick={() => handleOptionClick("Recover From Disk")}>Recover From Disk</div>
        </div>
      </div>
    );
  };

  const renderOptionMenu = () => {
    return (
      <div className="menu">
        <button onClick={() => handleOptionClick("main")}>Back</button>
        {renderInputFields()}
      </div>
    );
  };

  const renderInputFields = () => {
    switch (menuOption) {
      case "Fast Registration":
        return <input type="text" placeholder="Enter your email"></input>;
      case "Create New Wallet":
        return <form onSubmit={handleSubmitCreateNewWallet}>
          {state&&JSON.stringify(state)}
          <input type="password" placeholder="Enter a password" id="pass"/>
          <button type={"submit"}>Submit</button>
          </form>;
      case "Recover From Seed":
        return <form onSubmit={handleSubmitSeed}>
        <p>Seed</p>
        <input type="text" name="" id="seed" placeholder="Enter your seed phrase"/>
        
        <input type="password" id="pass" placeholder="Enter a password"/>
        <button type={"submit"}>Submit</button>
      </form>;
      case "Recover From Hex Seed":
        return <form onSubmit={handleSubmitHexSeed}>
        
        <input type="text" name="" id="seed" placeholder="Enter your hex seed"/>
        <p>Password</p>
        <input type="password" id="pass" placeholder="Enter a password"/>
        <button type={"submit"}>Submit</button>
      </form>;
      case "Recover From Disk":
        return <form onSubmit={handleSubmitDisk}>
          <input type="password" id="pass" placeholder="Enter password"/>
          <input type="file" id="file"/>
          <button type={"submit"}>Submit</button>
          </form>;
      default:
        return null;
    }
  };

  return menuOption === "main" ? renderMainMenu() : menuOption === "addWallet" ? renderAddWalletMenu() : renderOptionMenu();
};

export default WalletMenu;
