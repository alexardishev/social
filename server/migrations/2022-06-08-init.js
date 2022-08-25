const attemp = process.env.ATTEMP;


async function up (queryInterface, {DataTypes}) {
    await queryInterface.addColumn('users', 
        "maxAttempts",  {type:DataTypes.INTEGER, defaultValue: attemp}
    )
}

async function down(queryInterface) {
    await queryInterface.removeColumn('users', 'isActivate')
}

module.exports = {
    up,
    down
}