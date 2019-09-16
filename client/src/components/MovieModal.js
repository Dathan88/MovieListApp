import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addMovie } from '../actions/movieActions';

class MovieModal extends Component {
	state = {
		modal: false,
		name: '',
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newMovie = {
			name: this.state.name,
		};

		// Add movie via addMovie action
		this.props.addMovie(newMovie);

		// Close Modal
		this.toggle();
	};

	render() {
		return (
			<div>
				<Button className='mb-2' color='dark' onClick={this.toggle}>
					Add Movie
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to Movie List</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='movie'>Movie</Label>
								<Input
									type='text'
									name='name'
									id='movie'
									placeholder='Add movie to list'
									onChange={this.onChange}
								/>
								<Button className='mt-2' color='dark' block>
									Add Movie
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	movies: state.movies,
});

export default connect(
	mapStateToProps,
	{ addMovie }
)(MovieModal);
