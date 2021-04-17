# Getting started

Set up Apollo client with Nextjs and Apollo server GraphQL into single Express

## Usage

Make sure you have Node.js 13+ as specified in package.json "engines" object.

```
yarn install
```

```
yarn dev
```

Goto `http://localhost:3001/graphql` to generate database structure

## Run seed

Go to `graphql` folder and run command line

```console
npx sequelize-cli db:seed --seed 20200822034804-demo-role.js
npx sequelize-cli db:seed --seed 20200124071616-demo-users.js
```

Goto `http://localhost:3001/api/auth/signin` input Email to signin

Open `http://localhost:3001` to Enjoy!

# System Administrator

Goto `http://localhost:3001/admin/users` to manage users

# SQL Sequelizer

Auto sync database

```ts
const server = new ApolloServer({
  ...// Sync database
  sequelize.sync(),
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

Query Role

```ts
query {
  getRole(where:{id:1}){
    id,
    name
  }
}
```

# Graphql generator

Run graphql server at `http://localhoast:3001/graphql`
Go to packages/graphql run

```console
yarn generate
```

Copy `graphql.schema.json` to `client/services/graphql.schema.json`
Note documents must start by a query

# Metadata

## Model

Define virtual columns at model.ts

```ts
{
  @Column(DataType.VIRTUAL)
  link: string;
}

```

## Schema

Must be include `metadata` at type FooModel

```
type Foo {
  metadata: [FooMeta]
}
type FooMeta {
  foo: Foo
}
type FooMetaInput {
  foo_id
  key
  value
}

```

Define FooMeta, FooMetaInput

```
metadata: [FooMeta]
```

## Sequelize

before function

```ts
findOptions.include = [{ model: FooMeta }];
```

after function

```ts
const rows = foos.map(u => metadataToField(u, 'metadata'));
```

## Form

Add `metadata` or `taxonomies` at field

```ts
      <Form.Item
        name={['job', 'dueDate']}
        label={t('jobCreateform.label.dueDate')}
      >
        <DatePicker  />
      </Form.Item>

      <Form.Item
        name={['metadata', 'link']}
        label={t('jobCreateform.label.link')}
      >
        <Input type="link" />
      </Form.Item>

      <Form.Item
        name={['taxonomies', 'job_status']}
        label={t('jobCreateform.label.status')}
      >
        <ComboBoxTaxonomy type={TaxonomyType.Job_Status} />
      </Form.Item>

```

at submit method, pass `metadata` and `taxonomies`

```ts
upsertJob({
  variables: {
    job,
    metadata,
    taxonomies,
  },
});
```
