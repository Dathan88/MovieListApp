import React from 'react';
import { Button, Table } from 'reactstrap';
import { addMovie } from '../actions/movieActions';
import { connect } from 'react-redux';

class MovieRow extends React.Component {
	state = {
		poster: '',
		title: '',
		overview: '',
		releaseDate: '',
	};

	viewMovie() {
		const url = 'https://www.themoviedb.org/movie/' + this.props.movie.id;
		window.location.href = url;
	}

	addNewMovie = () => {
		console.log(this);

		const {poster_src, title, overview, release_date} = this.props.movie;

		const newMovie = {
			poster: poster_src,
			title,
			overview,
			releaseDate: release_date,
		};

		// console.log(newMovie);

		this.props.addMovie(newMovie);
	};

	render() {
		return (
			<Table key={this.props.movie.id}>
				<tbody>
					<tr>
						<td>
							<img alt='poster' width='120' src={this.props.movie.poster_src} />
						</td>
						<td>
							<h3>{this.props.movie.title}</h3>
							<p>{this.props.movie.overview}</p>
							<Button
								type='button'
								onClick={this.viewMovie.bind(this)}
								color='warning'
							>
								View
							</Button>
							<Button
								className='ml-2'
								type='button'
								onClick={this.addNewMovie.bind(this)}
								color='success'
							>
								Add To List
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
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
)(MovieRow);
