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
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import StoryDetail from "./component/StoryDetail";
import MainComp from "./MainComp";

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
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainComp />,
    children: [
      {
        path: "story/:storyId",
        element: <Contact />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
