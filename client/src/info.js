import React, { useState,useContext } from "react";
import { LoginContext } from "./LoginContext";


const Info = () => {
    const [state, setState] = useContext(LoginContext);
    return(<div>
{state.walletInfo && state.walletInfo.value.address}
</div>
    );
}; 
export default Info;