import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema } from 'graphql';
import { MemberTypeId, MemberTypesType } from './member-types/schema.js';
import { PostsType } from './posts/schema.js';
import { memberTypeByIdResolver, memberTypesResolver } from './member-types/resolver.js';
import { postByIdResover, postsResover } from './posts/resolver.js';
import { UsersType } from './users/schema.js';
import { userByIdResover, usersResover } from './users/resolver.js';
import { ProfilesType } from './profiles/schema.js';
import { profileByIdResover, profilesResover } from './profiles/resolver.js';
import { UUIDType } from './types/uuid.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLList(new GraphQLNonNull(MemberTypesType)),
      resolve: memberTypesResolver,
    },
    memberType: {
      type: new GraphQLNonNull(MemberTypesType),
      args: {
        id: {
          description: 'MemberTypeId',
          type: MemberTypeId,
        },
      },
      resolve: memberTypeByIdResolver,
    },
    posts: {
      type: new GraphQLList(new GraphQLNonNull(PostsType)),
      resolve: postsResover,
    },
    post: {
      type: new GraphQLNonNull(PostsType),
      args: {
        id: {
          description: 'Post Id',
          type: UUIDType,
        },
      },
      resolve: postByIdResover,
    },
    users: {
      type: new GraphQLList(new GraphQLNonNull(UsersType)),
      resolve: usersResover,
    },
    user: {
      type: new GraphQLNonNull(UsersType),
      args: {
        id: {
          description: 'User Id',
          type: UUIDType,
        },
      },
      resolve: userByIdResover,
    },
    profiles: {
      type: new GraphQLList(new GraphQLNonNull(ProfilesType)),
      resolve: profilesResover,
    },
    profile: {
      type: new GraphQLNonNull(ProfilesType),
      args: {
        id: {
          description: 'Profile Id',
          type: UUIDType,
        },
      },
      resolve: profileByIdResover,
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
