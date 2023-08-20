from typing import List
import datetime
import grpc
import twitter_pb2
import twitter_pb2_grpc

class ParentUserService(twitter_pb2_grpc.ParentUserServiceServicer):

    def CreateParentUser(self, request, context):
        # TODO: Implement the logic to create a new parent user
        response = twitter_pb2.ParentUser()
        return response

    def ValidateParentUserEmail(self, request, context):
        # TODO: Implement the logic to validate parent user's email
        response = twitter_pb2.Empty()
        return response

    def InviteSecondParentUser(self, request, context):
        # TODO: Implement the logic to invite a second parent
        response = twitter_pb2.Empty()
        return response

    def UpdateParentUser(self, request, context):
        # TODO: Implement the logic to update parent user's data
        response = twitter_pb2.ParentUser()
        return response

class ChildUserService(twitter_pb2_grpc.ChildUserServiceServicer):

    def CreateChildUser(self, request, context):
        # TODO: Implement the logic to create a new child user
        response = twitter_pb2.ChildUser()
        return response

    def UpdateChildUser(self, request, context):
        # TODO: Implement the logic to update child user's data
        response = twitter_pb2.ChildUser()
        return response

    def SearchChildUsers(self, request, context):
        # TODO: Implement the logic to search for child users
        response = twitter_pb2.SearchChildUsersResponse()
        return response

class FollowService(twitter_pb2_grpc.FollowServiceServicer):

    def CreateFollow(self, request, context):
        # TODO: Implement the logic to create a follow
        response = twitter_pb2.Follow()
        return response

    def DeleteFollow(self, request, context):
        # TODO: Implement the logic to delete a follow
        response = twitter_pb2.Empty()
        return response

    def ListFollows(self, request, context):
        # TODO: Implement the logic to list followed accounts
        response = twitter_pb2.ListFollowsResponse()
        return response

class TweetService(twitter_pb2_grpc.TweetServiceServicer):

    def CreateTweet(self, request, context):
        # TODO: Implement the logic to create a new tweet
        response = twitter_pb2.Tweet()
        return response

    def FeedTweets(self, request, context):
        # TODO: Implement the logic to retrieve tweets from feeds
        response = twitter_pb2.FeedTweetsResponse()
        return response

    def ExportTweets(self, request, context):
        # TODO: Implement the logic to export tweets to CSV
        response = twitter_pb2.ExportTweetsResponse()
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    twitter_pb2_grpc.add_ParentUserServiceServicer_to_server(ParentUserService(), server)
    twitter_pb2_grpc.add_ChildUserServiceServicer_to_server(ChildUserService(), server)
    twitter_pb2_grpc.add_FollowServiceServicer_to_server(FollowService(), server)
    twitter_pb2_grpc.add_TweetServiceServicer_to_server(TweetService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
