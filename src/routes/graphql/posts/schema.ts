import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UsersType } from '../users/schema.js';

export const PostsType = new GraphQLObjectType({
  name: 'posts',
  description: 'Posts',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: new GraphQLNonNull(UsersType) },
  }),
});
