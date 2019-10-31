import React, { Component, Fragment } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
	Media,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

import APILogo from '../logos/rectangle-green.svg';

class AppNavBar extends Component {
	state = {
		isOpen: false,
	};

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				<NavItem>
					<span className='navbar-text mr-3'>
						<strong>{user ? `Welcome ${user.name}` : ''}</strong>
					</span>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);

		const guestLinks = (
			<Fragment>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</Fragment>
		);

		return (
			<React.Fragment>
				<Navbar color='dark' dark expand='sm' className='mb-5'>
					<Container className='ml-0'>
						<Media>
							<Media href='https://www.themoviedb.org/' className='mr-4'>
								<Media
									object
									src={APILogo}
									style={{ height: '40px'}}
									alt='The Movie DB logo'
								/>
							</Media>
						</Media>
						<NavbarBrand style={{color: 'white'}}>Movie List</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className='ml-auto' navbar>
								{isAuthenticated ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	null
)(AppNavBar);
