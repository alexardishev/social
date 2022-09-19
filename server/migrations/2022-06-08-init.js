const attemp = process.env.ATTEMP;


async function up (queryInterface, {DataTypes}) {
    await queryInterface.addColumn('users', 
        "isOnline",  {type: DataTypes.BOOLEAN, defaultValue: false}
    )
}

async function down(queryInterface) {
    await queryInterface.removeColumn('users', 'isActivate')
}

module.exports = {
    up,
    down
}