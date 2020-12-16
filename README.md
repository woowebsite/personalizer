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

open `http://localhost:3001`


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
mutation{
  createUser(data:{name:"Admin", email:"admin@x.com", password: "1"}){
      id
      name
      jwt
    }
  }
```

Login user
```ts
query {
   loginUser(email:"admin@x.com", password:"1") {
    name
  }
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

# Sequelizer
Run seed
Go to `graphql` folder and run command line
```console
npx sequelize-cli db:seed --seed 20200822034804-demo-company.js
npx sequelize-cli db:seed --seed 20200124071616-demo-users.js
```