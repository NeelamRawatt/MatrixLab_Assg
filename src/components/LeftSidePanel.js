import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnity,
  faSquareFacebook,
  faSquareTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const LeftSidePanel = ({ isOpen, onTokenAddressClick, onPairAddressClick }) => {
  const panelStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "200px",
    height: "100vh",
    backgroundColor: "#333",
    color: "#A8A196",
    borderRadius: "0 20px 0 0",
    // left: isOpen ? 0 : "-200px",
  };

  const iconTextStyle = {
    display: "flex",
    cursor: "pointer",
    transition: "background-color 0.3s",
    paddingTop: "10px",
    paddingBottom: "20px",
    paddingLeft: "20%",
  };

  const iconTextStyle1 = {
    paddingRight: "20%",
    fontWeight: "bold",
    fontSize: "20px",
    paddingTop: "10px",
    paddingBottom: "20px",
  };

  const hoverStyles = {
    backgroundColor: "#F11A7B",
  };

  const [nftifyHovered, setNftifyHovered] = useState(false);
  const [tokenAddressHovered, setTokenAddressHovered] = useState(false);
  const [pairAddressHovered, setPairAddressHovered] = useState(false);

  return (
    <div style={panelStyles}>
      <div
        style={{
          paddingBottom: "170%",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            ...iconTextStyle1,
            ...(nftifyHovered ? hoverStyles : null),
          }}
          onMouseEnter={() => setNftifyHovered(true)}
          onMouseLeave={() => setNftifyHovered(false)}
          onClick={onTokenAddressClick}
        >
          <FontAwesomeIcon
            icon={faUnity}
            style={{ marginRight: "5px", marginTop: "2px" }}
          />
          <span>nFTify</span>
        </div>
        <div
          style={{
            ...iconTextStyle,
            ...(tokenAddressHovered ? hoverStyles : null),
          }}
          onClick={onTokenAddressClick}
          onMouseEnter={() => setTokenAddressHovered(true)}
          onMouseLeave={() => setTokenAddressHovered(false)}
        >
          <FontAwesomeIcon
            icon={faUnity}
            style={{ marginRight: "5px", marginTop: "2px" }}
          />
          <span>Token Address</span>
        </div>
        <div
          style={{
            ...iconTextStyle,
            ...(pairAddressHovered ? hoverStyles : null),
          }}
          onClick={onPairAddressClick}
          onMouseEnter={() => setPairAddressHovered(true)}
          onMouseLeave={() => setPairAddressHovered(false)}
        >
          <FontAwesomeIcon
            icon={faUnity}
            style={{ marginRight: "5px", marginTop: "2px" }}
          />
          <span>Pair Address</span>
        </div>
      </div>
      <div style={{ justifyContent: "space-evenly" }}>
        <FontAwesomeIcon
          icon={faSquareFacebook}
          style={{ height: "20px", color: "#F11A7B" }}
        />
        <FontAwesomeIcon
          icon={faLinkedin}
          style={{ marginLeft: "10px", height: "20px", color: "#F11A7B" }}
        />
        <FontAwesomeIcon
          icon={faSquareTwitter}
          style={{ marginLeft: "10px", height: "20px", color: "#F11A7B" }}
        />
      </div>
    </div>
  );
};

export default LeftSidePanel;
