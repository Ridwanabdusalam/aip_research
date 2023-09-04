import * as grpc from 'grpc';
import { empty } from 'google-protobuf/google/protobuf/empty_pb';
import { KidTwitterService, IKidTwitterServer } from './generated/account_pb';

class KidTwitterServicer implements IKidTwitterServer {

  createAdmin(
    call: grpc.ServerUnaryCall<CreateAdminRequest>,
    callback: grpc.sendUnaryData<Admin>
  ): void {
    // Implement logic to create an admin
    const response = new Admin();
    callback(null, response);
  }

  verifyEmail(
    call: grpc.ServerUnaryCall<VerifyEmailRequest>,
    callback: grpc.sendUnaryData<VerifyEmailResponse>
  ): void {
    // Implement logic to verify email
    const response = new VerifyEmailResponse();
    callback(null, response);
  }

  invite(
    call: grpc.ServerUnaryCall<InviteRequest>,
    callback: grpc.sendUnaryData<inviteResponse>
  ): void {
    // Implement logic to send invite
    const response = new inviteResponse();
    callback(null, response);
  }

  createUser(
    call: grpc.ServerUnaryCall<CreateUserRequest>,
    callback: grpc.sendUnaryData<User>
  ): void {
    // Implement logic to create a user
    const response = new User();
    callback(null, response);
  }

  updateUser(
    call: grpc.ServerUnaryCall<UpdateUserRequest>,
    callback: grpc.sendUnaryData<User>
  ): void {
    // Implement logic to update a user
    const response = new User();
    callback(null, response);
  }

  createTweet(
    call: grpc.ServerUnaryCall<CreateTweetRequest>,
    callback: grpc.sendUnaryData<Tweet>
  ): void {
    // Implement logic to create a tweet
    const response = new Tweet();
    callback(null, response);
  }

  listTweets(
    call: grpc.ServerUnaryCall<ListTweetsRequest>,
    callback: grpc.sendUnaryData<ListTweetsResponse>
  ): void {
    // Implement logic to list tweets
    const response = new ListTweetsResponse();
    callback(null, response);
  }

  listUsers(
    call: grpc.ServerUnaryCall<ListUsersRequest>,
    callback: grpc.sendUnaryData<ListUsersResponse>
  ): void {
    // Implement logic to list users
    const response = new ListUsersResponse();
    callback(null, response);
  }

  createComment(
    call: grpc.ServerUnaryCall<CreateCommentRequest>,
    callback: grpc.sendUnaryData<CreateCommentResponse>
  ): void {
    // Implement logic to create a comment
    const response = new CreateCommentResponse();
    callback(null, response);
  }

  listComments(
    call: grpc.ServerUnaryCall<ListCommentsRequest>,
    callback: grpc.sendUnaryData<ListCommentResponse>
  ): void {
    // Implement logic to list comments
    const response = new ListCommentResponse();
    callback(null, response);
  }

  interactWithUser(
    call: grpc.ServerUnaryCall<InteractWithUserRequest>,
    callback: grpc.sendUnaryData<InteractWithUserResponse>
  ): void {
    // Implement logic to interact with a user
    const response = new InteractWithUserResponse();
    callback(null, response);
  }

  exportTweets(
    call: grpc.ServerUnaryCall<ExportTweetsRequest>,
    callback: grpc.sendUnaryData<ExportTweetsResponse>
  ): void {
    // Implement logic to export tweets
    const response = new ExportTweetsResponse();
    callback(null, response);
  }
}

const server = new grpc.Server();
server.addService(KidTwitterService, new KidTwitterServicer());
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();





// client side:


// Create a parent account
function createParentAccount(name: string, email: string, password: string) {
  const request = new CreateParentAccountRequest();
  request.setName(name);
  request.setEmail(email);
  request.setPassword(password);

  client.createParentAccount(request, (error, response: ParentAccount) => {
    if (!error) {
      console.log('Parent account created:', response);
    } else {
      console.error('Error creating parent account:', error.message);
    }
  });
}

// Update a parent account
function updateParentAccount(accountId: string, updatedData: any) {
  const request = new UpdateParentAccountRequest();
  request.setAccountId(accountId);
  request.setUpdatedData(updatedData);

  client.updateParentAccount(request, (error, response: ParentAccount) => {
    if (!error) {
      console.log('Parent account updated:', response);
    } else {
      console.error('Error updating parent account:', error.message);
    }
  });
}

// execute
if (require.main === module) {
  createParentAccount('Ridwan Abdusalam', 'ridwanexample.com', 'pass123@');
  const updateData = { name: 'New Name', email: 'newemail@example.com' };
  updateParentAccount('123456', updateData);
}
