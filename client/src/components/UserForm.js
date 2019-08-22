import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../actions';
import { SubmitBtn, FormComponent, Title } from '../styles';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            department: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    
    componentDidMount() {
        if(this.props.updateForm){
            this.props.getUserData().then(_ => {
                this.setState({
                    department: this.props.department,
                    username: this.props.username
                });
            });
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    loginUser(e) {
        e.preventDefault();
        this.props.loginUser({
            username: this.state.username,
            password: this.state.password
        });
    }

    registerUser(e) {
        e.preventDefault();
        this.props.registerUser({
            username: this.state.username,
            password: this.state.password,
            department: this.state.department
        });
    }

    render() {
        return (
            <>
                <FormComponent onSubmit={this.props.registerForm ? this.registerUser : this.loginUser} className="card">
                    <Title>
                        {this.props.registerForm && "Register"}
                        {this.props.loginForm && "Log in"}
                    </Title>
                    
                    {this.props.registerForm && <>
                        <input
                            type="text"
                            name="department"
                            placeholder="Your department"
                            onChange={this.handleChange}
                            value={this.state.department}
                        />
                    </>}

                    <input
                        type="text"
                        name="username"
                        placeholder="Your username"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />

                    <SubmitBtn
                        type="submit"
                        name="submit"
                        className="btn btn-primary"
                    />
                </FormComponent>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userID: state.auth.user ? state.auth.user.id : -1,
        department: state.auth.user ? state.auth.user.department : '',
        username: state.auth.user ? state.auth.user.username : ''
    }
}

const mapDispatchToProps = {
    loginUser,
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);