const axios = require('axios');

let options = {
	method: 'POST',
	hostname: 'api.themoviedb.org',
	port: null,
	path: '/4/auth/request_token',
	headers: {
		authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAxMjEyMGM1YmE1ZTRmYTZhMzc2MjY3NzdiNTI3ZiIsInN1YiI6IjVkNTU3OWM4NGJjMzhiNzE3MTI0Y2Q3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VCM0EHhnARXY3oHZZUu5MWZwHsy0pIrZOsZqt8OtIdo',
		'content-type': 'application/json;charset=utf-8',
	},
};