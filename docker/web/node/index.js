const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
	host: 'mysql',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};

const seedDatabase = () => {
	const connection = mysql.createConnection(config);
	connection.query("DROP TABLE IF EXISTS people");
	connection.query("CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))");
	connection.query(`INSERT INTO people(name) values('Miguel'), ('Arthur'), ('Gael'), ('Heitor'), ('Helena'), ('Alice'), ('Theo'), ('Laura'), ('Davi'), ('Gabriel')`);
	connection.end();
};
seedDatabase();

const fetchAllPeopleAndDisplay = (res) => (err, result, fields) => {
	if (err) throw err;
	let html = "<h1>Full Cycle Rocks!</h1>";
	if (!result?.length) {
		res.send(html);
		return;
	}
	html += "<br><ul>";
	for (let i = 0; i < result.length; i++) {
		const people = result[i];
		html += `<li>${people.name}</li>`;
	}
	html += "</ul>";
	res.send(html);
};

app.get("/", (req, res) => {
	const connection = mysql.createConnection(config);
	connection.query("SELECT * FROM people", fetchAllPeopleAndDisplay(res));
	connection.end();
});

app.listen(port, () => {
	console.log(`Rodando na porta ${port}`);
});