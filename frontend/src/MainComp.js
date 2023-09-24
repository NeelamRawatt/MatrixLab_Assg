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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import StoryDetail from "./component/StoryDetail";

const dummyStory = {
  prompt: "A beautiful car",
  story: "bsadknsad",
  upvotes: 4,
};

const buttonTypes = {
  MY_STORIES: "mystory",
  ALL_STORIES: "allsotries",
  MOST_UPVOTED: "most_upvoted",
};

function MainComp() {
  const [stories, setStories] = useState([]);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [isPromptEnabled, setIsPromptEnabled] = useState(false); // Add a state for enabling the prompt input
  const [user, setUser] = useState({});
  // const [myStory, setMyStory] = useState(true);
  const [showMostUpvoted, setShowMostUpvoted] = useState(false);
  const [mostUpvotedStories, setMostUpvotedStories] = useState([]);
  const [buttonType, setButtonType] = useState(buttonTypes.MY_STORIES);
  const fetchStories = async (user, buttonType) => {
    try {
      if (!user._id || buttonType === buttonTypes.MOST_UPVOTED) {
        return;
      }
      let subUrl;
      if (buttonType === buttonTypes.MY_STORIES) {
        subUrl = "getDetails/";
      } else {
        subUrl = "getAllStories/";
      }
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
    fetchStories(user, buttonType);
    buttonType === buttonTypes.MOST_UPVOTED && fetchMostUpvotedStories();
  }, [user, buttonType]);

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
  const fetchMostUpvotedStories = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/mostUpvotedStories"
      );
      const fetchedStories = response.data;
      setMostUpvotedStories(fetchedStories);
      setShowMostUpvoted(true);
    } catch (error) {
      console.error("Error fetching most upvoted stories:", error);
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
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          backgroundColor: "#F1EFEF",
          // shadow at bottom
          height: "50px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginLeft: "10px",
            position: "absolute",
            top: "5px",
            left: "0",
            right: "0",
          }}
        >
          Story Prompter
        </h1>
        <button
          style={{
            position: "absolute",
            top: "5px",
            right: "0",
          }}
        >
          {user._id && (
            <p
              onClick={() => {
                setUser({});
                setStories([]);
              }}
            >
              Logout
            </p>
          )}
        </button>
      </div>
      {!user._id ? (
        <RegisterForm onRegistration={handleRegistration} />
      ) : (
        <>
          <StoryForm onPromptSubmit={handlePromptSubmit} />
          <div>
            <button
              onClick={() => {
                setButtonType(buttonTypes.MY_STORIES);
              }}
              style={{
                backgroundColor:
                  buttonType === buttonTypes.MY_STORIES ? "#007bff" : "#C4C4C4",
              }}
            >
              My stories
            </button>
            <button
              onClick={() => {
                setButtonType(buttonTypes.ALL_STORIES);
              }}
              style={{
                backgroundColor:
                  buttonType === buttonTypes.ALL_STORIES
                    ? "#007bff"
                    : "#C4C4C4",
              }}
            >
              All stories
            </button>
            <button
              onClick={() => {
                setButtonType(buttonTypes.MOST_UPVOTED);
              }}
              style={{
                backgroundColor:
                  buttonType === buttonTypes.MOST_UPVOTED
                    ? "#007bff"
                    : "#C4C4C4",
              }}
            >
              Show Most Upvoted Stories
            </button>
          </div>
          <div className="story-container">
            {buttonType !== buttonTypes.MOST_UPVOTED &&
              stories.map((story, index) => (
                <StoryCard key={index} story={story} user={user} />
              ))}
            {buttonType === buttonTypes.MOST_UPVOTED &&
              mostUpvotedStories.map((story, index) => (
                <StoryCard key={index} story={story} user={user} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainComp;
