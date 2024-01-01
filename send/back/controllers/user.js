import User from "../models/User.js";

export const getNearestUsers = async (req, res) => {
  try {
    const { latitude, longitude, zipCode } = req.query;

    const nearestUser = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          spherical: true,
        },
      },
      //   { $sort: { distance: 1 } },
      { $limit: 5 },
    ]);

    res.json({ nearestUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateUser = async (req, res) => {
  let request = req.body;
  try {
    const userInfo = {
      ...req.body,
    };
    if ("profilepic" in req.body) {
      delete userInfo.profilePic;
    }
    if (req.file) {
      userInfo["profilepic"] = req.file.filename;
      // request.profilepic = data?.filename;
      if (!request) {
        return res.json("All input is required");
      }

      // let validation = new Validator(request, {

      //     firstname: 'required',
      //     lastname: 'required',
      //     email: 'required',
      //     phone: 'required',
      //     image: 'required'
      // });

      // if (validation.fails()) {

      //     let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0]
      //     return res.json(reply.failed(validation.errors.first(err_key)))
      // }

      let _id = req.params.userId;
      console.log(req.params.userId);

      const user = await User.findById(_id);
      if (!user) {
        return res.json("User not found!!");
      }

      // const userx = await User.findByIdAndUpdate(_id, userInfo);

      return res.status(200).json("User Updated Successfully");
    }
  } catch (err) {
    return res.json(err);
  }
};
