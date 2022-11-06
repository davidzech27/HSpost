import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  commentedOn: Scalars['DateTime'];
  commenter: User;
  id: Scalars['ID'];
  replyToId?: Maybe<Scalars['ID']>;
  text: Scalars['String'];
};

export type DistrictInfo = {
  __typename?: 'DistrictInfo';
  district: Scalars['String'];
  schools?: Maybe<Array<Scalars['String']>>;
};

export type FriendInfo = {
  __typename?: 'FriendInfo';
  onPostId?: Maybe<Scalars['ID']>;
  profile: User;
};

export type Friendship = {
  __typename?: 'Friendship';
  friend: User;
  relationshipDescription?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriend: Scalars['Boolean'];
  addFriend: Scalars['Boolean'];
  createComment: Comment;
  createPost: Post;
  enterPost: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  report?: Maybe<Scalars['Boolean']>;
  updateProfile: Scalars['Boolean'];
  updateRelationshipDescription: Scalars['Boolean'];
};


export type MutationAcceptFriendArgs = {
  fromEmail: Scalars['ID'];
};


export type MutationAddFriendArgs = {
  toEmail: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['ID'];
  replyToId?: InputMaybe<Scalars['ID']>;
  text: Scalars['String'];
};


export type MutationCreatePostArgs = {
  postVisibility: PostVisibility;
  text: Scalars['String'];
};


export type MutationEnterPostArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFriendArgs = {
  ofEmail: Scalars['ID'];
};


export type MutationReportArgs = {
  postId: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  schoolName?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateRelationshipDescriptionArgs = {
  description: Scalars['String'];
  friendEmail: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  comments: Array<Comment>;
  id: Scalars['ID'];
  postVisibility: PostVisibility;
  postedOn: Scalars['DateTime'];
  poster: User;
  text: Scalars['String'];
};

export enum PostVisibility {
  District = 'DISTRICT',
  Friends = 'FRIENDS',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  accessToken: Scalars['String'];
  districtInfo: DistrictInfo;
  feed: Array<Post>;
  friendRequests: Array<User>;
  friends: Array<FriendInfo>;
  post?: Maybe<Post>;
  profile: User;
  user?: Maybe<User>;
};


export type QueryFeedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  email: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  getNextComment?: Maybe<Comment>;
};


export type SubscriptionGetNextCommentArgs = {
  postId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  commentCount?: Maybe<Scalars['Int']>;
  email: Scalars['ID'];
  friendships?: Maybe<Array<Friendship>>;
  joinedOn: Scalars['DateTime'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<Array<Post>>;
  schoolAbbreviation?: Maybe<Scalars['String']>;
  schoolName?: Maybe<Scalars['String']>;
};

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['ID'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } } };

export type GetNextCommentSubscriptionVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetNextCommentSubscription = { __typename?: 'Subscription', getNextComment?: { __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } } | null };

export type GetFeedQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetFeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any, poster: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> };

export type AcceptFriendRequestMutationVariables = Exact<{
  fromEmail: Scalars['ID'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriend: boolean };

export type AddFriendMutationVariables = Exact<{
  toEmail: Scalars['ID'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: boolean };

export type RemoveFriendMutationVariables = Exact<{
  ofEmail: Scalars['ID'];
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend: boolean };

export type UpdateRelationshipDescriptionMutationVariables = Exact<{
  friendEmail: Scalars['ID'];
  description: Scalars['String'];
}>;


export type UpdateRelationshipDescriptionMutation = { __typename?: 'Mutation', updateRelationshipDescription: boolean };

export type GetAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccessTokenQuery = { __typename?: 'Query', accessToken: string };

export type GetDistrictInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDistrictInfoQuery = { __typename?: 'Query', districtInfo: { __typename?: 'DistrictInfo', schools?: Array<string> | null, district: string } };

export type GetFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestsQuery = { __typename?: 'Query', friendRequests: Array<{ __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any }> };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'FriendInfo', onPostId?: string | null, profile: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', commentCount?: number | null, postCount?: number | null, email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } };

export type UpdateProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  schoolName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: boolean };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  postVisibility: PostVisibility;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any } };

export type EnterPostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EnterPostMutation = { __typename?: 'Mutation', enterPost: boolean };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any, poster: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> } | null };

export type GetPostInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostInfoQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any, poster: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } } | null };

export type PostInfoFragment = { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any };

export type ReportPostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type ReportPostMutation = { __typename?: 'Mutation', report?: boolean | null };

export type GetUserQueryVariables = Exact<{
  email: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any, posts?: Array<{ __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any }> | null, friendships?: Array<{ __typename?: 'Friendship', relationshipDescription?: string | null, friend: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> | null } | null };

export type GetUserInfoQueryVariables = Exact<{
  email: Scalars['ID'];
}>;


export type GetUserInfoQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } | null };

export type ProfileFragment = { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any };

export const PostInfoFragmentDoc = gql`
    fragment PostInfo on Post {
  id
  text
  commentCount
  postedOn
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on User {
  email
  name
  photo
  bio
  schoolName
  schoolAbbreviation
  joinedOn
}
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $postId: ID!) {
  createComment(text: $text, postId: $postId) {
    id
    text
    commenter {
      ...Profile
    }
    replyToId
    commentedOn
  }
}
    ${ProfileFragmentDoc}`;
export const GetNextCommentDocument = gql`
    subscription GetNextComment($postId: ID!) {
  getNextComment(postId: $postId) {
    id
    text
    commenter {
      ...Profile
    }
    replyToId
    commentedOn
  }
}
    ${ProfileFragmentDoc}`;
export const GetFeedDocument = gql`
    query GetFeed($take: Int, $skip: Int) {
  feed(take: $take, skip: $skip) {
    ...PostInfo
    poster {
      ...Profile
    }
  }
}
    ${PostInfoFragmentDoc}
${ProfileFragmentDoc}`;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($fromEmail: ID!) {
  acceptFriend(fromEmail: $fromEmail)
}
    `;
export const AddFriendDocument = gql`
    mutation AddFriend($toEmail: ID!) {
  addFriend(toEmail: $toEmail)
}
    `;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($ofEmail: ID!) {
  removeFriend(ofEmail: $ofEmail)
}
    `;
export const UpdateRelationshipDescriptionDocument = gql`
    mutation UpdateRelationshipDescription($friendEmail: ID!, $description: String!) {
  updateRelationshipDescription(
    friendEmail: $friendEmail
    description: $description
  )
}
    `;
export const GetAccessTokenDocument = gql`
    query GetAccessToken {
  accessToken
}
    `;
export const GetDistrictInfoDocument = gql`
    query GetDistrictInfo {
  districtInfo {
    schools
    district
  }
}
    `;
export const GetFriendRequestsDocument = gql`
    query GetFriendRequests {
  friendRequests {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;
export const GetFriendsDocument = gql`
    query GetFriends {
  friends {
    profile {
      ...Profile
    }
    onPostId
  }
}
    ${ProfileFragmentDoc}`;
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    ...Profile
    commentCount
    postCount
  }
}
    ${ProfileFragmentDoc}`;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($name: String, $photo: String, $bio: String, $schoolName: String) {
  updateProfile(name: $name, photo: $photo, bio: $bio, schoolName: $schoolName)
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $postVisibility: PostVisibility!) {
  createPost(text: $text, postVisibility: $postVisibility) {
    ...PostInfo
  }
}
    ${PostInfoFragmentDoc}`;
export const EnterPostDocument = gql`
    mutation EnterPost($id: ID!) {
  enterPost(id: $id)
}
    `;
export const GetPostDocument = gql`
    query GetPost($id: ID!) {
  post(id: $id) {
    ...PostInfo
    poster {
      ...Profile
    }
    comments {
      id
      text
      commenter {
        ...Profile
      }
      replyToId
      commentedOn
    }
  }
}
    ${PostInfoFragmentDoc}
${ProfileFragmentDoc}`;
export const GetPostInfoDocument = gql`
    query GetPostInfo($id: ID!) {
  post(id: $id) {
    poster {
      ...Profile
    }
    ...PostInfo
  }
}
    ${ProfileFragmentDoc}
${PostInfoFragmentDoc}`;
export const ReportPostDocument = gql`
    mutation ReportPost($postId: ID!) {
  report(postId: $postId)
}
    `;
export const GetUserDocument = gql`
    query GetUser($email: ID!) {
  user(email: $email) {
    ...Profile
    posts {
      ...PostInfo
    }
    friendships {
      friend {
        ...Profile
      }
      relationshipDescription
    }
  }
}
    ${ProfileFragmentDoc}
${PostInfoFragmentDoc}`;
export const GetUserInfoDocument = gql`
    query GetUserInfo($email: ID!) {
  user(email: $email) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateComment', 'mutation');
    },
    GetNextComment(variables: GetNextCommentSubscriptionVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNextCommentSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNextCommentSubscription>(GetNextCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNextComment', 'subscription');
    },
    GetFeed(variables?: GetFeedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFeedQuery>(GetFeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetFeed', 'query');
    },
    AcceptFriendRequest(variables: AcceptFriendRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AcceptFriendRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AcceptFriendRequestMutation>(AcceptFriendRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AcceptFriendRequest', 'mutation');
    },
    AddFriend(variables: AddFriendMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddFriendMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddFriendMutation>(AddFriendDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddFriend', 'mutation');
    },
    RemoveFriend(variables: RemoveFriendMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveFriendMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveFriendMutation>(RemoveFriendDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveFriend', 'mutation');
    },
    UpdateRelationshipDescription(variables: UpdateRelationshipDescriptionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateRelationshipDescriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateRelationshipDescriptionMutation>(UpdateRelationshipDescriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateRelationshipDescription', 'mutation');
    },
    GetAccessToken(variables?: GetAccessTokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAccessTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccessTokenQuery>(GetAccessTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAccessToken', 'query');
    },
    GetDistrictInfo(variables?: GetDistrictInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDistrictInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDistrictInfoQuery>(GetDistrictInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDistrictInfo', 'query');
    },
    GetFriendRequests(variables?: GetFriendRequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFriendRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFriendRequestsQuery>(GetFriendRequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetFriendRequests', 'query');
    },
    GetFriends(variables?: GetFriendsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFriendsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFriendsQuery>(GetFriendsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetFriends', 'query');
    },
    GetProfile(variables?: GetProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileQuery>(GetProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProfile', 'query');
    },
    UpdateProfile(variables?: UpdateProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>(UpdateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateProfile', 'mutation');
    },
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    EnterPost(variables: EnterPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EnterPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EnterPostMutation>(EnterPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EnterPost', 'mutation');
    },
    GetPost(variables: GetPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostQuery>(GetPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPost', 'query');
    },
    GetPostInfo(variables: GetPostInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostInfoQuery>(GetPostInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostInfo', 'query');
    },
    ReportPost(variables: ReportPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReportPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReportPostMutation>(ReportPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReportPost', 'mutation');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    },
    GetUserInfo(variables: GetUserInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserInfoQuery>(GetUserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserInfo', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;