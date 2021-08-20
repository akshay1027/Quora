const UserModel = require('../Model/Users');

//= ================================================== Get Users ==================================================

const GetAllUsers = async (request, response) => {
    try {
        const data = await UserModel.find();
        console.log(data);
        return response.status(200).json(data);
    } catch (error) {
        return response
            .status(501)
            .json({ msg: 'Server currently down please try again later' });
    }
};

module.exports = {
    GetAllUsers
};
