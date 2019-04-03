import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import PropTypes from 'prop-types';

import {
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
} from 'reactstrap';

import {
    NavbarBrandStyled,
    NavbarStyled,
    LinkStyled
} from '../styles';

class NavbarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const navlinksPublic = [
            {
                linkTo: '/signin',
                text: 'Log in'
            },
            {
                linkTo: '/signup',
                text: 'Register'
            }
        ];

        const navlinksPrivate = [
            {
                linkTo: '/users',
                text: 'All users'
            }
        ];

        return (
            <NavbarStyled light expand="md">
                <NavbarBrandStyled href="/">
                    Web Auth Project III
                </NavbarBrandStyled>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!this.props.authenticated && navlinksPublic.map((elem, i) =>
                            <NavItem key={i}>
                                <LinkStyled to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </LinkStyled>
                            </NavItem>
                        )}
                        {this.props.authenticated && navlinksPrivate.map((elem, i) =>
                            <NavItem key={i}>
                                <LinkStyled to={elem.linkTo} className='nav-link'>
                                    {elem.text}
                                </LinkStyled>
                            </NavItem>
                        )}
                        {this.props.authenticated &&
                            <NavItem>
                                <LinkStyled to='/' onClick={this.props.logoutUser} className='nav-link'>
                                    Log out
                                </LinkStyled>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </NavbarStyled>
        );
    }
}

NavbarComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = {
    logoutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);