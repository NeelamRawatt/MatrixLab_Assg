// import "./App.css";
// // import StoryPromptForm from "./component/StoryPromptForm";
// // import StoryCard from "./component/StoryCard";
// // import { useState } from "react";
// function App() {
//   // const [stories, setStories] = useState([]); // Define and initialize stories state
//   // const addStory = (prompt, story) => {
//   //   const newStory = { prompt, story };
//   //   setStories([newStory, ...stories]);
//   // };
//   return (
//     <div className="App">
//       {/* <StoryPromptForm addStory={addStory} />

//       {stories.map((storyData, index) => (
//         <StoryCard
//           key={index}
//           prompt={storyData.prompt}
//           story={storyData.story}
//         />
//       ))} */}
//     </div>
//   );
// }

// export default App;
// -----------
import React, { useEffect, useState } from "react";
import "./App.css";
import StoryForm from "./component/StoryForm";
import StoryCard from "./component/StoryCard";
import Axios from "axios";
import RegisterForm from "./component/RegisterForm";
const dummyStory = {
  prompt: "A beautiful car",
  story: "bsadknsad",
  upvotes: 4,
};

function App() {
  const [stories, setStories] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isPromptEnabled, setIsPromptEnabled] = useState(false); // Add a state for enabling the prompt input
  const [user, setUser] = useState({});
  const [myStory, setMyStory] = useState(true);
  const fetchStories = async (user, myStory) => {
    try {
      if (!user._id) {
        return;
      }
      const subUrl = myStory ? "getDetails/" : "getAllStories/";
      const url = "http://localhost:3001/" + subUrl + user._id;
      console.log(url);
      const response = await Axios.get(url);
      const fetchedStories = response.data;
      setStories(fetchedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handleRegistration = (user) => {
    setUser(user);
    // setIsRegistrationOpen(false);
  };

  useEffect(() => {
    console.log("useEffect", myStory);
    fetchStories(user, myStory);
  }, [user, myStory]);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await Axios.post("http://localhost:3001/setDetails", {
        story: { prompt, story: "", upvotes: 0 },
        user: {
          _id: user?._id,
        },
      });
      const newStory = response.data;
      setStories((prev) => [...prev, newStory]);
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#F1EFEF",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>Story Prompter</h1>
      {!user._id ? (
        <RegisterForm onRegistration={handleRegistration} />
      ) : (
        <>
          <StoryForm onPromptSubmit={handlePromptSubmit} />
          <div className="story-container">
            <div>
              <button
                onClick={() => {
                  setMyStory(true);
                }}
              >
                My stories
              </button>
              <button
                onClick={() => {
                  setMyStory(false);
                }}
              >
                All stories
              </button>
            </div>
            {stories.map((story, index) => (
              <StoryCard key={index} story={story} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
