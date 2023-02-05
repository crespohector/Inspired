# Welcome to Inspired!
## Live Link: https://inspired-goc1.onrender.com
Whether you're overcoming obstacles in life, need an extra push to get stuff done, or enjoy sharing postive quotes with your friends, Inspired is here to help!
Inspired is an app where users can swipe to like or dislike daily quotes and create collections to store their favorite quotes.

![InspiredSplashPage](https://user-images.githubusercontent.com/76798385/121737830-62cf7d80-cac7-11eb-8f86-a1c26222c675.png)

## MVP
  * Users can create an account, log in, and log out.
  * Users can use a demo log in to try the site.
  * Logged out users are directed to the home page.
  * Logged in users can create, edit, and delete quotes.
  * Logged in users can create, edit, and delete collections.
  * Logged in users can like/dislike a quote.

## BONUS / STRETCH GOALS
  * Logged in users can customize their own themes.
  * Logged in users and guest users search for quotes in different categories.
  * Quote of the day feature.
  * Logged in users can add tags to a quote.
  * Logged in users can search for quotes/authors.

## TECHNOLOGIES USED
  * React-Redux
  * Javascript
  * Flask
  * SQL-Alchemy
  * Alembic
  * Python
  * CSS
  * HTML
  * PostgreSQL

## DATABASE SCHEMA

![Inspired](https://user-images.githubusercontent.com/76798385/121737876-74b12080-cac7-11eb-95a7-4956187f4daa.png)

## `users`

| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | Integer   | Not Null, Primary Key |
| username       | String    | Not Null              |
| email          | String    | Not Null, unique      |
| hashed_password| String    | Not Null              |
| created_at     | DateTime  | Not Null              |
| update_at      | DataTime  | Not Null              |

* unique: true`

## `collections`

| Column Name | Data Type   | Details               |
|-------------|-------------|-----------------------|
| id          | Integer     | Not Null, Primary Key |
| title       | String(150) | Not Null              |
| user_id     | Integer     | Not Null, Foreign Key |
| created_at  | DateTime    | Not Null              |
| update_at   | DataTime    | Not Null              |


* `user_id` references `users` table

## `collections_quotes`

| Column Name  | Data Type | Details               |
|--------------|-----------|-----------------------|
| collection_id| Integer   | Not Null, Foreign Key |
| quote_id     | Integer   | Not Null, Foreign Key |
| created_at   | DateTime  | Not Null              |
| update_at    | DateTime  | Not Null              |


* `collection_id` references `collections` table
* `quote_id` references `quotes` table

## `quotes`

| Column Name | Data Type   | Details               |
|-------------|-------------|-----------------------|
| id          | Integer     | Not Null, Primary Key |
| content     | String      | Not Null              |
| user_id     | Integer     | Foreign Key           |
| created_at  | DateTime    | Not Null              |
| update_at   | DataTime    | Not Null              |

* `user_id` references `users` table

## `favorites`

| Column Name | Data Type   | Details               |
|-------------|-------------|-----------------------|
| id          | Integer     | Not Null, Primary Key |
| quote_id    | String      | Not Null              |
| user_id     | Integer     | Not, Null,Foreign Key |
| created_at  | DateTime    | Not Null              |
| update_at   | DataTime    | Not Null              |

* `user_id` references `users` table
* `quote_id` references `quotes` table

## `dislikes`

| Column Name | Data Type   | Details               |
|-------------|-------------|-----------------------|
| id          | Integer     | Not Null, Primary Key |
| quote_id    | String      | Not Null              |
| user_id     | Integer     | Not, Null,Foreign Key |
| created_at  | DateTime    | Not Null              |
| update_at   | DataTime    | Not Null              |

* `user_id` references `users` table
* `quote_id` references `quotes` table

## BACKEND ENVIORNMENT DEPENDENCIES/INSTALLATION
   * faker
   * WTForms
   * alembic
   * Flask

## FRONTEND ENVIORNMENT DEPENDENCIES/INSTALLATION
   * react-tinder-card
   * redux
   * redux-thunk
   * react-modal



# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

2. Create a **.env** file based on the example with proper settings for your
   development environment
3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

4. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit
