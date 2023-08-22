import grpc
import google.protobuf.empty_pb2 as empty_pb2
import google.protobuf.field_mask_pb2 as field_mask_pb2
from concurrent import futures
import time

import twitter_for_kid_pb2 as tfk_pb2
import twitter_for_kid_pb2_grpc as tfk_pb2_grpc

class TwitterForKidsServicer(tfk_pb2_grpc.TwitterForKidsServiceServicer):
    def SearchChildren(self, request, context):
        # Implement the logic to search children
        response = tfk_pb2.SearchChildrenResponse()
        # Fill in the response
        return response

    def ListTweets(self, request, context):
        # Implement the logic to list tweets
        response = tfk_pb2.ListTweetsResponse()
        # Fill in the response
        return response

    def UpdateFollowing(self, request, context):
        # Implement the logic to update following
        response = tfk_pb2.UpdateFollowingResponse()
        response.success = True
        return response

    def CreateTweet(self, request, context):
        # Implement the logic to create a tweet
        response = tfk_pb2.Tweet()
        # Fill in the response
        return response

    def TweetAction(self, request, context):
        # Implement the logic for tweet actions
        response = tfk_pb2.TweetActionResponse()
        response.success = True
        return response

    def CreateParent(self, request, context):
        # Implement the logic to create a parent
        response = tfk_pb2.Parent()
        # Fill in the response
        return response

    def VerifyParent(self, request, context):
        # Implement the logic to verify a parent
        response = tfk_pb2.Parent()
        # Fill in the response
        return response

    def CompleteChild(self, request, context):
        # Implement the logic to complete a child
        response = tfk_pb2.Child()
        # Fill in the response
        return response

    def VerifyChild(self, request, context):
        # Implement the logic to verify a child
        response = tfk_pb2.Child()
        # Fill in the response
        return response

    def AddChild(self, request, context):
        # Implement the logic to add a child
        response = tfk_pb2.Parent()
        # Fill in the response
        return response

    def InviteParent(self, request, context):
        # Implement the logic to invite a parent
        response = tfk_pb2.InviteParentResponse()
        response.success = True
        return response

    def UpdateChildPassword(self, request, context):
        # Implement the logic to update child password
        response = tfk_pb2.UpdateChildPasswordResponse()
        response.success = True
        return response

    def UpdateChild(self, request, context):
        # Implement the logic to update a child
        response = tfk_pb2.Child()
        # Fill in the response
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    tfk_pb2_grpc.add_TwitterForKidsServiceServicer_to_server(
        TwitterForKidsServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
