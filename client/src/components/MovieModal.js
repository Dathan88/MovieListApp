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
import PropTypes from 'prop-types';
import axios from 'axios';
import MovieRow from './MovieRow';

require('dotenv').config();

class MovieModal extends Component {
	state = {
		modal: false,
		name: '',
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = e => {
		// console.log(e.target.value);
		const boundObject = this;
		const searchTerm = e.target.value;
		boundObject.performSearch(searchTerm);

		// this.setState({ [e.target.name]: e.target.value });
		// this.props.addMovie(this.state.name);
	};

	performSearch = searchTerm => {
		const apiKey = process.env.API_KEY;
		// const accessToken = process.env.ACCESS_TOKEN;
		let searchProp = searchTerm.split(' ').join('+');
		let baseUrl = 'https://api.themoviedb.org/3/';
		let api = `&api_key=${apiKey}`;
		let movieSearch = `search/movie?query=${searchProp}`;

		axios({
			method: 'get',
			url: baseUrl + movieSearch + api,
		})
			.then(res => {
				let results = res.data.results;
				let movieRows = [];

				results.forEach(movie => {
					movie.poster_src =
						'https://image.tmdb.org/t/p/w185' + movie.poster_path;
					const movieRow = <MovieRow key={movie.id} movie={movie} />;
					movieRows.push(movieRow);
				});

				this.setState({ rows: movieRows });
			})
			.catch(err => console.log(err));

		// Close Modal
		// this.toggle();
	};

	render() {
		return (
			<div>
				{this.props.isAuthenticated ? (
					<Button className='mb-2' color='dark' onClick={this.toggle}>
						Add Movie
					</Button>
				) : (
					<h4 className='mb-3 ml-4'>Please log in to manage movies</h4>
				)}

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to Movie List</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='movie'>Movie</Label>
								<Input
									type='text'
									name='name'
									id='movie'
									placeholder='Add movie to list'
									onChange={this.onChange}
								/>
								{this.state.rows}
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
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ addMovie }
)(MovieModal);
