import React, { useEffect, useState } from "react";
import Axios from "axios";
import StoryCard from "./StoryCard";

function StoryDetail({ match }) {
  const [story, setStory] = useState(null);
  const storyId = match.params.storyId;

  useEffect(() => {
    // Fetch the story details based on the storyId
    Axios.get(`http://localhost:3001/getStory/${storyId}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching story details:", error);
      });
    console.log("in useEffect--------------------");
  }, [storyId]);

  return (
    <div>
      {story ? (
        // Render the story card here based on the fetched story data
        <StoryCard story={story} />
      ) : (
        // Handle loading or error state
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StoryDetail;
