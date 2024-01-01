import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });
    const userInfo = {
      ...user,
      token: token,
    };
    res.status(201).json({ ...userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const register = async (req, res) => {
  try {
    // await user.save();

    const { name, email, password } = req.body;
    // const body = JSON.parse(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const location = JSON.parse(req.body.location);

    const user = new User({
      ...req.body,
      name: name,
      email: email,
      password: hashedPassword,
      location: location,
    });
    if ("profilepic" in req.body) {
      delete user.profilePic;
    }
    // return res.json(user);
    // If you're storing the profile picture in the database, you can add it here
    if (req.file) {
      user["profilepic"] = req.file.filename; // Buffer of the profile picture file

      await user.save();

      const userInfo = {
        ...user,
      };
      return res.status(201).json({ userInfo });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const generateDummyUsers = async (count) => {
  const dummyUsers = [];
  const location = [
    {
      location: "New York City, USA",
      longitude: 37.0902,
      latitude: -95.7129,
    },
    {
      location: "Tokyo, Japan",
      longitude: 35.6895,
      latitude: 139.6917,
    },
    {
      location: "Sydney, Australia",
      longitude: -33.8688,
      latitude: 151.2093,
    },
    {
      location: "Paris, France",
      longitude: 48.8566,
      latitude: 2.3522,
    },
    {
      location: "Rio de Janeiro, Brazil",
      longitude: -22.9068,
      latitude: -43.1729,
    },
    {
      location: "Cape Town, South Africa",
      longitude: -33.9249,
      latitude: 18.4241,
    },
    {
      location: "Moscow, Russia",
      longitude: 55.7558,
      latitude: 37.6176,
    },
    {
      location: "Beijing, China",
      longitude: 39.9042,
      latitude: 116.4074,
    },
    {
      location: "Toronto, Canada",
      longitude: 43.6511,
      latitude: -79.383,
    },
  ];
  for (let i = 0; i < location.length; i++) {
    const newUser = {
      name: "Akshay",
      email: "aksy@gmail.com" + i,
      password: "Test@123",
      phone: "9988677665" + i,
      mobile: "9988977665" + i,
      zipcode: "20802" + i,
      location: {
        type: "Point",
        coordinates: [location[i].latitude, location[i].longitude],
      },
    };
    dummyUsers.push(newUser);
  }
  try {
    const savedUsers = await User.insertMany(dummyUsers);
    console.log(`${count} dummy users saved successfully:`, savedUsers);
  } catch (error) {
    console.error("Error saving dummy users:", error);
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(201).json(user);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });
    const userInfo = {
      ...user.toObject(), // Convert Mongoose document to plain JavaScript object
      token,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
