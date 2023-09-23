// RegistrationForm.js

// function RegisterForm({ onRegistration }) {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [isUsernameTaken, setIsUsernameTaken] = useState(false);

//   const handleRegister = async () => {
//     try {
//       // Check if the username is already taken
//       const response = await Axios.get(
//         `http://localhost:3001/checkUsername/${username}`
//       );
//       if (response.data.isTaken) {
//         setIsUsernameTaken(true);
//         return;
//       }

//       // Register the user if the username is available
//       await Axios.post("http://localhost:3001/registerUser", {
//         username,
//         name,
//       });

//       // Notify the parent component that registration is successful
//       onRegistration();

//       // Clear the form
//       setUsername("");
//       setName("");
//       setIsUsernameTaken(false);
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         required
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         required
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={handleRegister}>Register</button>
//       {/* <button>Register</button> */}

//       {/* {isUsernameTaken && <p>Username is already taken.</p>} */}
//     </div>
//   );
// }
import React, { useState } from "react";
import Axios from "axios";
function RegisterForm({ onRegistration }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/checkUsername/${username}`
      );
      if (response.data.isTaken) {
        setIsUsernameTaken(true);
        return;
      }

      const userResp = await Axios.post("http://localhost:3001/registerUser", {
        username,
        password,
      });
      console.log("user", userResp.data);

      onRegistration(userResp.data.user);

      setUsername("");
      setPassword("");
      setIsUsernameTaken(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const userResp = await Axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      console.log("user", userResp.data);

      onRegistration(userResp.data.user);

      setUsername("");
      setPassword("");
      setIsUsernameTaken(false);
    } catch (error) {
      console.error("Error Logginf in  user:", error);
    }
  };

  return (
    <>
      <div className="register-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          {isUsernameTaken && (
            <p className="error-message">Username is already taken.</p>
          )}
          <span className="or-text">OR</span>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
