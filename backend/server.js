const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const storyModel = require("./models/Stories");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://neelam30rawat:fdKGNwKppaj06BaV@cluster0.58clcqf.mongodb.net/mern"
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Specify the field names for username and password
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Find the user by username in the database
        const user = await UserModel.findOne({ username });

        // If the user doesn't exist or the password is incorrect, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }

        // If authentication is successful, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// Registration endpoint
app.post("/registerUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken in the userStories collection
    console.log("in tryyyyyyy");
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      console.log("in tryyyyyyy11111");
      console.log("user already present -------");
      return res.status(400).json({ message: "Username already taken" });
    }

    // If the username is not taken, create a new user in the userStories collection
    const newUser = new UserModel({
      username,
      password,
    });
    console.log("username -----", username);

    console.log("in tryyyyyyy22222");

    // Save the user to the userStories collection
    await newUser.save();
    console.log("in tryyyyyyy333", newUser);

    // Return a success message
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Details incomplete" });
  }
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      if (user.password === password) {
        res.status(200).json({ message: "registration success", user: user });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Smething went wrong" });
  }
});

app.post("/submitStory", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const { prompt, story } = req.body;

  try {
    console.log(req.user);
    // Create a new story associated with the logged-in user
    const newStory = new storyModel({
      prompt,
      story,
      upvotes: 0,
      user: req.user._id, // Associate the story with the user
    });

    // Save the story to the database
    await newStory.save();

    res.status(201).json({ message: "Story submitted successfully" });
  } catch (error) {
    console.error("Error submitting story:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getAllStories/:userId", async (req, resp) => {
  try {
    const userId = req.params.userId;
    let storiesWithUsers = await storyModel
      .find()
      .populate({ path: "user" })
      .exec();
    const storyRes = storiesWithUsers.map((story) => {
      let upVotedByMe = false;
      if (story.upvotedBy.includes(userId)) {
        upVotedByMe = true;
      }

      // Add the upVotedByMe property directly to the story object
      story.set("upVotedByMe", upVotedByMe, { strict: false });

      return story; // Return the modified story object
    });
    console.log(storyRes);
    resp.json(storyRes);
  } catch (error) {
    console.error("Error fetching stories:", error);
    resp.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getDetails/:id", async (req, resp) => {
  try {
    const userId = req.params.id;
    let storiesWithUsers = await storyModel
      .find({ user: userId })
      .populate({ path: "user" })
      .exec();

    const storyRes = storiesWithUsers.map((story) => {
      let upVotedByMe = false;
      if (story.upvotedBy.includes(userId)) {
        upVotedByMe = true;
      }

      // Add the upVotedByMe property directly to the story object
      story.set("upVotedByMe", upVotedByMe, { strict: false });
      return story; // Return the modified story object
    });
    console.log(storyRes);
    resp.json(storyRes);
  } catch (error) {
    console.error("Error fetching stories:", error);
    resp.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setDetails", async (req, resp) => {
  const { story, user } = req.body;
  const storyToSave = {
    ...story,
    user: user._id,
    upVotedByMe: false,
  };
  const newStory = new storyModel(storyToSave);
  await newStory.save();
  await newStory.populate({ path: "user" });
  resp.json(newStory); //yaha story return kr rahe thi tum and isme _id nhi rahta
});
app.put("/upvote/:storyId/:userId", async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.params.userId;
    // Retrieve the story from the database
    const story = await storyModel.findById(storyId);
    if (story.upvotedBy.includes(userId)) {
      res.status(400).json({ message: "Already upvoted" });
      return;
    }
    story.upvotedBy.push(userId);
    // Increment the upvotes
    story.upvotes += 1;

    // Save the updated story with the new upvotes count
    await story.save();

    res.status(200).json({ message: "Upvote successful" });
  } catch (error) {
    console.error("Error upvoting story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/downVote/:storyId/:userId", async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const userId = req.params.userId;
    // Retrieve the story from the database
    const story = await storyModel.findById(storyId);
    if (!story.upvotedBy.includes(userId)) {
      res.status(400).json({ message: "Not upvoted yet" });
      return;
    }
    story.upvotedBy = story.upvotedBy.filter((id) => id != userId);
    // Increment the upvotes
    story.upvotes -= 1;

    // Save the updated story with the new upvotes count
    await story.save();

    res.status(200).json({ message: "Upvote successful" });
  } catch (error) {
    console.error("Error upvoting story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/checkUsername/:username", async (req, res) => {
  const { username } = req.params;
  console.log("heyyyy");
  try {
    const existingUser = await UserModel.findOne({ username });
    console.log("heyyyy2");

    if (existingUser) {
      // Username is already taken
      console.log("heyyyy3");

      res.json({ isTaken: true });
    } else {
      console.log("heyyyy4");

      // Username is available
      res.json({ isTaken: false });
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/mostUpvotedStories", async (req, res) => {
  try {
    const mostUpvotedStories = await storyModel
      .find({})
      .populate({ path: "user" })
      .sort({ upvotes: -1 })
      .exec();
    mostUpvotedStories.forEach((story) => {
      console.log(story?.upvotes);
    });
    res.json(mostUpvotedStories);
  } catch (error) {
    console.error("Error fetching most upvoted stories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getStory/:storyId", async (req, res) => {
  const storyId = req.params.storyId;

  try {
    // Fetch the story from the database based on storyId
    const story = await storyModel.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
