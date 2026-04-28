import type { SchemaToType } from './schema-to-type';

// ### 1) Basic schema to type

type UserSchema = {
  id: 'number';
  name: 'string';
  active: 'boolean';
  createdAt: 'date';
};

type User = SchemaToType<UserSchema>;
// {
//   id: number;
//   name: string;
//   active: boolean;
//   createdAt: Date;
// }


// ### 2) Optional keys with `?`

type UserSchema1 = {
  id: 'number';
  name: 'string';
  email?: 'string';
};

type User1 = SchemaToType<UserSchema1>;
// {
//   id: number;
//   name: string;
//   email?: string | undefined;
// }

// ### 3) Arrays of primitives

type PostSchema = {
  id: 'number';
  tags: { array: 'string' };
  ratings: { array: 'number' };
};

type Post = SchemaToType<PostSchema>;
// {
//   id: number;
//   tags: string[];
//   ratings: number[];
// }


// ### 4) Arrays of objects

type UsersSchema = {
  id: 'number';
  test: { array: { id: 'number'; label: 'string' } };
};

type Users = SchemaToType<UsersSchema>;
// {
//   id: number;
//   test: { id: number; label: string }[];
// }

// ### 5) Nested object schema

type AccountSchema = {
  id: 'number';
  profile: {
    firstName: 'string';
    lastName: 'string';
    phone?: 'string';
  };
};

type Account = SchemaToType<AccountSchema>;
// {
//   id: number;
//   profile: {
//     firstName: string;
//     lastName: string;
//     phone?: string | undefined;
//   };
// }


type RoleSchema = {
  id: 'number';
  name: 'string';
};

type UserSchemaWithRole = {
  id: 'number';
  name: 'string';
  role: RoleSchema; // relation: User belongs to one Role
  address: { city: 'string'; country: 'string' }; // nested object
};

type Role = SchemaToType<RoleSchema>;
type UserWithRole = SchemaToType<UserSchemaWithRole>;


type dbSchema = SchemaToType<{
  person: { id: 'number', name: 'string' },
  cart: { id: 'number', items: { array: 'string' } },
}>;

export type Shop = {
  version: "string",
  person: UserSchema
  cart: {
    id: "number";
    items: { array: "string" };
  }
}

type ShopSchema = SchemaToType<Shop>;

// Example

const example: SchemaToType<{
  name: 'string';
  age: 'number';
  isAdmin: 'boolean';
  createdAt: 'date';
  tags: { array: 'string' };
  profile: {
    firstName: 'string';
    lastName: 'string';
    phone?: 'string';
  };
}> = {
  name: "John",
  age: 30,
  isAdmin: false,
  createdAt: new Date(),
  tags: ["tag1", "tag2"],
  profile: {
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
  },
};


function createSchema<const Schema extends Record<string, unknown>>(schema: Schema) {
  return (user: SchemaToType<Schema>) => user;
}

/*
const userSchema: {
    id: number;
    name: string;
    active: boolean;
    createdAt: Date;
}
*/
const userSchema = createSchema({
  id: "number",
  name: "string",
  active: "boolean",
  createdAt: "date",
})({
  id: 1,
  name: "John",
  active: true,
  createdAt: new Date(),
});
