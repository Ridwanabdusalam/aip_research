import * as grpc from 'grpc';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { AccountServiceService, ChildrenFollowingServiceService, TweetsServiceService } from './generated/twitter_grpc_pb';
import { Child, Parent, Tweet, TweetComment } from './generated/twitter_pb';

class AccountService implements AccountServiceService {
  createParent(call: grpc.ServerUnaryCall<Parent>, callback: grpc.sendUnaryData<Parent>): void {
    // Implement logic to create a parent account
    const parent = new Parent();
    callback(null, parent);
  }

  updateParent(call: grpc.ServerUnaryCall<Parent>, callback: grpc.sendUnaryData<Parent>): void {
    // Implement logic to update a parent account
    const parent = new Parent();
    callback(null, parent);
  }

  createChild(call: grpc.ServerUnaryCall<Child>, callback: grpc.sendUnaryData<Child>): void {
    // Implement logic to create a child account
    const child = new Child();
    callback(null, child);
  }

  updateChild(call: grpc.ServerUnaryCall<Child>, callback: grpc.sendUnaryData<Child>): void {
    // Implement logic to update a child account
    const child = new Child();
    callback(null, child);
  }

  getChildByUsername(call: grpc.ServerUnaryCall<{ username: string }>, callback: grpc.sendUnaryData<Child>): void {
    // Implement logic to get a child by username
    const child = new Child();
    callback(null, child);
  }

  verifyEmail(call: grpc.ServerUnaryCall<{ key: string }>, callback: grpc.sendUnaryData<Empty>): void {
    // Implement logic to verify email
    const response = new Empty();
    callback(null, response);
  }
}

class ChildrenFollowingService implements ChildrenFollowingServiceService {
  followChild(call: grpc.ServerUnaryCall<{ childId: string }>, callback: grpc.sendUnaryData<Empty>): void {
    // Implement logic to follow a child
    const response = new Empty();
    callback(null, response);
  }

  listFollowers(call: grpc.ServerUnaryCall<{ childId: string }>): void {
    // Implement logic to list followers of a child
    const followers: Child[] = [];
    const stream = call.request.childId;
    for (const follower of followers) {
      stream.write(follower);
    }
    stream.end();
  }

  listFollowing(call: grpc.ServerUnaryCall<{ childId: string }>): void {
    // Implement logic to list following of a child
    const following: Child[] = [];
    const stream = call.request.childId;
    for (const followed of following) {
      stream.write(followed);
    }
    stream.end();
  }
}

class TweetsService implements TweetsServiceService {
  createTweet(call: grpc.ServerUnaryCall<Tweet>, callback: grpc.sendUnaryData<Tweet>): void {
    // Implement logic to create a tweet
    const tweet = new Tweet();
    callback(null, tweet);
  }

  getTweet(call: grpc.ServerUnaryCall<{ id: string }>, callback: grpc.sendUnaryData<Tweet>): void {
    // Implement logic to get a tweet
    const tweet = new Tweet();
    callback(null, tweet);
  }

  deleteTweet(call: grpc.ServerUnaryCall<{ id: string }>, callback: grpc.sendUnaryData<Empty>): void {
    // Implement logic to delete a tweet
    const response = new Empty();
    callback(null, response);
  }

  likeTweet(call: grpc.ServerUnaryCall<{ id: string }>, callback: grpc.sendUnaryData<Empty>): void {
    // Implement logic to like a tweet
    const response = new Empty();
    callback(null, response);
  }

  listTweets(call: grpc.ServerUnaryCall<{ childId: string }>): void {
    // Implement logic to list tweets
    const tweets: Tweet[] = [];
    const stream = call.request.childId;
    for (const tweet of tweets) {
      stream.write(tweet);
    }
    stream.end();
  }

  listFeedTweets(call: grpc.ServerUnaryCall<Empty>): void {
    // Implement logic to list feed tweets
    const feedTweets: Tweet[] = [];
    const stream = call.request;
    for (const tweet of feedTweets) {
      stream.write(tweet);
    }
    stream.end();
  }

  createTweetComment(call: grpc.ServerUnaryCall<TweetComment>, callback: grpc.sendUnaryData<TweetComment>): void {
    // Implement logic to create a tweet comment
    const tweetComment = new TweetComment();
    callback(null, tweetComment);
  }

  getTweetComment(call: grpc.ServerUnaryCall<{ id: string }>, callback: grpc.sendUnaryData<TweetComment>): void {
    // Implement logic to get a tweet comment
    const tweetComment = new TweetComment();
    callback(null, tweetComment);
  }
}

function startServer(): void {
  const server = new grpc.Server();
  server.addService(AccountServiceService, new AccountService());
  server.addService(ChildrenFollowingServiceService, new ChildrenFollowingService());
  server.addService(TweetsServiceService, new TweetsService());
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

startServer();


// client:

// Get a child by username
function getChildByUsername(username: string) {
  const request = new GetChildByUsernameRequest();
  request.setUsername(username);

  client.getChildByUsername(request, (error: grpc.ServiceError | null, response: Child) => {
    if (!error) {
      console.log('Child details:', response.toObject());
    } else {
      console.error('Error getting child by username:', error.details);
    }
  });
}
