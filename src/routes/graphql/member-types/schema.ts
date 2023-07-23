import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { ProfilesType } from '../profiles/schema.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const MemberTypesType = new GraphQLObjectType({
  name: 'memberTypes',
  description: 'Member Types',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: { type: new GraphQLList(new GraphQLNonNull(ProfilesType)) },
  }),
});
