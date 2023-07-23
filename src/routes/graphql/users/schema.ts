import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfilesType } from '../profiles/schema.js';
import { PostsType } from '../posts/schema.js';

export const UsersType = new GraphQLObjectType({
  name: 'users',
  description: 'Users',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    profile: { type: ProfilesType },
    posts: { type: new GraphQLList(new GraphQLNonNull(PostsType)) },
  }),
});
