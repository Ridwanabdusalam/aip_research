from typing import List
import grpc
from google.protobuf.empty_pb2 import Empty
from all_pb2 import (
    Child, Parent, PendingChild, PendingParent, Tweet, ChildProfile,
    CreateChildRequest, CreateParentRequest, CreatePendingChildRequest,
    CreateTweetRequest, DeleteTweetRequest, ExportTweetsRequest,
    FollowChildRequest, FollowChildResponse, Follower, GetChildRequest,
    GetPendingChildRequest, GetPendingParentRequest,
    InviteChildPendingParentRequest, InvitePendingParentRequest,
    InvitePendingParentResponse, LikeTweetRequest, LikeTweetResponse,
    ListChildrenRequest, ListChildrenResponse, ListFollowageTweetsRequest,
    ListTweetsRequest, ListTweetsResponse, LongRunningOperation,
    ReadTweetFeedRequest, ReadTweetFeedResponse, UpdateChildRequest,
    UpdateParentRequest, VerifyParentEmailRequest,
)
from all_grpc import ChildServiceServicer, ParentServiceServicer
from concurrent import futures

class ChildService(ChildServiceServicer):
    def CreateChild(self, request: CreateChildRequest, context):
        # Implement logic to create a child account
        pass
    
    def UpdateChild(self, request: UpdateChildRequest, context):
        # Implement logic to update a child account
        pass
    
    def ListChildren(self, request: ListChildrenRequest, context):
        # Implement logic to list children accounts
        pass
    
    def FollowChild(self, request: FollowChildRequest, context):
        # Implement logic to follow another child account
        pass
    
    def GetPendingChild(self, request: GetPendingChildRequest, context):
        # Implement logic to get a pending child account
        pass
    
    def ReadTweetFeed(self, request: ReadTweetFeedRequest, context):
        # Implement logic to read a child's tweet feed
        pass
    
    def CreateTweet(self, request: CreateTweetRequest, context):
        # Implement logic to create a tweet
        pass
    
    def DeleteTweet(self, request: DeleteTweetRequest, context):
        # Implement logic to delete a tweet
        pass
    
    def LikeTweet(self, request: LikeTweetRequest, context):
        # Implement logic to like a tweet
        pass

class ParentService(ParentServiceServicer):
    def CreateParent(self, request: CreateParentRequest, context):
        # Implement logic to create a parent account
        pass
    
    def UpdateParent(self, request: UpdateParentRequest, context):
        # Implement logic to update a parent account
        pass
    
    def VerifyParentEmail(self, request: VerifyParentEmailRequest, context):
        # Implement logic to verify parent's email
        pass
    
    def GetPendingParent(self, request: GetPendingParentRequest, context):
        # Implement logic to get a pending parent account
        pass
    
    def CreatePendingChild(self, request: CreatePendingChildRequest, context):
        # Implement logic to create a pending child account
        pass
    
    def ListChildren(self, request: ListChildrenRequest, context):
        # Implement logic to list parent's children
        pass
    
    def GetChild(self, request: GetChildRequest, context):
        # Implement logic to get a specific child account
        pass
    
    def InvitePendingParent(self, request: InviteChildPendingParentRequest, context):
        # Implement logic to invite a pending parent
        pass
    
    def ListTweets(self, request: ListTweetsRequest, context):
        # Implement logic to list child's tweets
        pass
    
    def ListFollowageTweets(self, request: ListFollowageTweetsRequest, context):
        # Implement logic to list child's followers and followees tweets
        pass
    
    def ExportTweets(self, request: ExportTweetsRequest, context):
        # Implement logic to export child's tweets
        pass

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    child_service = ChildService()
    parent_service = ParentService()
    all_pb2_grpc.add_ChildServiceServicer_to_server(child_service, server)
    all_pb2_grpc.add_ParentServiceServicer_to_server(parent_service, server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
