import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const WalletMenu = () => {
  const [menuOption, setMenuOption] = useState("main");
  const [state, setState] = useContext(LoginContext);

  const handleOptionClick = option => {
    setMenuOption(option);
  };

  const handleSubmitSeed = async (e) => {
    
        e.preventDefault()
        let pass = e.target.pass.value
        let seed = e.target.seed.value
        console.log(window)
        await new Promise(resolve => {
            window.Initialize("mainnet","https://dero-api.mysrv.cloud")
            const handleConnected = () => {
                
                resolve()
             }
             
             console.log('waiting for connection...');
             console.log = (function(old_function, handleConnected){
                 return function(text){
                     if (text === 'successfully connected') {
                         handleConnected();
                     }
                     old_function.apply(console, arguments);
                 }
             })(console.log, handleConnected);
             
            ;
        });
        const walletInfo = window.RecoverWalletFromSeed(pass,seed)
        const arrayBuffer = new Uint8Array(walletInfo.value.fileData).slice();
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(arrayBuffer);
        const jsonObject = JSON.parse(jsonString);
        const fileData=JSON.stringify(jsonObject)
    
        let err=  window.OpenWallet(walletInfo.value.hexSeed,pass,fileData,true)
        console.log(err)
        console.log(walletInfo)

        setState({"walletInfo":walletInfo})
    
    
}


  const renderMainMenu = () => {
    return (
      <div className="menu">
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
        return <input type="password" placeholder="Enter a password"></input>;
      case "Recover From Seed":
        return <form onSubmit={handleSubmitSeed}>
        <p>Seed</p>
        <input type="text" name="" id="seed" />
        <p>Password</p>
        <input type="password" id="pass"/>
        <button type={"submit"}>Submit</button>
      </form>;
      case "Recover From Hex Seed":
        return <input type="text" placeholder="Enter your hex seed"></input>;
      case "Recover From Disk":
        return <input type="file"></input>;
      default:
        return null;
    }
  };

  return menuOption === "main" ? renderMainMenu() : renderOptionMenu();
};

export default WalletMenu;
