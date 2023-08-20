import * as grpc from 'grpc';
import { ParentUserServiceService, ChildUserServiceService, FollowServiceService, TweetServiceService } from './twitter_pb2_grpc';
import { Empty, ParentUser, ChildUser, Follow, SearchChildUsersResponse, ListFollowsResponse, Tweet, FeedTweetsResponse, ExportTweetsResponse } from './twitter_pb2';

class ParentUserService implements ParentUserServiceService {
  createParentUser(call: grpc.ServerUnaryCall<ParentUser>, callback: grpc.sendUnaryData<ParentUser>): void {
    // TODO: Implement the logic to create a new parent user
    const response = new ParentUser();
    callback(null, response);
  }

  validateParentUserEmail(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<Empty>): void {
    // TODO: Implement the logic to validate parent user's email
    const response = new Empty();
    callback(null, response);
  }

  inviteSecondParentUser(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<Empty>): void {
    // TODO: Implement the logic to invite a second parent
    const response = new Empty();
    callback(null, response);
  }

  updateParentUser(call: grpc.ServerUnaryCall<ParentUser>, callback: grpc.sendUnaryData<ParentUser>): void {
    // TODO: Implement the logic to update parent user's data
    const response = new ParentUser();
    callback(null, response);
  }
}

class ChildUserService implements ChildUserServiceService {
  createChildUser(call: grpc.ServerUnaryCall<ChildUser>, callback: grpc.sendUnaryData<ChildUser>): void {
    // TODO: Implement the logic to create a new child user
    const response = new ChildUser();
    callback(null, response);
  }

  updateChildUser(call: grpc.ServerUnaryCall<ChildUser>, callback: grpc.sendUnaryData<ChildUser>): void {
    // TODO: Implement the logic to update child user's data
    const response = new ChildUser();
    callback(null, response);
  }

  searchChildUsers(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<SearchChildUsersResponse>): void {
    // TODO: Implement the logic to search for child users
    const response = new SearchChildUsersResponse();
    callback(null, response);
  }
}

class FollowService implements FollowServiceService {
  createFollow(call: grpc.ServerUnaryCall<Follow>, callback: grpc.sendUnaryData<Follow>): void {
    // TODO: Implement the logic to create a follow
    const response = new Follow();
    callback(null, response);
  }

  deleteFollow(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<Empty>): void {
    // TODO: Implement the logic to delete a follow
    const response = new Empty();
    callback(null, response);
  }

  listFollows(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<ListFollowsResponse>): void {
    // TODO: Implement the logic to list followed accounts
    const response = new ListFollowsResponse();
    callback(null, response);
  }
}

class TweetService implements TweetServiceService {
  createTweet(call: grpc.ServerUnaryCall<Tweet>, callback: grpc.sendUnaryData<Tweet>): void {
    // TODO: Implement the logic to create a new tweet
    const response = new Tweet();
    callback(null, response);
  }

  feedTweets(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<FeedTweetsResponse>): void {
    // TODO: Implement the logic to retrieve tweets from feeds
    const response = new FeedTweetsResponse();
    callback(null, response);
  }

  exportTweets(call: grpc.ServerUnaryCall<Empty>, callback: grpc.sendUnaryData<ExportTweetsResponse>): void {
    // TODO: Implement the logic to export tweets to CSV
    const response = new ExportTweetsResponse();
    callback(null, response);
  }
}

function serve() {
  const server = new grpc.Server();
  server.addService(ParentUserServiceService, new ParentUserService());
  server.addService(ChildUserServiceService, new ChildUserService());
  server.addService(FollowServiceService, new FollowService());
  server.addService(TweetServiceService, new TweetService());
  server.bindAsync('[::]:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

serve();
