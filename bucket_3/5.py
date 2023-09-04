import grpc
from concurrent import futures
from google.protobuf import empty_pb2
from generated import twitter_pb2, twitter_pb2_grpc

class AccountService(twitter_pb2_grpc.AccountServicer):
    def CreateParent(self, request, context):
        # Implement logic to create a parent account
        parent = twitter_pb2.Parent()
        return parent

    def UpdateParent(self, request, context):
        # Implement logic to update a parent account
        parent = twitter_pb2.Parent()
        return parent

    def CreateChild(self, request, context):
        # Implement logic to create a child account
        child = twitter_pb2.Child()
        return child

    def UpdateChild(self, request, context):
        # Implement logic to update a child account
        child = twitter_pb2.Child()
        return child

    def GetChildByUsername(self, request, context):
        # Implement logic to get a child by username
        child = twitter_pb2.Child()
        return child

    def VerifyEmail(self, request, context):
        # Implement logic to verify email
        return empty_pb2.Empty()

class ChildrenFollowingService(twitter_pb2_grpc.ChildrenFollowingServicer):
    def FollowChild(self, request, context):
        # Implement logic to follow a child
        return empty_pb2.Empty()

    def ListFollowers(self, request, context):
        # Implement logic to list followers of a child
        followers = []
        for follower in followers:
            yield follower

    def ListFollowing(self, request, context):
        # Implement logic to list following of a child
        following = []
        for followed in following:
            yield followed

class TweetsService(twitter_pb2_grpc.TweetsServicer):
    def CreateTweet(self, request, context):
        # Implement logic to create a tweet
        tweet = twitter_pb2.Tweet()
        return tweet

    def GetTweet(self, request, context):
        # Implement logic to get a tweet
        tweet = twitter_pb2.Tweet()
        return tweet

    def DeleteTweet(self, request, context):
        # Implement logic to delete a tweet
        return empty_pb2.Empty()

    def LikeTweet(self, request, context):
        # Implement logic to like a tweet
        return empty_pb2.Empty()

    def ListTweets(self, request, context):
        # Implement logic to list tweets
        tweets = []
        for tweet in tweets:
            yield tweet

    def ListFeedTweets(self, request, context):
        # Implement logic to list feed tweets
        feed_tweets = []
        for tweet in feed_tweets:
            yield tweet

    def CreateTweetComment(self, request, context):
        # Implement logic to create a tweet comment
        tweet_comment = twitter_pb2.TweetComment()
        return tweet_comment

    def GetTweetComment(self, request, context):
        # Implement logic to get a tweet comment
        tweet_comment = twitter_pb2.TweetComment()
        return tweet_comment

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    twitter_pb2_grpc.add_AccountServicer_to_server(AccountService(), server)
    twitter_pb2_grpc.add_ChildrenFollowingServicer_to_server(ChildrenFollowingService(), server)
    twitter_pb2_grpc.add_TweetsServicer_to_server(TweetsService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()




# client side:


# Get a child by username
def get_child_by_username(username):
    request = GetChildByUsernameRequest(username=username)
    try:
        response = client.GetChildByUsername(request)
        print('Child details:', response)
    except grpc.RpcError as e:
        print('Error getting child by username:', e.details())
