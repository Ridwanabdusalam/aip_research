import requests
from google.protobuf.json_format import MessageToDict
from google.protobuf import field_mask_pb2

# endpoint URL
BASE_URL = "https://api.aip_research.com/v1"

# Request headers
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ACCESS_TOKEN",
}

class Account:
    def __init__(self, name="", display_name="", birthdate="", email="", password="", username="", isParent=False, bio="", children=None):
        self.name = name
        self.display_name = display_name
        self.birthdate = birthdate
        self.email = email
        self.password = password
        self.username = username
        self.isParent = isParent
        self.bio = bio
        self.children = children or []

class CreateAccountRequest:
    def __init__(self, account=None):
        self.account = account

class VerifyAccountRequest:
    def __init__(self, secret=""):
        self.secret = secret

class UpdateAccountRequest:
    def __init__(self, account=None, update_mask=None):
        self.account = account
        self.update_mask = update_mask

class ListAccountsRequest:
    def __init__(self, page_size=10, page_token="", filter=""):
        self.page_size = page_size
        self.page_token = page_token
        self.filter = filter

class CreateTweetRequest:
    def __init__(self, tweet=None):
        self.tweet = tweet

class DeleteTweetRequest:
    def __init__(self, name=""):
        self.name = name

class ListTweetsRequest:
    def __init__(self, page_size=10, page_token="", filter="", show_deleted=False, order_by=""):
        self.page_size = page_size
        self.page_token = page_token
        self.filter = filter
        self.show_deleted = show_deleted
        self.order_by = order_by

class ExportTweetsRequest:
    def __init__(self, parent="", csv_destination="", filter=""):
        self.parent = parent
        self.csv_destination = csv_destination
        self.filter = filter

class CreateLikeRequest:
    def __init__(self, parent="", like=None):
        self.parent = parent
        self.like = like

class CreateFolloweeRequest:
    def __init__(self, parent="", followee=None):
        self.parent = parent
        self.followee = followee

# API requests functions
def create_account(account):
    url = f"{BASE_URL}/accounts"
    payload = CreateAccountRequest(account=account)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

def verify_account(secret):
    url = f"{BASE_URL}/accounts:verify"
    payload = VerifyAccountRequest(secret=secret)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

def update_account(account, update_mask):
    url = f"{BASE_URL}/{account.name}"
    payload = UpdateAccountRequest(account=account, update_mask=update_mask)
    response = requests.patch(url, json=MessageToDict(payload), headers=headers)
    return response

def list_accounts(page_size=10, page_token="", filter=""):
    url = f"{BASE_URL}/accounts"
    payload = ListAccountsRequest(page_size=page_size, page_token=page_token, filter=filter)
    response = requests.get(url, params=MessageToDict(payload), headers=headers)
    return response

def create_tweet(tweet):
    url = f"{BASE_URL}/tweets"
    payload = CreateTweetRequest(tweet=tweet)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

def delete_tweet(name):
    url = f"{BASE_URL}/{name}"
    payload = DeleteTweetRequest(name=name)
    response = requests.delete(url, json=MessageToDict(payload), headers=headers)
    return response

def list_tweets(page_size=10, page_token="", filter="", show_deleted=False, order_by=""):
    url = f"{BASE_URL}/tweets"
    payload = ListTweetsRequest(page_size=page_size, page_token=page_token, filter=filter, show_deleted=show_deleted, order_by=order_by)
    response = requests.get(url, params=MessageToDict(payload), headers=headers)
    return response

def export_tweets(parent, csv_destination, filter=""):
    url = f"{BASE_URL}/tweets:export"
    payload = ExportTweetsRequest(parent=parent, csv_destination=csv_destination, filter=filter)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

def create_like(parent, like):
    url = f"{BASE_URL}/{parent}/likes"
    payload = CreateLikeRequest(parent=parent, like=like)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

def create_followee(parent, followee):
    url = f"{BASE_URL}/{parent}/followees"
    payload = CreateFolloweeRequest(parent=parent, followee=followee)
    response = requests.post(url, json=MessageToDict(payload), headers=headers)
    return response

# Usage example
if __name__ == "__main__":
    new_account = Account(
        display_name="Ridwan Abdusalam",
        email="rtabdusalam@ucdavis.edu",
        password="password123",
        isParent=True
    )

    account_response = create_account(new_account)
    if account_response.status_code == 200:
        print("Account created successfully!")
    else:
        print("Error creating account:", account_response.text)

    verification_response = verify_account("your_secret_key_here")
    if verification_response.status_code == 200:
        print("Account verified successfully!")
    else:
        print("Error verifying account:", verification_response.text)

    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    updated_account = Account(
        name="accounts/123456",  # Replace with actual account name
        display_name="New Display Name"
    )

    update_response = update_account(updated_account, update_mask)
    if update_response.status_code == 200:
        print("Account updated successfully!")
    else:
        print("Error updating account:", update_response.text)

    list_accounts_response = list_accounts(page_size=10)
    if list_accounts_response.status_code == 200:
        accounts = list_accounts_response.json().get("accounts", [])
        print("List of accounts:", accounts)
    else:
        print("Error listing accounts:", list_accounts_response.text)

    new_tweet = Tweet(
        text="First tweet!",
        author="accounts/123456"  # Replace with actual account name
    )

    tweet_response = create_tweet(new_tweet)
    if tweet_response.status_code == 200:
        print("Tweet created successfully!")
    else:
        print("Error creating tweet:", tweet_response.text)

    delete_tweet_response = delete_tweet("tweets/789012")  # Replace with actual tweet name
    if delete_tweet_response.status_code == 204:
        print("Tweet deleted successfully!")
    else:
        print("Error deleting tweet:", delete_tweet_response.text)

    list_tweets_response = list_tweets(page_size=10)
    if list_tweets_response.status_code == 200:
        tweets = list_tweets_response.json().get("tweets", [])
        print("List of tweets:", tweets)
    else:
        print("Error listing tweets:", list_tweets_response.text)

    export_tweets_response = export_tweets("accounts/123456", "exported_tweets.csv")
    if export_tweets_response.status_code == 200:
        print("Tweets exported successfully!")
    else:
        print("Error exporting tweets:", export_tweets_response.text)

    new_like = Like(
        account="accounts/123456",  # Replace with actual account name
        tweet="tweets/789012"  # Replace with actual tweet name
    )

    like_response = create_like("tweets/789012", new_like)
    if like_response.status_code == 200:
        print("Like created successfully!")
    else:
        print("Error creating like:", like_response.text)

    new_followee = Followee(
        followee="accounts/789012"  # Replace with actual account name
    )

    followee_response = create_followee("accounts/123456", new_followee)
    if followee_response.status_code == 200:
        print("Followee created successfully!")
    else:
        print("Error creating followee:", followee_response.text)
