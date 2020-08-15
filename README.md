## Getting started
Set up Apollo client with Nextjs and Apollo server GraphQL into single Express

## Usage

Make sure you have Node.js 13+ as specified in package.json "engines" object.

```
yarn install
```

```
yarn dev
```

open `http://localhost:3000`


# SQL Sequelizer
Auto sync database
```ts
const server = new ApolloServer({
...
    // Sync database
    sequelize.sync()
});
```

# Graphql
Create User
```ts
createUser(data:{firstName:"Nghiem", lastName:"Tran", email:"admin@x.com", password: "1"}){
    id
    firstName
    jwt
  }
```

Query Company
```ts
query {
  getCompany(where:{id:1}){
    id,
    name
  }
}
```