import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

export default class AppNavBar extends Component {
	state = {
		isOpen: false,
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		return (
			<React.Fragment>
				<Navbar color='dark' dark expand='sm' className='mb-5'>
					<Container>
						<NavbarBrand href='/'>Movie List</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className='ml-auto' navbar>
								<NavItem>
									<RegisterModal />
								</NavItem>
								<NavItem>
									<Logout />
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</React.Fragment>
		);
	}
}
