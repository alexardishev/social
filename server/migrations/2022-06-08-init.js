const attemp = process.env.ATTEMP;


async function up (queryInterface, {DataTypes}) {
    await queryInterface.addColumn('users', 
        "resetLink",  {type:DataTypes.STRING}
    )
}

async function down(queryInterface) {
    await queryInterface.removeColumn('users', 'isActivate')
}

module.exports = {
    up,
    down
}