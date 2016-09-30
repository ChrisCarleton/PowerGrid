const BASE_ROUTE = '/api/1.0/user';

module.exports = app => {
	app.get(BASE_ROUTE, (req, res) => {
		res.send('lol');
	});
};
