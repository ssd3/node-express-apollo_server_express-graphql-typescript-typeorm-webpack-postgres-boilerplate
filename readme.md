# Node.js + Express.js + Apollo Server Express + GraphQL + TypeScript + TypeORM + WebPack + PostgreSQL

1. clone repo

2. create postgres database (you can find db setting in `.env`)

it should contain a 'Contact' table for start

```
CREATE TABLE template."Contact"
(
    id integer NOT NULL DEFAULT nextval('template."Contact_id_seq"'::regclass),
    "firstName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(13) COLLATE pg_catalog."default",
    "createdDate" timestamp without time zone NOT NULL DEFAULT now(),
    "lastModifiedDate" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Contact_pkey" PRIMARY KEY (id)
)
```

3. make changes on `.env` and `ormconfig.json` files (db settings etc)

4. run the following commands for install application deps:
`yarn install`

5. build application
`yarn build:dev` - development mode

`yarn build:prod` - production mode

6. start application
`yarn start`

finally, GraphQL server will be available by address: http://localhost:3000/api


`graphql query example:`
```
query {
  contacts(filter: {
    page: 1
    perPage: 10
  })
  {
    totalCount
    contacts {
      id
      firstName
      lastName
      email
      phone
      createdDate
      lastModifiedDate
    }
  }
}
```

```
query {
  contact(id: 1)
  {
      id
      firstName
      lastName
      email
      phone
      createdDate
      lastModifiedDate
  }
}
```

`graphql mutation example:`
```
mutation {
  contactCreate(input: {
    firstName: "first name 3"
    lastName: "last name 3"
    email: "email3@email3"
    phone: "123 123 123"
  })
  {
    id
    firstName
    lastName
    email
    phone
    createdDate
    lastModifiedDate
  }
}
```
