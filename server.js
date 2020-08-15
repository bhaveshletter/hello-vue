const express = require('express'),
	app = express(),
	port = 8080

app.use(express.static(__dirname + '/dist/hello-vue'))

app.get('/', function(req, res) {
	res.sendFile('App.vue', { root: 'dist/hello-vue' })
})

app.listen(process.env.PORT || port, () =>
	console.log(`Running on port ${process.env.PORT || 8080}`)
)
