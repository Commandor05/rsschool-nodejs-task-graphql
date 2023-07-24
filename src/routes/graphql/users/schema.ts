import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfilesType } from '../profiles/schema.js';
import { PostsType } from '../posts/schema.js';
import {
  userSubscribedToResover,
  subscribedToUserResover,
  userPtofileResover,
  userPostsResover,
} from './resolver.js';

export const UsersType = new GraphQLObjectType({
  name: 'users',
  description: 'Users',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    profile: { type: ProfilesType, resolve: userPtofileResover },
    posts: {
      type: new GraphQLList(new GraphQLNonNull(PostsType)),
      resolve: userPostsResover,
    },

    userSubscribedTo: {
      type: new GraphQLList(UsersType),
      resolve: userSubscribedToResover,
    },

    subscribedToUser: {
      type: new GraphQLList(UsersType),
      resolve: subscribedToUserResover,
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  description: 'Create User Dto',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  description: 'Change User Dto',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
