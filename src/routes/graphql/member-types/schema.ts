import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLEnumType } from 'graphql';

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
  }),
});
