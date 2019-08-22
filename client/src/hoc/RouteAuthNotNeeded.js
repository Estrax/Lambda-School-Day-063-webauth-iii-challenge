import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../';

export default function (ComposedComponent) {
    class NotAuthentication extends Component {
        componentWillMount() {
            if (this.props.authenticated) {
                history.push('/users');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.authenticated) {
                history.push('/users');
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(NotAuthentication);
}