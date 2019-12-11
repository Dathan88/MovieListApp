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

const apiKey = process.env.REACT_APP_API_KEY;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

class MovieModal extends Component {
	state = {
		modal: false,
		name: '',
		rows: [],
	};

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = e => {
		const boundObject = this;
		const searchTerm = e.target.value;
		boundObject.performSearch(searchTerm);
	};

	performSearch = searchTerm => {
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
				let movieTitles = [];

				const { movieList } = this.props.auth.user;
				movieList.map(userMovie => movieTitles.push(userMovie.title));

				results.forEach(movie => {
					if (!movieTitles.includes(movie.title)) {
						movie.poster_src =
							'https://image.tmdb.org/t/p/w185' + movie.poster_path;
						const movieRow = (
							<MovieRow
								key={movie.id}
								movie={movie}
								deleteRow={this.deleteRow}
							/>
						);

						movieRows.push(movieRow);
					}
				});
				this.setState({ rows: movieRows });
			})
			.catch(err => console.log(err));
	};

	render() {
		const { isAuthenticated } = this.props.auth;
		return (
			<div>
				{isAuthenticated ? (
					<Button className='mb-2' color='dark' onClick={this.toggle}>
						Add Movie
					</Button>
				) : (
					<h4 className='mb-3 ml-4'>
						Please log in or register to manage your movies
					</h4>
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
	auth: state.auth,
});

export default connect(mapStateToProps, { addMovie })(MovieModal);
