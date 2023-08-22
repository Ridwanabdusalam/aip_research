# Import necessary modules
import google.protobuf.timestamp_pb2 as timestamp_pb2

# Define the AccountVerificationStatus enum
class EAccountVerificationStatus:
    UNKNOWN = 0
    UNVERIFIED = 1
    EMAIL_VERIFIED = 2

# Define the EViewFeedRequest.Sort enum
class EViewFeedRequest_Sort:
    UNKNOWN = 0
    MOST_RECENT = 1
    MOST_RELEVENT = 2

# Define the ChildAccount message
class MChildAccount:
    name: str
    fullname: str
    birthdate: timestamp_pb2.Timestamp
    email: str
    password: str
    profile_bio: str
    verification_status: EAccountVerificationStatus
    following: list[str]

# Define the CreateChildAccountRequest message
class MCreateChildAccountRequest:
    child_account: MChildAccount

# Define the CreateParentAccountRequest message
class MCreateParentAccountRequest:
    parent_account: MParentAccount

# Define the CreateTweetRequest message
class MCreateTweetRequest:
    parent: str
    tweet: MTweet

# Define the DeleteTweetRequest message
class MDeleteTweetRequest:
    name: str

# Define the ExportTweetsRequest message
class MExportTweetsRequest:
    parent: str

# Define the ExportTweetsResponse message
class MExportTweetsResponse:
    csv: bytes

# Define the GetChildAccountRequest message
class MGetChildAccountRequest:
    name: str

# Define the GetParentAccountRequest message
class MGetParentAccountRequest:
    name: str

# Define the GetTweetRequest message
class MGetTweetRequest:
    name: str

# Define the ListTweetsRequest message
class MListTweetsRequest:
    parent: str
    page_size: int
    page_token: str
    show_deleted: bool

# Define the ListTweetsResponse message
class MListTweetsResponse:
    tweets: list[MTweet]
    next_page_token: str

# Define the ParentAccount message
class MParentAccount:
    name: str
    child_account: str
    fullname: str
    birthdate: timestamp_pb2.Timestamp
    email: str
    password: str
    username: str
    verification_status: EAccountVerificationStatus

# Define the SearchChildAccountsRequest message
class MSearchChildAccountsRequest:
    page_size: int
    page_token: str

# Define the SearchChildAccountsResponse message
class MSearchChildAccountsResponse:
    child_accounts: list[MChildAccount]
    next_page_token: str

# Define the Tweet message
class MTweet:
    name: str
    liked_by: list[str]
    comments: list[MTweet_Comment]
    soft_deleted: bool
    original: str
    is_trending: bool
    create_time: timestamp_pb2.Timestamp

# Define the Comment message within the Tweet message
class MTweet_Comment:
    text: str
    author: list[str]

# Define the UpdateChildAccountRequest message
class MUpdateChildAccountRequest:
    child_account: MChildAccount
    update_mask: dict

# Define the UpdateParentAccountRequest message
class MUpdateParentAccountRequest:
    parent_account: MParentAccount
    update_mask: dict

# Define the UpdateTweetRequest message
class MUpdateTweetRequest:
    tweet: MTweet
    update_mask: dict

# Define the ViewFeedRequest message
class MViewFeedRequest:
    parent: str
    page_size: int
    page_token: str
    sort_by: EViewFeedRequest_Sort

# Define the ViewFeedResponse message
class MViewFeedResponse:
    tweets: list[MTweet]
    next_page_token: str

# Define the TwitterKids service
class STwitterKids:
    def GetParentAccount(self, request: MGetParentAccountRequest) -> MParentAccount:
        pass

    def CreateParentAccount(self, request: MCreateParentAccountRequest) -> MParentAccount:
        pass

    def UpdateParentAccount(self, request: MUpdateParentAccountRequest) -> MParentAccount:
        pass

    def GetChildAccount(self, request: MGetChildAccountRequest) -> MChildAccount:
        pass

    def SearchChildAccounts(self, request: MSearchChildAccountsRequest) -> MSearchChildAccountsResponse:
        pass

    def CreateChildAccount(self, request: MCreateChildAccountRequest) -> MChildAccount:
        pass

    def UpdateChildAccount(self, request: MUpdateChildAccountRequest) -> MChildAccount:
        pass

    def GetTweet(self, request: MGetTweetRequest) -> MTweet:
        pass

    def CreateTweet(self, request: MCreateTweetRequest) -> MTweet:
        pass

    def ListTweets(self, request: MListTweetsRequest) -> MListTweetsResponse:
        pass

    def UpdateTweet(self, request: MUpdateTweetRequest) -> MTweet:
        pass

    def DeleteTweet(self, request: MDeleteTweetRequest) -> None:
        pass

    def ViewFeed(self, request: MViewFeedRequest) -> MViewFeedResponse:
        pass

    def ExportTweets(self, request: MExportTweetsRequest) -> MExportTweetsResponse:
        pass
