import { Type } from '@fastify/type-provider-typebox';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLBoolean,
} from 'graphql';
import { MemberTypeId, MemberTypesType } from './member-types/schema.js';
import { ChangePostInput, CreatePostInput, PostsType } from './posts/schema.js';
import { memberTypeByIdResolver, memberTypesResolver } from './member-types/resolver.js';
import {
  changePostResolver,
  createPostResolver,
  deletePostResolver,
  postByIdResover,
  postsResover,
} from './posts/resolver.js';
import { ChangeUserInput, CreateUserInput, UsersType } from './users/schema.js';
import {
  changeUserResolver,
  createUserResolver,
  deleteUserResolver,
  subscribeToResolver,
  unsubscribeFromResolver,
  userByIdResover,
  usersResover,
} from './users/resolver.js';
import {
  ChangeProfileInput,
  CreateProfileInput,
  ProfilesType,
} from './profiles/schema.js';
import {
  changeProfileResolver,
  createProfileResolver,
  deleteProfileResolver,
  profileByIdResover,
  profilesResover,
} from './profiles/resolver.js';
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: MemberTypesType,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: PostsType,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: UsersType,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: ProfilesType,
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

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostsType),
      args: {
        dto: {
          description: 'Create Post Dto',
          type: new GraphQLNonNull(CreatePostInput),
          defaultValue: {},
        },
      },
      resolve: createPostResolver,
    },
    createUser: {
      type: new GraphQLNonNull(UsersType),
      args: {
        dto: {
          description: 'Create User Dto',
          type: new GraphQLNonNull(CreateUserInput),
          defaultValue: {},
        },
      },
      resolve: createUserResolver,
    },
    createProfile: {
      type: new GraphQLNonNull(ProfilesType),
      args: {
        dto: {
          description: 'Create Profile Dto',
          type: new GraphQLNonNull(CreateProfileInput),
          defaultValue: {},
        },
      },
      resolve: createProfileResolver,
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: {
          description: 'Post Id',
          type: UUIDType,
        },
      },
      resolve: deletePostResolver,
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: {
          description: 'Profile Id',
          type: UUIDType,
        },
      },
      resolve: deleteProfileResolver,
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: {
          description: 'User Id',
          type: UUIDType,
        },
      },
      resolve: deleteUserResolver,
    },
    changePost: {
      type: new GraphQLNonNull(PostsType),
      args: {
        id: {
          description: 'Post Id',
          type: UUIDType,
        },
        dto: {
          description: 'Post Dto',
          type: new GraphQLNonNull(ChangePostInput),
          defaultValue: {},
        },
      },
      resolve: changePostResolver,
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfilesType),
      args: {
        id: {
          description: 'Profile Id',
          type: UUIDType,
        },
        dto: {
          description: 'Profile Dto',
          type: new GraphQLNonNull(ChangeProfileInput),
          defaultValue: {},
        },
      },
      resolve: changeProfileResolver,
    },
    changeUser: {
      type: new GraphQLNonNull(UsersType),
      args: {
        id: {
          description: 'User Id',
          type: UUIDType,
        },
        dto: {
          description: 'User Dto',
          type: new GraphQLNonNull(ChangeUserInput),
          defaultValue: {},
        },
      },
      resolve: changeUserResolver,
    },
    subscribeTo: {
      type: new GraphQLNonNull(UsersType),
      args: {
        userId: {
          description: 'User Id',
          type: UUIDType,
        },
        authorId: {
          description: 'Author Id',
          type: UUIDType,
        },
      },
      resolve: subscribeToResolver,
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: {
          description: 'User Id',
          type: UUIDType,
        },
        authorId: {
          description: 'Author Id',
          type: UUIDType,
        },
      },
      resolve: unsubscribeFromResolver,
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
