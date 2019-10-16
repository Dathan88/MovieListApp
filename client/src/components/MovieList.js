import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getMovies, deleteMovie } from '../actions/movieActions';
import PropTypes from 'prop-types';

class MovieList extends Component {
	static propTypes = {
		getMovies: PropTypes.func.isRequired,
		deleteMovie: PropTypes.func.isRequired,
		movie: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool,
		auth: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.getMovies();
	}

	onDeleteClick = id => {
		this.props.deleteMovie(id);
	};

	render() {
		const { movies } = this.props.movie;
		return (
			<Container style={{ padding: 0 }}>
				<ListGroup>
					<TransitionGroup className='movieList'>
						{movies.map(({ _id, title, poster, overview }) => (
							<CSSTransition key={_id} timeout={500} classtitles='fade'>
								<ListGroupItem style={{ padding: 0 }}>
									<Table className='mb-0' hover dark size='sm'>
										<tbody>
											<tr>
												<td>
													{this.props.isAuthenticated ? (
														<Button
															className='remove-btn'
															color='danger'
															size='sm'
															onClick={this.onDeleteClick.bind(this, _id)}
														>
															&times;
														</Button>
													) : null}
												</td>
												<td>
													<img alt='poster' width='120' src={poster} />
												</td>
												<td>
													<h3>{title}</h3>
													<p>{overview}</p>
												</td>
											</tr>
										</tbody>
									</Table>
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	movie: state.movie,
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ getMovies, deleteMovie }
)(MovieList);
