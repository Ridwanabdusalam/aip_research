import grpc
from concurrent import futures
import api_pb2
import api_pb2_grpc

class ChildService(api_pb2_grpc.ChildServiceServicer):
    def CreateChild(self, request, context):
        # Implement the logic to create a child
        response = api_pb2.CreateChildResponse()
        return response

    def VerifyChild(self, request, context):
        # Implement the logic to verify a child
        response = api_pb2.VerifyChildResponse()
        return response

    def SignUpChild(self, request, context):
        # Implement the logic to sign up a child
        response = api_pb2.SignUpChildResponse()
        return response

    def UpdateChild(self, request, context):
        # Implement the logic to update a child
        response = api_pb2.UpdateChildResponse()
        return response

    def ListChildren(self, request, context):
        # Implement the logic to list children
        response = api_pb2.ListChildrenResponse()
        return response

    def FollowChild(self, request, context):
        # Implement the logic to follow a child
        response = api_pb2.FollowChildResponse()
        return response

class FeedService(api_pb2_grpc.FeedServiceServicer):
    def ListTweets(self, request, context):
        # Implement the logic to list tweets
        response = api_pb2.ListTweetResponse()
        return response

class ParentService(api_pb2_grpc.ParentServiceServicer):
    def CreateParent(self, request, context):
        # Implement the logic to create a parent
        response = api_pb2.CreateParentResponse()
        return response

    def VerifyParent(self, request, context):
        # Implement the logic to verify a parent
        response = api_pb2.VerifyParentResponse()
        return response

    def UpdateParent(self, request, context):
        # Implement the logic to update a parent
        response = api_pb2.UpdateParentResponse()
        return response

    def InviteParent(self, request, context):
        # Implement the logic to invite a parent
        response = api_pb2.InviteParentResponse()
        return response

    def AcceptInvitation(self, request, context):
        # Implement the logic to accept an invitation
        response = api_pb2.AcceptInvitationResponse()
        return response

class TweetService(api_pb2_grpc.TweetServiceServicer):
    def CreateTweet(self, request, context):
        # Implement the logic to create a tweet
        response = api_pb2.CreateTweetResponse()
        return response

    def DeleteTweet(self, request, context):
        # Implement the logic to delete a tweet
        response = api_pb2.DeleteTweetResponse()
        return response

    def LikeTweet(self, request, context):
        # Implement the logic to like a tweet
        response = api_pb2.LikeTweetResponse()
        return response

    def ReplyTweet(self, request, context):
        # Implement the logic to reply to a tweet
        response = api_pb2.ReplyTweetResponse()
        return response

    def RetweetTweet(self, request, context):
        # Implement the logic to retweet a tweet
        response = api_pb2.RetweetTweetResponse()
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    api_pb2_grpc.add_ChildServiceServicer_to_server(ChildService(), server)
    api_pb2_grpc.add_FeedServiceServicer_to_server(FeedService(), server)
    api_pb2_grpc.add_ParentServiceServicer_to_server(ParentService(), server)
    api_pb2_grpc.add_TweetServiceServicer_to_server(TweetService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051...")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()






#Client's implementation

    def CreateTweet(self, request: CreateTweetRequest, context):
        new_tweet = api_pb2.Tweet(
            text=request.text,
            likes=0,
            original_tweet="",
            name="tweet123",  # tweet id
        )
        response = CreateTweetResponse(tweet=new_tweet)
        return response

    def DeleteTweet(self, request: DeleteTweetRequest, context):
        tweet_id = request.tweet_id
        response = DeleteTweetResponse()
        return response

    def LikeTweet(self, request: LikeTweetRequest, context):
        tweet_id = request.tweet_id
        response = LikeTweetResponse()
        return response

    def ReplyTweet(self, request: ReplyTweetRequest, context):
        parent_tweet_id = request.parent_tweet_id
        reply_text = request.reply_text
        new_reply = api_pb2.Tweet(
            text=reply_text,
            likes=0,
            original_tweet=parent_tweet_id,
            name="reply123", #reply id
        )
        response = ReplyTweetResponse(reply=new_reply)
        return response

    def RetweetTweet(self, request, context):
        tweet_id = request.tweet_id
        response = api_pb2.RetweetTweetResponse()
        return response
