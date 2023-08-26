import React from "react";

const Content = ({ title, content }) => {
  return (
    <div>
      <h3 style={{ color: "white", marginLeft: "-50%" }}>
        Token Search Results
      </h3>
      <div className="Box">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Content;
// ----------------------
// Content.js
// Content.js
// import React from "react";

// const Content = ({ title, content }) => {
//   const boxStyles = {
//     backgroundColor: "#3E065F",
//     color: "white",
//     padding: "20px",
//     boxSizing: "border-box",
//     margin: "10px",
//     width: "calc(25% - 20px)",
//   };

//   return (
//     <div style={boxStyles}>
//       <h3>{title}</h3>
//       <p>{content}</p>
//     </div>
//   );
// };

// export default Content;
