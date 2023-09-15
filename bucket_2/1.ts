// child_twitter.proto

enum AccountType {
    ACCOUNT_TYPE_UNSPECIFIED = 0,
    PARENT_ACCOUNT = 1,
    CHILD_ACCOUNT = 2,
  }
  
  enum AccountLifecycle {
    ACCOUNT_LIFECYCLE_UNSPECIFIED = 0,
    PENDING_EMAIL_VERIFICATION = 1,
    PENDING_SIGN_UP = 2,
    ACTIVE = 3,
    DELETE_REQUESTED = 4,
  }
  
  interface MAccount {
    name: string;
    type: AccountType;
    account_lifecycle: AccountLifecycle;
    birthdate: string;
    email: string;
    password: string;
  }
  
  interface MAddParentRequest {
    account: string;
    parent_account: string;
    second_parent_email: string;
  }
  
  interface MAddParentResponse {
    account: MAccount;
  }
  
  interface MComment {
    name: string;
    text: string;
  }
  
  interface MCreateAccountRequest {
    account: MAccount;
    account_id: string;
  }
  
  interface MCreateCommentRequest {
    parent: string;
    comment: MComment;
  }
  
  interface MCreateTweetRequest {
    parent: string;
    tweet: MTweet;
  }
  
  interface MDeleteTweetRequest {
    name: string;
  }
  
  interface MExportTweetsRequest {
    account: string;
    filename: string;
  }
  
  interface MExportTweetsResponse {}
  
  interface MFollowAccountRequest {
    name: string;
  }
  
  interface MFollowAccountResponse {
    followed_accounts: string[];
  }
  
  interface MLikeTweetRequest {
    name: string;
  }
  
  interface MLikeTweetResponse {}
  
  interface MListTweetsRequest {
    parent: string;
    page_size: number;
    page_token: string;
    order_by: string;
  }
  
  interface MListTweetsResponse {
    tweets: MTweet[];
    next_page_token: string;
  }
  
  interface MReTweetRequest {
    name: string;
  }
  
  interface MReTweetResponse {
    tweet: MTweet;
  }
  
  interface MSearchAccountsRequest {
    name: string;
  }
  
  interface MSearchAccountsResponse {
    accounts: string[];
  }
  
  interface MTweet {
    name: string;
    text: string;
    likes: number;
    original_tweet: string;
  }
  
  interface MUpdateAccountRequest {
    account: MAccount;
    update_mask: google.protobuf.FieldMask;
  }
  
  // TwitterForKidsService
  interface STwitterForKidsService {
    CreateAccount(request: MCreateAccountRequest): MAccount;
    UpdateAccount(request: MUpdateAccountRequest): MAccount;
    AddParent(request: MAddParentRequest): MAddParentResponse;
    SearchAccounts(request: MSearchAccountsRequest): MSearchAccountsResponse;
    FollowAccount(request: MFollowAccountRequest): MFollowAccountResponse;
    CreateTweet(request: MCreateTweetRequest): MTweet;
    DeleteTweet(request: MDeleteTweetRequest): google.protobuf.Empty;
    ListTweets(request: MListTweetsRequest): MListTweetsResponse;
    LikeTweet(request: MLikeTweetRequest): MLikeTweetResponse;
    ReTweet(request: MReTweetRequest): MReTweetResponse;
    CreateComment(request: MCreateCommentRequest): MComment;
    ExportTweets(request: MExportTweetsRequest): MExportTweetsResponse;
  }




// Client side
import * as grpc from 'grpc';
import { MCreateTweetRequest, MDeleteTweetRequest, MLikeTweetRequest, MCreateCommentRequest, MTweet } from './child_twitter_pb';
import { STwitterForKidsServiceClient } from './child_twitter_grpc_pb';

// Create a gRPC client to connect to the server
const client = new STwitterForKidsServiceClient('localhost:50051', grpc.credentials.createInsecure());

// Create a post
function createPost(parent: string, postText: string) {
    const request = new MCreatePostRequest();
    request.setParent(parent);
    const post = new MPost();
    post.setText(postText);
    request.setPost(post);

    client.createPost(request, (error, response) => {
        if (!error) {
            console.log(`Post created: ${response.getPost()?.getName()}`);
        } else {
            console.error('Error creating post:', error.message);
        }
    });
}

// Delete a tweet
function deleteTweet(tweetName: string) {
    const request = new MDeleteTweetRequest();
    request.setName(tweetName);

    client.deleteTweet(request, (error) => {
        if (!error) {
            console.log(`Tweet deleted: ${tweetName}`);
        } else {
            console.error('Error deleting tweet:', error.message);
        }
    });
}

// Like a tweet
function likeTweet(tweetName: string) {
    const request = new MLikeTweetRequest();
    request.setName(tweetName);

    client.likeTweet(request, (error) => {
        if (!error) {
            console.log(`Tweet liked: ${tweetName}`);
        } else {
            console.error('Error liking tweet:', error.message);
        }
    });
}

// Reply to a tweet
function replyToTweet(parentTweetName: string, replyText: string) {
    const request = new MCreateCommentRequest();
    request.setParent(parentPostName);
    const comment = new MTweet();
    comment.setText(replyText);
    request.setComment(comment);

    client.createComment(request, (error, response) => {
        if (!error) {
            console.log(`Reply created: ${response.getName()}`);
        } else {
            console.error('Error creating reply:', error.message);
        }
    });
}

// Usage
if (require.main === module) {
    createTweet('parent_account', 'Hello, Twitter for Kids!');
    deleteTweet('tweet123');
    likeTweet('tweet456');
    replyToTweet('tweet789', "That's great!");
}
