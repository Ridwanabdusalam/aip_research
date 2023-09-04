import grpc
from google.protobuf import empty_pb2
from concurrent import futures
from generated import (
    account_pb2,
    account_pb2_grpc,
)

class KidTwitterServicer(account_pb2_grpc.KidTwitterServicer):

    def CreateAdmin(self, request, context):
        # Implement logic to create an admin
        response = account_pb2.Admin()
        return response

    def VerifyEmail(self, request, context):
        # Implement logic to verify email
        response = account_pb2.VerifyEmailResponse()
        return response

    def Invite(self, request, context):
        # Implement logic to send invite
        response = account_pb2.inviteResponse()
        return response

    def CreateUser(self, request, context):
        # Implement logic to create a user
        response = account_pb2.User()
        return response

    def UpdateUser(self, request, context):
        # Implement logic to update a user
        response = account_pb2.User()
        return response

    def CreateTweet(self, request, context):
        # Implement logic to create a tweet
        response = account_pb2.Tweet()
        return response

    def ListTweets(self, request, context):
        # Implement logic to list tweets
        response = account_pb2.ListTweetsResponse()
        return response

    def ListUsers(self, request, context):
        # Implement logic to list users
        response = account_pb2.ListUsersResponse()
        return response

    def CreateComment(self, request, context):
        # Implement logic to create a comment
        response = account_pb2.CreateCommentResponse()
        return response

    def ListComments(self, request, context):
        # Implement logic to list comments
        response = account_pb2.ListCommentResponse()
        return response

    def InteractWithUser(self, request, context):
        # Implement logic to interact with a user
        response = account_pb2.InteractWithUserResponse()
        return response

    def ExportTweets(self, request, context):
        # Implement logic to export tweets
        response = account_pb2.ExportTweetsResponse()
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    account_pb2_grpc.add_KidTwitterServicer_to_server(KidTwitterServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()




# client side:

#after all imports requred...

# Create a parent account
def create_parent_account(name, email, password):
    request = CreateParentAccountRequest(name=name, email=email, password=password)
    try:
        response = client.CreateParentAccount(request)
        print('Parent account created:', response)
    except grpc.RpcError as e:
        print('Error creating parent account:', e.details())

# Update a parent account
def update_parent_account(account_id, updated_data):
    request = UpdateParentAccountRequest(account_id=account_id, updated_data=updated_data)
    try:
        response = client.UpdateParentAccount(request)
        print('Parent account updated:', response)
    except grpc.RpcError as e:
        print('Error updating parent account:', e.details())
