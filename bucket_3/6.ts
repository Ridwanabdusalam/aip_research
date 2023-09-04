import * as grpc from 'grpc';
import { empty } from 'google-protobuf/google/protobuf/empty_pb';
import {
  SAccountServiceService,
  SFeedServiceService,
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
  ListAccountsRequest,
  ListAccountsResponse,
  FollowAccountRequest,
  FollowAccountResponse,
} from './generated/twitter_pb';
import {
  ListTweetsRequest,
  ListTweetsResponse,
  CreateTweetRequest,
  CreateTweetResponse,
  LikeTweetRequest,
  LikeTweetResponse,
  PeekTweetsRequest,
  PeekTweetsResponse,
  ExportTweetsRequest,
  ExportTweetsResponse,
  DeleteTweetRequest,
} from './generated/twitter_pb';

class AccountService implements SAccountServiceService {
  createAccount(
    call: grpc.ServerUnaryCall<CreateAccountRequest>,
    callback: grpc.sendUnaryData<Account>
  ) {
    // Implement logic to create an account
    const account = new Account();
    callback(null, account);
  }

  updateAccount(
    call: grpc.ServerUnaryCall<UpdateAccountRequest>,
    callback: grpc.sendUnaryData<Account>
  ) {
    // Implement logic to update an account
    const account = new Account();
    callback(null, account);
  }

  listAccounts(
    call: grpc.ServerUnaryCall<ListAccountsRequest>,
    callback: grpc.sendUnaryData<ListAccountsResponse>
  ) {
    // Implement logic to list accounts
    const response = new ListAccountsResponse();
    callback(null, response);
  }

  followAccount(
    call: grpc.ServerUnaryCall<FollowAccountRequest>,
    callback: grpc.sendUnaryData<FollowAccountResponse>
  ) {
    // Implement logic to follow an account
    const followedAccount = new Account();
    const response = new FollowAccountResponse();
    response.setFollowed(followedAccount);
    callback(null, response);
  }
}

class FeedService implements SFeedServiceService {
  listTweets(
    call: grpc.ServerUnaryCall<ListTweetsRequest>,
    callback: grpc.sendUnaryData<ListTweetsResponse>
  ) {
    // Implement logic to list tweets
    const response = new ListTweetsResponse();
    callback(null, response);
  }

  createTweet(
    call: grpc.ServerUnaryCall<CreateTweetRequest>,
    callback: grpc.sendUnaryData<CreateTweetResponse>
  ) {
    // Implement logic to create a tweet
    const tweet = new Account();
    const response = new CreateTweetResponse();
    response.setTweet(tweet);
    callback(null, response);
  }

  likeTweet(
    call: grpc.ServerUnaryCall<LikeTweetRequest>,
    callback: grpc.sendUnaryData<LikeTweetResponse>
  ) {
    // Implement logic to like a tweet
    const tweet = new Account();
    const response = new LikeTweetResponse();
    response.setTweet(tweet);
    callback(null, response);
  }

  peekTweets(
    call: grpc.ServerUnaryCall<PeekTweetsRequest>,
    callback: grpc.sendUnaryData<PeekTweetsResponse>
  ) {
    // Implement logic to peek at tweets
    const response = new PeekTweetsResponse();
    callback(null, response);
  }

  exportTweets(
    call: grpc.ServerUnaryCall<ExportTweetsRequest>,
    callback: grpc.sendUnaryData<ExportTweetsResponse>
  ) {
    // Implement logic to export tweets
    const response = new ExportTweetsResponse();
    callback(null, response);
  }

  deleteTweet(
    call: grpc.ServerUnaryCall<DeleteTweetRequest>,
    callback: grpc.sendUnaryData<empty>
  ) {
    // Implement logic to delete a tweet
    callback(null, new empty());
  }
}

const server = new grpc.Server();

server.addService(SAccountServiceService, new AccountService());
server.addService(SFeedServiceService, new FeedService());
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();




// client side:

function likeTweet(tweetId: string) {
  const request = new LikeTweetRequest();
  request.setTweetId(tweetId);

  client.likeTweet(request, (error: grpc.ServiceError | null, response: LikeTweetResponse) => {
    if (!error) {
      const likedTweet: Tweet | undefined = response.getTweet();
      if (likedTweet) {
        console.log('Tweet liked:', likedTweet.toObject());
      } else {
        console.log('Tweet liked.');
      }
    } else {
      console.error('Error liking tweet:', error.details);
    }
  });
}
