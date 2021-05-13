# movie-titles
This is an application written in React and .Net Core which allows a User to search on movie titles and, upon clicking a title, review basic movie information.

# database
The application uses Sql Server and a pre-defined sql script that will seed the db with movie info. It also uses Entity Framework as the ORM.

# unit-tests
There are a few back-end unit tests that cover the repo layer as that was really the only area of backend cyclomatic complexity.

# setup
The sql connection string will need to be changed to run against an available db. And all necessary installations (.Net Core, Visual Studio, etc.) would need to be in place. Otherwise, the app should just work when hitting play in Visual Studio. 
