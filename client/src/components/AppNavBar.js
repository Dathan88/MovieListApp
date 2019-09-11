import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
} from 'reactstrap';

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
						<NavbarToggler onClick={this.toggle}></NavbarToggler>
						<Collapse isOpen={this.state.isOpen}>
							<Nav className='ml-auto' navbar>
								<NavItem>
									<NavLink href='/'>Movie</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</React.Fragment>
		);
	}
}
