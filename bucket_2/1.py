# child_twitter.proto

from google.protobuf import field_mask_pb2

# Account
class Account:
    ACCOUNT_TYPE_UNSPECIFIED = 0
    PARENT_ACCOUNT = 1
    CHILD_ACCOUNT = 2

    ACCOUNT_LIFECYCLE_UNSPECIFIED = 0
    PENDING_EMAIL_VERIFICATION = 1
    PENDING_SIGN_UP = 2
    ACTIVE = 3
    DELETE_REQUESTED = 4

class MAccount:
    name: str
    type: Account.AccountType
    account_lifecycle: Account.AccountLifecycle
    birthdate: str
    email: str
    password: str

class MAddParentRequest:
    account: str
    parent_account: str
    second_parent_email: str

class MAddParentResponse:
    account: MAccount

# Comment
class MComment:
    name: str
    text: str

class MCreateAccountRequest:
    account: MAccount
    account_id: str

class MCreateCommentRequest:
    parent: str
    comment: MComment

class MCreateTweetRequest:
    parent: str
    tweet: MTweet

class MDeleteTweetRequest:
    name: str

class MExportTweetsRequest:
    account: str
    filename: str

class MExportTweetsResponse:
    pass  # No fields here

class MFollowAccountRequest:
    name: str

class MFollowAccountResponse:
    followed_accounts: list[str]

class MLikeTweetRequest:
    name: str

class MLikeTweetResponse:
    pass  # No fields here

class MListTweetsRequest:
    parent: str
    page_size: int
    page_token: str
    order_by: str

class MListTweetsResponse:
    tweets: list[MTweet]
    next_page_token: str

class MReTweetRequest:
    name: str

class MReTweetResponse:
    tweet: MTweet

class MSearchAccountsRequest:
    name: str

class MSearchAccountsResponse:
    accounts: list[str]

class MTweet:
    name: str
    text: str
    likes: int
    original_tweet: str

class MUpdateAccountRequest:
    account: MAccount
    update_mask: field_mask_pb2.FieldMask

# TwitterForKidsService
class STwitterForKidsService:
    def CreateAccount(self, request: MCreateAccountRequest) -> MAccount:
        pass

    def UpdateAccount(self, request: MUpdateAccountRequest) -> MAccount:
        pass

    def AddParent(self, request: MAddParentRequest) -> MAddParentResponse:
        pass

    def SearchAccounts(self, request: MSearchAccountsRequest) -> MSearchAccountsResponse:
        pass

    def FollowAccount(self, request: MFollowAccountRequest) -> MFollowAccountResponse:
        pass

    def CreateTweet(self, request: MCreateTweetRequest) -> MTweet:
        pass

    def DeleteTweet(self, request: MDeleteTweetRequest) -> google.protobuf.Empty:
        pass

    def ListTweets(self, request: MListTweetsRequest) -> MListTweetsResponse:
        pass

    def LikeTweet(self, request: MLikeTweetRequest) -> MLikeTweetResponse:
        pass

    def ReTweet(self, request: MReTweetRequest) -> MReTweetResponse:
        pass

    def CreateComment(self, request: MCreateCommentRequest) -> MComment:
        pass

    def ExportTweets(self, request: MExportTweetsRequest) -> MExportTweetsResponse:
        pass






#CLIENT SIDE:
import grpc
from child_twitter_pb2 import MCreateTweetRequest, MDeleteTweetRequest, MLikeTweetRequest, MCreateCommentRequest
from child_twitter_pb2_grpc import STwitterForKidsServiceStub

# Create a gRPC channel to connect to the server
channel = grpc.insecure_channel('localhost:50051')  # Replace with your server's address

# Create a stub for the TwitterForKidsService
twitter_service = STwitterForKidsServiceStub(channel)

# Create a tweet
def create_tweet(parent, tweet_text):
    tweet = MCreateTweetRequest(parent=parent, tweet=MTweet(text=tweet_text))
    response = twitter_service.CreateTweet(tweet)
    print(f"Tweet created: {response.tweet.name}")

# Delete a tweet
def delete_tweet(tweet_name):
    tweet = MDeleteTweetRequest(name=tweet_name)
    twitter_service.DeleteTweet(tweet)
    print(f"Tweet deleted: {tweet_name}")

# Like a tweet
def like_tweet(tweet_name):
    like_request = MLikeTweetRequest(name=tweet_name)
    twitter_service.LikeTweet(like_request)
    print(f"Tweet liked: {tweet_name}")

# Reply to a tweet
def reply_to_tweet(parent_tweet_name, reply_text):
    reply = MCreateCommentRequest(parent=parent_tweet_name, comment=MComment(text=reply_text))
    response = twitter_service.CreateComment(reply)
    print(f"Reply created: {response.name}")

# usage
if __name__ == "__main__":
    create_tweet("parent_account", "Hello, Twitter for Kids!")
    delete_tweet("tweet123")
    like_tweet("tweet456")
    reply_to_tweet("tweet789", "That's great!")
