import * as grpc from 'grpc';
import * as tfk_pb from './twitter_for_kid_pb';
import * as tfk_grpc_pb from './twitter_for_kid_grpc_pb';

class TwitterForKidsService implements tfk_grpc_pb.TwitterForKidsServiceService {
  SearchChildren(
    call: grpc.ServerUnaryCall<tfk_pb.SearchChildrenRequest>,
    callback: grpc.sendUnaryData<tfk_pb.SearchChildrenResponse>
  ) {
    // Implement the logic to search children
    const response = new tfk_pb.SearchChildrenResponse();
    // Fill in the response
    callback(null, response);
  }

  ListTweets(
    call: grpc.ServerUnaryCall<tfk_pb.ListTweetsRequest>,
    callback: grpc.sendUnaryData<tfk_pb.ListTweetsResponse>
  ) {
    // Implement the logic to list tweets
    const response = new tfk_pb.ListTweetsResponse();
    // Fill in the response
    callback(null, response);
  }

  UpdateFollowing(
    call: grpc.ServerUnaryCall<tfk_pb.UpdateFollowingRequest>,
    callback: grpc.sendUnaryData<tfk_pb.UpdateFollowingResponse>
  ) {
    // Implement the logic to update following
    const response = new tfk_pb.UpdateFollowingResponse();
    response.setSuccess(true);
    callback(null, response);
  }

  CreateTweet(
    call: grpc.ServerUnaryCall<tfk_pb.CreateTweetRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Tweet>
  ) {
    // Implement the logic to create a tweet
    const response = new tfk_pb.Tweet();
    // Fill in the response
    callback(null, response);
  }

  TweetAction(
    call: grpc.ServerUnaryCall<tfk_pb.TweetActionRequest>,
    callback: grpc.sendUnaryData<tfk_pb.TweetActionResponse>
  ) {
    // Implement the logic for tweet actions
    const response = new tfk_pb.TweetActionResponse();
    response.setSuccess(true);
    callback(null, response);
  }

  CreateParent(
    call: grpc.ServerUnaryCall<tfk_pb.CreateParentRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Parent>
  ) {
    // Implement the logic to create a parent
    const response = new tfk_pb.Parent();
    // Fill in the response
    callback(null, response);
  }

  VerifyParent(
    call: grpc.ServerUnaryCall<tfk_pb.VerifyParentRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Parent>
  ) {
    // Implement the logic to verify a parent
    const response = new tfk_pb.Parent();
    // Fill in the response
    callback(null, response);
  }

  CompleteChild(
    call: grpc.ServerUnaryCall<tfk_pb.CompleteChildRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Child>
  ) {
    // Implement the logic to complete a child
    const response = new tfk_pb.Child();
    // Fill in the response
    callback(null, response);
  }

  VerifyChild(
    call: grpc.ServerUnaryCall<tfk_pb.VerifyChildRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Child>
  ) {
    // Implement the logic to verify a child
    const response = new tfk_pb.Child();
    // Fill in the response
    callback(null, response);
  }

  AddChild(
    call: grpc.ServerUnaryCall<tfk_pb.AddChildRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Parent>
  ) {
    // Implement the logic to add a child
    const response = new tfk_pb.Parent();
    // Fill in the response
    callback(null, response);
  }

  InviteParent(
    call: grpc.ServerUnaryCall<tfk_pb.InviteParentRequest>,
    callback: grpc.sendUnaryData<tfk_pb.InviteParentResponse>
  ) {
    // Implement the logic to invite a parent
    const response = new tfk_pb.InviteParentResponse();
    response.setSuccess(true);
    callback(null, response);
  }

  UpdateChildPassword(
    call: grpc.ServerUnaryCall<tfk_pb.UpdateChildPasswordRequest>,
    callback: grpc.sendUnaryData<tfk_pb.UpdateChildPasswordResponse>
  ) {
    // Implement the logic to update child password
    const response = new tfk_pb.UpdateChildPasswordResponse();
    response.setSuccess(true);
    callback(null, response);
  }

  UpdateChild(
    call: grpc.ServerUnaryCall<tfk_pb.UpdateChildRequest>,
    callback: grpc.sendUnaryData<tfk_pb.Child>
  ) {
    // Implement the logic to update a child
    const response = new tfk_pb.Child();
    // Fill in the response
    callback(null, response);
  }
}

const server = new grpc.Server();
server.addService(tfk_grpc_pb.TwitterForKidsServiceService, new TwitterForKidsService());
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
