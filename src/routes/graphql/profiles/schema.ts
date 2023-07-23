import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UsersType } from '../users/schema.js';
import { MemberTypesType } from '../member-types/schema.js';

export const ProfilesType = new GraphQLObjectType({
  name: 'profiles',
  description: 'Profiles',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: { type: new GraphQLNonNull(UsersType) },
    memberType: { type: new GraphQLNonNull(MemberTypesType) },
  }),
});
