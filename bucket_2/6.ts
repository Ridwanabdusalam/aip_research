import * as grpc from '@grpc/grpc-js';
import * as proto from './corrected_proto_file_pb';
import * as proto_grpc from './corrected_proto_file_grpc_pb';

class ChildrensTwitterService implements proto_grpc.ChildrensTwitterServiceService {
  createAccount(
    call: grpc.ServerUnaryCall<proto.CreateAccountRequest>,
    callback: grpc.sendUnaryData<proto.Account>
  ) {
    // Implement the logic to create an account
    const response = new proto.Account();
    callback(null, response);
  }

  updateAccount(
    call: grpc.ServerUnaryCall<proto.UpdateAccountRequest>,
    callback: grpc.sendUnaryData<proto.Account>
  ) {
    // Implement the logic to update an account
    const response = new proto.Account();
    callback(null, response);
  }

  getAccount(
    call: grpc.ServerUnaryCall<proto.GetAccountRequest>,
    callback: grpc.sendUnaryData<proto.Account>
  ) {
    // Implement the logic to get an account
    const response = new proto.Account();
    callback(null, response);
  }

  inviteEmail(
    call: grpc.ServerUnaryCall<proto.InviteEmailRequest>,
    callback: grpc.sendUnaryData<grpc.Empty>
  ) {
    // Implement the logic to invite an email
    callback(null, new grpc.Empty());
  }

  acceptInvitation(
    call: grpc.ServerUnaryCall<proto.AcceptInvitationRequest>,
    callback: grpc.sendUnaryData<grpc.Empty>
  ) {
    // Implement the logic to accept an invitation
    callback(null, new grpc.Empty());
  }

  createTweet(
    call: grpc.ServerUnaryCall<proto.CreateTweetRequest>,
    callback: grpc.sendUnaryData<proto.Tweet>
  ) {
    // Implement the logic to create a tweet
    const response = new proto.Tweet();
    callback(null, response);
  }

  updateTweet(
    call: grpc.ServerUnaryCall<proto.UpdateTweetRequest>,
    callback: grpc.sendUnaryData<proto.Tweet>
  ) {
    // Implement the logic to update a tweet
    const response = new proto.Tweet();
    callback(null, response);
  }

  getTweet(
    call: grpc.ServerUnaryCall<proto.GetTweetRequest>,
    callback: grpc.sendUnaryData<proto.Tweet>
  ) {
    // Implement the logic to get a tweet
    const response = new proto.Tweet();
    callback(null, response);
  }

  listTweets(
    call: grpc.ServerUnaryCall<proto.ListTweetsRequest>,
    callback: grpc.sendUnaryData<proto.ListTweetsResponse>
  ) {
    // Implement the logic to list tweets
    const response = new proto.ListTweetsResponse();
    callback(null, response);
  }

  deleteTweet(
    call: grpc.ServerUnaryCall<proto.DeleteTweetRequest>,
    callback: grpc.sendUnaryData<grpc.Empty>
  ) {
    // Implement the logic to delete a tweet
    callback(null, new grpc.Empty());
  }

  exportTweets(
    call: grpc.ServerUnaryCall<proto.ExportTweetsRequest>,
    callback: grpc.sendUnaryData<proto.ExportTweetsResponse>
  ) {
    // Implement the logic to export tweets
    // Return a long-running operation response
    const response = new proto.ExportTweetsResponse();
    response.setOperationId('operation_id');
    callback(null, response);
  }
}

const server = new grpc.Server();
server.addService(proto_grpc.ChildrensTwitterServiceService, new ChildrensTwitterService());
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Server started listening on port 50051');
});
