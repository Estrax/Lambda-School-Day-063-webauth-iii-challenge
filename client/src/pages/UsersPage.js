import React, { Component } from 'react';
import UsersContainer from '../containers/UsersContainer';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Title } from '../styles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchBar = styled.div`
    width: 24rem;
    max-width: 24rem;
    min-width: 8rem;
    margin: 0 auto;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0 2rem;

    &::placeholder {
        text-align: center;
    }
`;

class UsersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.returnFilteredObjects = this.returnFilteredObjects.bind(this);
    }
    componentDidMount() {
        if(this.props.authenticated){
            if(this.props.users.length === 0){
                this.props.fetchUsers();
            }
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    returnFilteredObjects() {
        return this.state.search.trim().length > 0 ? this.props.users.filter(elem => elem.username.toLowerCase().includes(this.state.search.toLowerCase())) : this.props.users;
    }

    render() {
        const objects = this.returnFilteredObjects();
        return (
            <>
                <Title>Users:</Title>
                <SearchBar>
                    <SearchInput type="text" name="search" placeholder="Who would you like to find today?" onChange={this.handleChange} value={this.state.search} />
                </SearchBar>
                {this.props.authenticated && <UsersContainer userID={this.props.userID} users={objects} />}
            </>
        );
    }
}

UsersPage.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated || false,
        userID: state.auth.user ? state.auth.user.id : -1,
        users: state.users.users || []
    }
}

const mapDispatchToProps = {
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);