# sneaker-fits
To run this project:
- clone the repository and run `docker-compose up` from the terminal. This should start the app.
- I wasn't able to get the SQL script to run automatically as part of the docker-compose, so you will have to run it manually.
  - Log in to the Postgres DB using password "pass" from the terminal `psql -h localhost -U postgres db`.
  - Input the below SQL into the terminal to create the table for this project.
  ```bash
  CREATE TABLE true_to_size_ratings (
    id TEXT,
    sneaker TEXT,
    true_to_size_rating SMALLINT,
    PRIMARY KEY (id)
  );
  ```
The setup should be complete. You can test the app by running the below curl commands.

Add new true to size rating:
```bash
curl -X POST \
  http://localhost:8080/true-to-size-calculations \
  -H 'Content-Type: application/json' \
  -d '{
	"sneakers": "adidas Yeezy",
	"true_to_size_rating": 5
  }'
```
Get the true to size calculation for the given sneakers:
```bash
curl -X GET 'http://localhost:8080/true-to-size-calculations?sneakers=adidas%20Yeezy'
```
