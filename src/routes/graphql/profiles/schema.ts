import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UsersType } from '../users/schema.js';
import { MemberTypesType } from '../member-types/schema.js';
import { profileMemberTypeResover, profileUserResover } from './resolver.js';

export const ProfilesType = new GraphQLObjectType({
  name: 'profiles',
  description: 'Profiles',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user: { type: UsersType, resolve: profileUserResover },
    memberType: {
      type: MemberTypesType,
      resolve: profileMemberTypeResover,
    },
  }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  description: 'Change Profile Input',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: {
      type: GraphQLString,
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  description: 'Create Profile Input',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: {
      type: GraphQLString,
    },
  }),
});
