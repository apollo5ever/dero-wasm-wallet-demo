import React, { useState } from "react";
import WalletMenu from "./menu";

function PopUpMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Menu</button>
      {isOpen && (
        <WalletMenu/>
      )}
    </div>
  );
}

export default PopUpMenu;
