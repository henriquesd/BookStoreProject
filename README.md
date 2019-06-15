# BookStore

ASP.NET Core Project using Angular and Entity Framework Core

## Commands to execute the project

### .NET Core Project
- dotnet watch run

### Angular Project
- npm install (for the first time, when download the project)
- ng serve


-----------------------------------------------------


## Entity Framework Commands

### Create Migrations
- dotnet ef migrations add InitialCreate

### Create and update database
- dotnet ef database update

### On Infrastructure project:
- dotnet ef migrations add inform_migration_name --startup-project ..\BookStore.API\
- dotnet ef database update --startup-project ..\BookStore.API\

Can use the "DB Browser for SQLite" software to access the database.
