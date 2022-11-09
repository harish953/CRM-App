//this will contain
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

/**
 * fetch all the Users
 * only admin is allowed to call this method
 * admin should be able to filter bse:
 * 1.Name 2.userType3.userStatus
 */

exports.findAllUsers = async (req, res) => {
    /**
     * code to fetch all the Users from the db
     *
     */
    const nameReq = req.query.name;
    const userStatusReq = req.query.userStatus;
    const userTypeReq = req.query.userType;

    const mongoQueryObject = {};

    if (nameReq && userStatusReq && userTypeReq) {
        mongoQueryObject.name = nameReq;

        mongoQueryObject.userStatus = userStatusReq;
        mongoQueryObject.userType = userTypeReq;
    } else if (nameReq && userStatusReq) {
        mongoQueryObject.name = nameReq;
        mongoQueryObject.userStatus = userStatusReq;
    } else if (userTypeReq && userStatusReq) {
        mongoQueryObject.userStatus = userStatusReq;
        mongoQueryObject.userType = userTypeReq;
    } else if (nameReq && userTypeReq) {
        mongoQueryObject.name = nameReq;
        mongoQueryObject.userType = userTypeReq;
    } else if (nameReq) {
        mongoQueryObject.name = nameReq;
    } else if (userTypeReq) {
        mongoQueryObject.userType = userTypeReq;
    } else if (userStatusReq) {
        mongoQueryObject.userStatus = userStatusReq;
    }

    //fetch all the user document from user users collection
    try {
        const users = await User.find(mongoQueryObject); //user password will also be returned
        return res.status(200).send(objectConverter.userResponse(users));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "internal error while fetching all users",
        });
    }
};

/**
 * fetch the user abased on userId
 */

exports.findUserById = async (req, res) => {
    const userIdReq = req.params.userId; //reading from request parameter

    const user = await User.find({ userId: userIdReq });

    if (user) {
        res.status(200).send(objectConverter.userResponse(user));
    } else {
        res.status(200).send({
            message: "User with id " + userIdReq + " does not exist",
        });
    }
};
