const attemp = process.env.ATTEMP;


async function up (queryInterface, {DataTypes}) {
    await queryInterface.addColumn('friends_lists', 
        "isAproove",  {type:DataTypes.BOOLEAN, defaultValue: false},
        
    )
}

async function down(queryInterface) {
    await queryInterface.removeColumn('users', 'isActivate')
}

module.exports = {
    up,
    down
}

// firstName: {type:DataTypes.STRING, defaultValue: null},
// lastName: {type:DataTypes.STRING, defaultValue: null},
// middleName: {type:DataTypes.STRING, defaultValue: null},
// sex: {type:DataTypes.STRING, defaultValue: null},