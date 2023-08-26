// MainNavBar.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import LeftSidePanel from "./LeftSidePanel";
const Navbar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsPanelOpen(true);
      } else {
        setIsPanelOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePanelToggle = () => {
    console.log("in fun");
    setIsPanelOpen(!isPanelOpen);
  };

  const iconStyle = {
    marginRight: "8px",
  };
  const btn = {
    backgroundColor: "#69104e",
    background: "linear-gradient(131deg, #7C0F35 0%, #581266 100%)",
    borderRadius: "15px",
    width: "100px",
    height: "40px",
    color: "white",
    border: "none",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    // background: "#120912",
    color: "white",
    background: "transparent",
  };

  return (
    <div style={navStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faBars}
          style={iconStyle}
          onClick={handlePanelToggle}
        />
        <span>NFTify</span>
      </div>
      <div style={{ position: "relative", marginLeft: "-40%" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            marginRight: "8px",
            borderRadius: "15px",
            height: "25px",
            width: "300px",
            padding: "3px",
            position: "relative",
            borderColor: "white",
            color: "white",
            backgroundColor: "transparent",
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            color: "white",
          }}
        />
      </div>

      <button style={btn} onClick={handlePanelToggle}>
        Connect
      </button>
      <LeftSidePanel isOpen={isPanelOpen} />
    </div>
  );
};

export default Navbar;
