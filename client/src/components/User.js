import React from 'react';
import PropTypes from 'prop-types';

import {
    CardSingle,
    Title,
    cardBorder,

} from '../styles';

const User = (props) => {
    return (
        <>
            <CardSingle className="card" style={cardBorder}>
                <Title>{props.username}</Title>
            </CardSingle>
        </>
    );
}


User.propTypes = {
    username: PropTypes.string.isRequired
}

export default User;