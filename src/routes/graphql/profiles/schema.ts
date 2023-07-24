import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
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
