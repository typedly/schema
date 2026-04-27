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
  'email?': 'string';
};

type User1 = SchemaToType<UserSchema1>;
// {
//   id: number;
//   name: string;
//   email?: string;
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
    'phone?': 'string';
  };
};

type Account = SchemaToType<AccountSchema>;
// {
//   id: number;
//   profile: {
//     firstName: string;
//     lastName: string;
//     phone?: string;
//   };
// }
