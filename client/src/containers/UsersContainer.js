import React from 'react';
import User from '../components/User';

export default (props) => {
    return (
        <>
            {props.users.map(user => 
                <User
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    editUser={props.editUser}
                    deleteUser={props.deleteUser}
                />
            )}
        </>
    );
}