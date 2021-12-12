connection
  .promise()
  .query('SELECT * FROM employee')
  .then(([rows, fields]) => {
    console.table(rows);
  })
  .catch(console.log)
  .then(() => connection.end());
