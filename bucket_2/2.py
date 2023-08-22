# api_usability_study.proto

from enum import Enum
from typing import List
import google.protobuf.timestamp_pb2 as timestamp_pb2

class SortBy(Enum):
    MOST_RECENT = 0
    MOST_RELEVANT = 1

class LinkedTweetType(Enum):
    RETWEET = 0
    REPLY = 2

class MAcceptInvitationRequest:
    invitation_token: str

class MChildAccount:
    name: str
    username: str
    birth_date: str
    email: str
    password: str
    given_name: str
    family_name: str
    profile_bio: str
    email_verified: bool

class MCreateChildAccountRequest:
    child_account: MChildAccount
    parent_account: str

class MCreateFollowerRequest:
    # TODO: Add fields

class MCreateParentAccountRequest:
    parent_account: MParentAccount

class MCreateTweetRequest:
    parent: str
    tweet: MTweet

class MExportTweetsRequest:
    parent: str
    email_destination: str
    filter: str

class MFollower:
    name: str
    child_account_name: str

class MGetFeedRequest:
    child_account: str
    sort_by: SortBy
    page_size: int
    page_token: str

class MGetFeedResponse:
    tweet: List[MTweet]
    next_page_token: str

class MGetParentAccountRequest:
    name: str

class MGetTweetRequest:
    name: str

class MInvitationTokenRequest:
    child_account: str

class MInvitationTokenResponse:
    invitation_token: str

class MListChildAccountsRequest:
    page_size: int
    page_token: str
    filter: str

class MListChildAccountsResponse:
    child_account: List[MChildAccount]
    next_page_token: str

class MListTweetsRequest:
    parent: str
    page_size: int
    page_token: str
    show_deleted: bool

class MListTweetsResponse:
    tweets: List[MTweet]
    next_page_token: str

class MParentAccount:
    name: str
    username: str
    birth_date: str
    email: str
    password: str
    given_name: str
    family_name: str
    email_verified: bool
    child_account: List[str]

class MParentAccountVerificationChallengeRequest:
    name: str

class MParentAccountVerificationRequest:
    name: str
    challenge: str

class MTweet:
    name: str
    text: str
    linked_tweet: str
    linked_tweet_link_type: LinkedTweetType

class MTweetLike:
    name: str
    child_account_name: str

class MUpdateChildAccountRequest:
    child_account: MChildAccount
    update_mask: google.protobuf.FieldMask

class MUpdateParentAccountRequest:
    parent_account: MParentAccount
    update_mask: google.protobuf.FieldMask

class STwitterForKids:
    def GetParentAccount(request: MGetParentAccountRequest) -> MParentAccount:
        # TODO: Implement logic

    def CreateParentAccount(request: MCreateParentAccountRequest) -> MParentAccount:
        # TODO: Implement logic

    def SendParentAccountVerificationChallenge(request: MParentAccountVerificationChallengeRequest) -> google.protobuf.Empty:
        # TODO: Implement logic

    def UpdateParentAccount(request: MUpdateParentAccountRequest) -> MParentAccount:
        # TODO: Implement logic

    def VerifyParentAccount(request: MParentAccountVerificationRequest) -> MParentAccount:
        # TODO: Implement logic

    def CreateChildAccount(request: MCreateChildAccountRequest) -> MChildAccount:
        # TODO: Implement logic

    def UpdateChildAccount(request: MUpdateChildAccountRequest) -> MChildAccount:
        # TODO: Implement logic

    def CreateInvitationToken(request: MInvitationTokenRequest) -> MInvitationTokenResponse:
        # TODO: Implement logic

    def AcceptInvitation(request: MAcceptInvitationRequest) -> google.protobuf.Empty:
        # TODO: Implement logic

    def GetTweet(request: MGetTweetRequest) -> MTweet:
        # TODO: Implement logic

    def CreateTweet(request: MCreateTweetRequest) -> MTweet:
        # TODO: Implement logic

    def ListTweets(request: MListTweetsRequest) -> MListTweetsResponse:
        # TODO: Implement logic

    def GetFeed(request: MGetFeedRequest) -> MGetFeedResponse:
        # TODO: Implement logic

    def ListChildAccounts(request: MListChildAccountsRequest) -> MListChildAccountsResponse:
        # TODO: Implement logic

    def CreateFollower(request: MCreateFollowerRequest) -> MFollower:
        # TODO: Implement logic

    def ExportTweets(request: MExportTweetsRequest) -> google.longrunning.Operation:
        # TODO: Implement logic

def get_parent_account():
    url = f'{BASE_URL}/GetParentAccount'
    response = requests.get(url, headers=HEADERS)
    return response.json()

def create_parent_account(request_data):
    url = f'{BASE_URL}/CreateParentAccount'
    response = requests.post(url, json=request_data, headers=HEADERS)
    return response.json()
