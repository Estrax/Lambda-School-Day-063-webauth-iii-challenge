const db = require('../dbConfig');

module.exports = {
    getUsers,
    addUser,
    getUserById,
    getUserByUsername,
    getUsersByDepartment,
    updateUser,
    removeUser
};

async function getUsers(){
    return await db
            .select('id', 'username', 'department')
            .from('users');
}

async function addUser(user){
    return await db('users')
            .insert(user)
            .then(res => res[0]);
}

async function getUserById(id){
    return await db
            .select('id', 'username', 'department')
            .from('users')
            .where({ id })
            .first();
}

async function getUserByUsername(username){
    return await db
            .select('*')
            .from('users')
            .where({ username })
            .first();
}

async function getUsersByDepartment(department){
    return await db
            .select('id', 'username', 'department')
            .from('users')
            .where({ department });
}

async function updateUser(id, user){
    return await db('users')
        .where({ id })
        .update(user);
}

async function removeUser(id){
    return await db('users')
            .where({ id })
            .del();
}
