import React from 'react';
import { Button, Table } from 'reactstrap';
import { addMovie } from '../actions/movieActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MovieRow extends React.Component {
	state = {
		poster: '',
		title: '',
		overview: '',
		releaseDate: '',
		added: false,
	};

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	viewMovie() {
		const url = 'https://www.themoviedb.org/movie/' + this.props.movie.id;
		window.location.href = url;
	}

	addNewMovie = () => {
		const { user } = this.props.auth;
		const { poster_src, title, overview, release_date } = this.props.movie;

		const newMovie = {
			poster: poster_src,
			title,
			overview,
			releaseDate: release_date,
		};
		console.log(newMovie);

		this.props.addMovie(newMovie, user.id);
	};

	render() {
		const { movie } = this.props;
		return (
			<Table key={movie.id} className={this.state.added ? 'hidden' : 'table'}>
				<tbody>
					<tr>
						<td>
							<img alt='poster' width='120' src={movie.poster_src} />
						</td>
						<td>
							<h3>{movie.title}</h3>
							<p>{movie.overview}</p>
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
								onClick={e => {
									this.addNewMovie(e);
									this.setState({ added: true });
								}}
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
	auth: state.auth,
});

export default connect(mapStateToProps, { addMovie })(MovieRow);
