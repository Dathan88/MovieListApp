import React, { Component } from 'react';
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Table,
	Dropdown,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getMovies, deleteMovie } from '../actions/movieActions';
import PropTypes from 'prop-types';

import LogRocket from 'logrocket';

const apiKey = process.env.REACT_APP_API_KEY;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

class MovieList extends Component {
	static propTypes = {
		getMovies: PropTypes.func.isRequired,
		deleteMovie: PropTypes.func.isRequired,
		movie: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool,
		auth: PropTypes.object.isRequired,
	};

	componentDidMount() {
		const { userId } = this.props.auth;
		if (userId) {
			setTimeout(() => {
				this.props.getMovies(userId);
			}, 500);
		}
	}

	onDeleteClick = (id) => {
		const { user } = this.props.auth;
		this.props.deleteMovie(id, user.id);
	};

	//! Badge pill on movies for rating? popularity?
	//! Also tabs and collapse movies in list: uncontrolled collapse?
	render() {
		const { user } = this.props.auth;
		const { movies } = this.props.movie;
		let num = 1;
		movies.sort((a, b) => (a.title > b.title ? 1 : -1));

		return (
			<Container style={{ padding: 0, marginBottom: '3rem' }}>
				<DropdownItem divider />
				{this.props.isAuthenticated
					? (LogRocket.identify(user.id, {
							name: user.name,
							email: user.email,
					  }),
					  (
							<ListGroup>
								<TransitionGroup className='movieList'>
									{movies.map(({ _id, title, poster, overview }) => (
										<CSSTransition key={_id} timeout={500} classtitles='fade'>
											<UncontrolledDropdown>
												<DropdownToggle size='sm' caret>
													{num++ + '. ' + title}
												</DropdownToggle>
												<DropdownMenu className='dropDownMenu'>
													<DropdownItem tag='a' className='dropDownItem'>
														<ListGroupItem style={{ padding: 0 }}>
															<Table className='mb-0' hover dark size='sm'>
																<tbody>
																	<tr>
																		<td>
																			<Button
																				className='lg-screen remove-btn'
																				color='danger'
																				size='sm'
																				onClick={this.onDeleteClick.bind(
																					this,
																					_id
																				)}>
																				&times;
																			</Button>
																			<Button
																				className='sm-screen remove-btn'
																				color='danger'
																				size='sm'
																				onClick={this.onDeleteClick.bind(
																					this,
																					_id
																				)}>
																				Delete
																			</Button>
																		</td>
																		<td>
																			<img
																				alt='poster'
																				width='120'
																				height='180'
																				src={poster}
																			/>
																		</td>
																		<td className='td-summary'>
																			<h3>
																				{title}{' '}
																				<Button
																					className='btn-close'
																					color='warning'
																					size='sm'>
																					&times;
																				</Button>
																			</h3>
																			<p className='summary'>{overview}</p>
																		</td>
																	</tr>
																</tbody>
															</Table>
														</ListGroupItem>
													</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</CSSTransition>
									))}
								</TransitionGroup>
							</ListGroup>
					  ))
					: null}
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	movie: state.movie,
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
});

export default connect(mapStateToProps, { getMovies, deleteMovie })(MovieList);
