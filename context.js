import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Context = React.createContext();
export class Provider extends Component {
	state = {
		api: 'c6012120c5ba5e4fa6a37626777b527f',
		accessToken:
			'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAxMjEyMGM1YmE1ZTRmYTZhMzc2MjY3NzdiNTI3ZiIsInN1YiI6IjVkNTU3OWM4NGJjMzhiNzE3MTI0Y2Q3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCM0EHhnARXY3oHZZUu5MWZwHsy0pIrZOsZqt8OtIdo',
		req_token: 0,
		session_token: 0,
		list: {
			watched: [
				{
					id: 'watched',
					poster: 'watched_poster',
					title: 'watched_title',
					// popularity: '9',
					overview: 'watched_overview',
					// summary: 'no',
				},
			],
			want_2_watch: [
				{
					id: 'want_2',
					poster: 'want_2_poster',
					title: 'want_2_title',
					// popularity: '9',
					overview: 'want_2_overview',
					// summary: 'no',
				},
			],
			liked: [
				{
					id: 'liked',
					poster: 'liked_poster',
					title: 'liked_title',
					// popularity: '9',
					overview: 'liked_overview',
					// summary: 'no',
				},
			],
		},
	};

	componentDidMount() {
		let searchProp = 'the hunt for red october'.split(' ').join('+');
		let baseUrl = 'https://api.themoviedb.org/3/';
		let api = '&api_key=c6012120c5ba5e4fa6a37626777b527f';
		let movieSearch = `search/movie?query=${searchProp}`;

		this.login();

		/* axios({
			method: 'get',
			url: baseUrl + movieSearch + api,
		})
			.then(res => {
				console.log(res.data.results[0]);
				this.setState({
					list: {
						watched: [
							{
								id: res.data.results[0].id,
								poster: `https://image.tmdb.org/t/p/original/${res.data.results[0].poster_path}`,
								title: res.data.results[0].original_title,
								// popularity: res.data.results[0].popularity,
								overview: res.data.results[0].overview,
								// summary: res.data.results[0],
                            },
                            this.state.list.watched,
                        ],
                        want_2_watch: this.state.list.want_2_watch,
                        liked: this.state.list.liked,
					},
				});
			})
			.catch(err => console.log(err)); */
	}

	login = async () => {

		await axios({
			"url": "https://api.themoviedb.org/4/auth/request_token",
			"method": "POST",
			"headers": {
				"Access-Control-Allow-Origin": "localhost:3000",
			  "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAxMjEyMGM1YmE1ZTRmYTZhMzc2MjY3NzdiNTI3ZiIsInN1YiI6IjVkNTU3OWM4NGJjMzhiNzE3MTI0Y2Q3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCM0EHhnARXY3oHZZUu5MWZwHsy0pIrZOsZqt8OtIdo",
			  "content-type": "application/json;charset=utf-8"
			},
			"data": "{\"redirect_to\":\"http://www.themoviedb.org/\"}"
		})
			.then(res => {
				console.log(res.data);
				this.setState({req_token: res.data.request_token});
				console.log(this.state.req_token);

				axios({
					"url": "https://api.themoviedb.org/4/auth/request_token=" + this.state.req_token,
					"method": "POST",
					"headers": {
					  "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAxMjEyMGM1YmE1ZTRmYTZhMzc2MjY3NzdiNTI3ZiIsInN1YiI6IjVkNTU3OWM4NGJjMzhiNzE3MTI0Y2Q3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCM0EHhnARXY3oHZZUu5MWZwHsy0pIrZOsZqt8OtIdo",
					  "content-type": "application/json;charset=utf-8"
					},
				}).then(res => {
					console.log(res);
				}).catch(err => console.log(err))
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Context.Provider value={this.state.list}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
