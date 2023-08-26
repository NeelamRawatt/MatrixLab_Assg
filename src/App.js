import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { faUnity } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

import LeftSidePanel from "./components/LeftSidePanel";

function App() {
  const boxContainerStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "20px",
    padding: "20px",
    marginLeft: "200px",
  };

  const boxStyles = {
    borderRadius: "10px",
    background: "#390554",
    color: "#F5F5F5",
    padding: "10px",
    boxSizing: "border-box",
    height: "130px",
    marginBottom: "20px",
    lineHeight: "4px",
    position: "relative",
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "60",
  };

  const iconStyles = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#960252",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconData = [
    { columnIndex: 0, icon: faCircleExclamation },
    { columnIndex: 1, icon: faUnity },
    { columnIndex: 2, icon: faUnity },
    { columnIndex: 3, icon: faDollarSign },
  ];

  const tokenAddressData = [
    [
      [
        "Basic Info :",
        "Pair created at: Etherum",
        "Symbol: Eth",
        "Dex Id: #7890",
        "Pair Address: #6754",
      ],
      [
        "Basic Info :",
        "Pair created at: Etherum",
        "Symbol: Eth",
        "Dex Id: #7890",
        "Pair Address: #6754",
      ],
      [
        "Basic Info :",
        "Pair created at: Etherum",
        "Symbol: Eth",
        "Dex Id: #7890",
        "Pair Address: #6754",
      ],
    ],
    [
      ["Base Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
      ["Base Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
      ["Base Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
    ],
    [
      ["Quote Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
      ["Quote Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
      ["Quote Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"],
    ],
    [
      ["Price:", "Price Native: ETH 7.00", "Price USD: 1.8m"],
      ["Price:", "Price Native: ETH 7.00", "Price USD: 1.8m"],
      ["Price:", "Price Native: ETH 7.00", "Price USD: 1.8m"],
    ],
  ];

  const pairAddressData = [
    [
      [
        "Basic Info :",
        "Pair created at: Etherum",
        "Symbol: Eth",
        "Dex Id: #7890",
        "Pair Address: #6754",
      ],
    ],
    [["Base Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"]],
    [["Quote Token :", "Name: Etherum", "Symbol: Eth", "Address: #7890"]],
    [["Price:", "Price Native: ETH 7.00", "Price USD: 1.8m"]],
  ];

  const [selectedAddressType, setSelectedAddressType] = useState(null);

  const handleTokenAddressClick = () => {
    setSelectedAddressType("Token");
  };

  const handlePairAddressClick = () => {
    setSelectedAddressType("Pair");
  };

  return (
    <div className="App">
      <Navbar />
      <div style={boxContainerStyles} className="boxContainer">
        {selectedAddressType === "Token"
          ? tokenAddressData.map((lines, columnIndex) => (
              <div key={columnIndex}>
                {lines.map((line, lineIndex) => (
                  <div key={lineIndex} style={boxStyles}>
                    {line.map((text, textIndex) => (
                      <p key={textIndex}>{text}</p>
                    ))}
                    {iconData.map((iconInfo, iconIndex) => {
                      if (iconInfo.columnIndex === columnIndex) {
                        return (
                          <div key={iconIndex} style={iconStyles}>
                            <FontAwesomeIcon icon={iconInfo.icon} />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            ))
          : selectedAddressType === "Pair"
          ? pairAddressData.map((lines, columnIndex) => (
              <div key={columnIndex}>
                {lines.map((line, lineIndex) => (
                  <div key={lineIndex} style={boxStyles}>
                    {line.map((text, textIndex) => (
                      <p key={textIndex}>{text}</p>
                    ))}
                    {iconData.map((iconInfo, iconIndex) => {
                      if (iconInfo.columnIndex === columnIndex) {
                        return (
                          <div key={iconIndex} style={iconStyles}>
                            <FontAwesomeIcon icon={iconInfo.icon} />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
      <LeftSidePanel
        isOpen={selectedAddressType !== null}
        onTokenAddressClick={handleTokenAddressClick}
        onPairAddressClick={handlePairAddressClick}
      />
      <Footer />
    </div>
  );
}

export default App;
