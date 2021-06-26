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

Restart graphql server at `http://localhoast:3001/graphql`
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

  fooMeta1,
  fooMeta2,
  ...
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

## Query Sequelize

before function

```ts
findOptions.include = [{ model: FooMeta }];
```

after function for a líst foo

```ts
const rows = foos.map(u => metadataToField(u, 'metadata'));
```

after function for a foo

```ts
const transferData = metadataToField(user, 'metadata');
return transferData;
```

## Mutation sequelize

Create or update a job

```ts
// Update taxonomies
if (job && taxonomies) {
  const terms = taxonomies.map(termId => ({
    term_taxonomy_id: termId,
    ref_id: job.id,
  }));
  await JobTerm.bulkCreate(terms);
}

// Metadata
if (job && metadata) {
  const meta = metadata.map(x => ({
    ...x,
    job_id: job.id,
  }));

  await JobMeta.bulkCreate(meta);
}
findOptions.where = { id: job.id };
return findOptions;
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

load detail

```ts
const formSetFields = job => {
  form.setFields([
    // job
    { name: ['job', 'title'], value: job.title },
    { name: ['job', 'link'], value: job.link },
    { name: ['job', 'description'], value: job.description },
    { name: ['job', 'publishDate'], value: job.publishDate },
    { name: ['job', 'dueDate'], value: job.image },

    // taxonomies
    { name: ['taxonomies', 'job_status'], value: job.job_status },

    // metadata
    { name: ['metadata', 'priority'], value: job.priority },
    { name: ['metadata', 'link'], value: job.link },
  ]);
};
```

# Taxonomy

## Model

Follow below, must have ForeignKey for TermTaxnomy, Foo

```ts
export class JobTerm extends Model<JobTerm> {
  @BelongsTo(() => TermTaxonomy)
  termTaxonomy: TermTaxonomy;

  @ForeignKey(() => TermTaxonomy)
  @Column
  term_taxonomy_id: number;

  @Column
  order: number;

  // job
  @Column
  @ForeignKey(() => Job) // only change Job
  ref_id: number;

  @BelongsTo(() => Job) // only change Job
  job: Job;
}
```

## Graphql

Follow below, must have `termTaxnomies` field

```
type JobTerm {
  ...
  termTaxonomies: TermTaxonomy
}

```

## Query single

```ts
findOptions.include = [
  { model: JobMeta },
  {
    model: JobTerm,                                             // FooTerm
    require: true,
    include: [
      {
        model: TermTaxonomy,
        where: { taxonomy: ['job_priority', 'job_status'] },    // all of taxonomies fields
        require: true,
        include: [
          {
            model: Term,
            require: true,
          },
        ],
      },
    ],
  },
];
```
