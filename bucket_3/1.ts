import * as grpc from '@grpc/grpc-js';
import { ChildService, FeedService, ParentService, TweetService } from './api_grpc_pb'; // Import your generated gRPC service classes
import {
    AcceptInvitationRequest, AcceptInvitationResponse,
    Child, CreateChildRequest, CreateChildResponse,
    CreateParentRequest, CreateParentResponse,
    CreateTweetRequest, CreateTweetResponse,
    DeleteTweetRequest, DeleteTweetResponse,
    Feed, FollowChildRequest, FollowChildResponse,
    InviteParentRequest, InviteParentResponse,
    LikeTweetRequest, LikeTweetResponse,
    ListChildrenRequest, ListChildrenResponse,
    ListTweetsRequest, ListTweetsResponse,
    Parent, ReplyTweetRequest, ReplyTweetResponse,
    RetweetTweetRequest, RetweetTweetResponse,
    SignUpChildRequest, SignUpChildResponse,
    Tweet, UpdateChildRequest, UpdateChildResponse,
    UpdateParentRequest, UpdateParentResponse,
    VerifyChildRequest, VerifyChildResponse,
    VerifyParentRequest, VerifyParentResponse
} from './api_pb'; // Import your generated message classes

const server = new grpc.Server();

// Implement ChildService
server.addService(ChildService, {
    createChild: (call: grpc.ServerUnaryCall<CreateChildRequest>, callback: grpc.sendUnaryData<CreateChildResponse>) => {
        // Implement the logic to create a child
        const response = new CreateChildResponse();
        // Set response properties
        callback(null, response);
    },
    verifyChild: (call: grpc.ServerUnaryCall<VerifyChildRequest>, callback: grpc.sendUnaryData<VerifyChildResponse>) => {
        // Implement the logic to verify a child
        const response = new VerifyChildResponse();
        // Set response properties
        callback(null, response);
    },
    // ... Implement other ChildService methods
});

// Implement FeedService
server.addService(FeedService, {
    listTweets: (call: grpc.ServerUnaryCall<ListTweetsRequest>, callback: grpc.sendUnaryData<ListTweetsResponse>) => {
        // Implement the logic to list tweets
        const response = new ListTweetsResponse();
        // Set response properties
        callback(null, response);
    },
    // ... Implement other FeedService methods
});

// Implement ParentService
server.addService(ParentService, {
    createParent: (call: grpc.ServerUnaryCall<CreateParentRequest>, callback: grpc.sendUnaryData<CreateParentResponse>) => {
        // Implement the logic to create a parent
        const response = new CreateParentResponse();
        // Set response properties
        callback(null, response);
    },
    verifyParent: (call: grpc.ServerUnaryCall<VerifyParentRequest>, callback: grpc.sendUnaryData<VerifyParentResponse>) => {
        // Implement the logic to verify a parent
        const response = new VerifyParentResponse();
        // Set response properties
        callback(null, response);
    },
    // ... Implement other ParentService methods
});

// Implement TweetService
server.addService(TweetService, {
    createTweet: (call: grpc.ServerUnaryCall<CreateTweetRequest>, callback: grpc.sendUnaryData<CreateTweetResponse>) => {
        // Implement the logic to create a tweet
        const response = new CreateTweetResponse();
        // Set response properties
        callback(null, response);
    },
    // ... Implement other TweetService methods
});

const serverPort = '0.0.0.0:50051';
server.bindAsync(serverPort, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server started on ${serverPort}`);
    server.start();
});





// client side:

 CreateTweet(request: CreateTweetRequest, context: any): CreateTweetResponse {
    const newTweet = new Tweet();
    newTweet.setText(request.getText());
    newTweet.setLikes(0);
    newTweet.setOriginalTweet('');
    newTweet.setName('tweet123'); //tweet id here

    const response = new CreateTweetResponse();
    response.setTweet(newTweet);
    return response;
  }

  DeleteTweet(request: DeleteTweetRequest, context: any): DeleteTweetResponse {
    const tweetId = request.getTweetId();

    const response = new DeleteTweetResponse();
    return response;
  }

  LikeTweet(request: LikeTweetRequest, context: any): LikeTweetResponse {
    const tweetId = request.getTweetId();

    const response = new LikeTweetResponse();
    return response;
  }

  ReplyTweet(request: ReplyTweetRequest, context: any): ReplyTweetResponse {
    const parentTweetId = request.getParentTweetId();
    const replyText = request.getReplyText();

    const newReply = new Tweet();
    newReply.setText(replyText);
    newReply.setLikes(0);
    newReply.setOriginalTweet(parentTweetId);
    newReply.setName('reply123'); //reply message id

    const response = new ReplyTweetResponse();
    response.setReply(newReply);
    return response;
  }

  RetweetTweet(request: any, context: any): RetweetTweetResponse {
    const tweetId = request.getTweetId();
    //tweet logic here

    const response = new RetweetTweetResponse();
    return response;
  }


