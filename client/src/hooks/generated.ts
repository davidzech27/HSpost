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
  commenter: Profile;
  id: Scalars['ID'];
  replyToId?: Maybe<Scalars['ID']>;
  text: Scalars['String'];
};

export type Friendship = {
  __typename?: 'Friendship';
  friend: Profile;
  relationshipDescription?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriend: Scalars['Boolean'];
  addFriend: Scalars['Boolean'];
  createComment: Comment;
  createPost: Post;
  removeFriend: Scalars['Boolean'];
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


export type MutationRemoveFriendArgs = {
  ofEmail: Scalars['ID'];
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
  poster: Profile;
  text: Scalars['String'];
};

export enum PostVisibility {
  District = 'DISTRICT',
  Friends = 'FRIENDS',
  Public = 'PUBLIC'
}

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['ID'];
  joinedOn: Scalars['DateTime'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  schoolAbbreviation?: Maybe<Scalars['String']>;
  schoolName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  accessToken: Scalars['String'];
  feed?: Maybe<Array<Post>>;
  friendRequests: Array<Profile>;
  friends: Array<Profile>;
  post?: Maybe<Post>;
  profile: Profile;
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
  email: Scalars['ID'];
  friendships: Array<Friendship>;
  joinedOn: Scalars['DateTime'];
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  schoolAbbreviation?: Maybe<Scalars['String']>;
  schoolName?: Maybe<Scalars['String']>;
};

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['ID'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } } };

export type GetNextCommentSubscriptionVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type GetNextCommentSubscription = { __typename?: 'Subscription', getNextComment?: { __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } } | null };

export type GetFeedQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetFeedQuery = { __typename?: 'Query', feed?: Array<{ __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any, poster: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> | null };

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

export type GetFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendRequestsQuery = { __typename?: 'Query', friendRequests: Array<{ __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any }> };

export type GetFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsQuery = { __typename?: 'Query', friends: Array<{ __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any }> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } };

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

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any, poster: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, replyToId?: string | null, commentedOn: any, commenter: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> } | null };

export type PostInfoFragment = { __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any };

export type GetUserQueryVariables = Exact<{
  email: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any, posts: Array<{ __typename?: 'Post', id: string, text: string, commentCount: number, postedOn: any }>, friendships: Array<{ __typename?: 'Friendship', relationshipDescription?: string | null, friend: { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any } }> } | null };

export type ProfileInfoFragment = { __typename?: 'Profile', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any };

export type UserInfoFragment = { __typename?: 'User', email: string, name: string, photo?: string | null, bio?: string | null, schoolName?: string | null, schoolAbbreviation?: string | null, joinedOn: any };

export const PostInfoFragmentDoc = gql`
    fragment PostInfo on Post {
  id
  text
  commentCount
  postedOn
}
    `;
export const ProfileInfoFragmentDoc = gql`
    fragment ProfileInfo on Profile {
  email
  name
  photo
  bio
  schoolName
  schoolAbbreviation
  joinedOn
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
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
      ...ProfileInfo
    }
    replyToId
    commentedOn
  }
}
    ${ProfileInfoFragmentDoc}`;
export const GetNextCommentDocument = gql`
    subscription GetNextComment($postId: ID!) {
  getNextComment(postId: $postId) {
    id
    text
    commenter {
      ...ProfileInfo
    }
    replyToId
    commentedOn
  }
}
    ${ProfileInfoFragmentDoc}`;
export const GetFeedDocument = gql`
    query GetFeed($take: Int, $skip: Int) {
  feed(take: $take, skip: $skip) {
    ...PostInfo
    poster {
      ...ProfileInfo
    }
  }
}
    ${PostInfoFragmentDoc}
${ProfileInfoFragmentDoc}`;
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
export const GetFriendRequestsDocument = gql`
    query GetFriendRequests {
  friendRequests {
    ...ProfileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;
export const GetFriendsDocument = gql`
    query GetFriends {
  friends {
    ...ProfileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    ...ProfileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;
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
export const GetPostDocument = gql`
    query GetPost($id: ID!) {
  post(id: $id) {
    ...PostInfo
    poster {
      ...ProfileInfo
    }
    comments {
      id
      text
      commenter {
        ...ProfileInfo
      }
      replyToId
      commentedOn
    }
  }
}
    ${PostInfoFragmentDoc}
${ProfileInfoFragmentDoc}`;
export const GetUserDocument = gql`
    query GetUser($email: ID!) {
  user(email: $email) {
    ...UserInfo
    posts {
      ...PostInfo
    }
    friendships {
      friend {
        ...ProfileInfo
      }
      relationshipDescription
    }
  }
}
    ${UserInfoFragmentDoc}
${PostInfoFragmentDoc}
${ProfileInfoFragmentDoc}`;

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
    GetPost(variables: GetPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostQuery>(GetPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPost', 'query');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;