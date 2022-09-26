const {User} = require('../models/models');

const userOnlineStatus = async (email) => {
    if(email) {
        const user = await User.findOne({where: {email}})
        await user.update({isOnline: true})
        await user.save();
    } 

}

const userOfflineStatus = async (email) => {
    if(email) {
        const user = await User.findOne({where: {email}})
        await user.set({
            isOnline: false,
        })
        await user.save();
    } 

}

module.exports = {
    userOnlineStatus,
    userOfflineStatus,
}