import React, { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { Container, Row, Col } from 'reactstrap';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());

		LogRocket.init('yywtkv/movielistapp');
		setupLogRocketReact(LogRocket);
		LogRocket.getSessionURL(sessionURL => {
			console.log(sessionURL);
		  });
	}
	render() {
		return (
			<Provider store={store}>
				<div className='App'>
					<AppNavBar />
					<Container>
						<MovieModal />
						<MovieList />
					</Container>
					<Row className='footer'>
						<Col sm='auto' xs='auto'>
							This product uses the TMDb API but is not endorsed or certified by
							TMDb.
						</Col>
					</Row>
				</div>
			</Provider>
		);
	}
}

export default App;
