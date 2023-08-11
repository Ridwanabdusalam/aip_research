import requests

BASE_URL = "https://api.example.com/v1"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
}

class ChildAccount:
    def __init__(self, name="", username="", child="", birthdate=None, email="", password="", parents=None, profile_bio="", followed_children=None):
        self.name = name
        self.username = username
        self.child = child
        self.birthdate = birthdate
        self.email = email
        self.password = password
        self.parents = parents or []
        self.profile_bio = profile_bio
        self.followed_children = followed_children or []

class CreateChildAccountRequest:
    def __init__(self, child_account=None):
        self.child_account = child_account

class CreateLikeRequest:
    def __init__(self, parent="", like=None):
        self.parent = parent
        self.like = like

class CreateParentAccountRequest:
    def __init__(self, parent_account=None):
        self.parent_account = parent_account

class CreateTweetRequest:
    def __init__(self, parent="", tweet=None):
        self.parent = parent
        self.tweet = tweet

class DeleteTweetRequest:
    def __init__(self, name=""):
        self.name = name

class ExportTweetsRequest:
    def __init__(self, child_account="", format=""):
        self.child_account = child_account
        self.format = format

class ExportTweetsResponse:
    def __init__(self, uri=""):
        self.uri = uri

class GetChildAccountRequest:
    def __init__(self, name=""):
        self.name = name

class GetParentAccountRequest:
    def __init__(self, name=""):
        self.name = name

class Like:
    def __init__(self, name="", child=""):
        self.name = name
        self.child = child

class ListTweetsRequest:
    def __init__(self, parent="", page_size=10, page_token="", order_by="", filter="", show_deleted=False):
        self.parent = parent
        self.page_size = page_size
        self.page_token = page_token
        self.order_by = order_by
        self.filter = filter
        self.show_deleted = show_deleted

class ListTweetsResponse:
    def __init__(self, tweets=None, next_page_token=""):
        self.tweets = tweets or []
        self.next_page_token = next_page_token

class ParentAccount:
    def __init__(self, name="", parent="", birthdate=None, email="", password=""):
        self.name = name
        self.parent = parent
        self.birthdate = birthdate
        self.email = email
        self.password = password

class Tweet:
    def __init__(self, name="", content="", original_tweet="", deleted=False):
        self.name = name
        self.content = content
        self.original_tweet = original_tweet
        self.deleted = deleted

class UpdateChildAccountRequest:
    def __init__(self, child_account=None, update_mask=None):
        self.child_account = child_account
        self.update_mask = update_mask

class UpdateParentAccountRequest:
    def __init__(self, parent_account=None, update_mask=None):
        self.parent_account = parent_account
        self.update_mask = update_mask

def create_parent_account(parent_account):
    url = f"{BASE_URL}/parentaccounts"
    payload = CreateParentAccountRequest(parent_account=parent_account)
    response = requests.post(url, json=payload.__dict__, headers=HEADERS)
    return response

def get_parent_account(name):
    url = f"{BASE_URL}/{name}"
    response = requests.get(url, headers=HEADERS)
    return response

def update_parent_account(parent_account, update_mask):
    url = f"{BASE_URL}/{parent_account.name}"
    payload = UpdateParentAccountRequest(parent_account=parent_account, update_mask=update_mask)
    response = requests.patch(url, json=payload.__dict__, headers=HEADERS)
    return response

def create_child_account(parent, child_account):
    url = f"{BASE_URL}/{parent}/childaccounts"
    payload = CreateChildAccountRequest(child_account=child_account)
    response = requests.post(url, json=payload.__dict__, headers=HEADERS)
    return response

def get_child_account(name):
    url = f"{BASE_URL}/{name}"
    response = requests.get(url, headers=HEADERS)
    return response

def update_child_account(child_account, update_mask):
    url = f"{BASE_URL}/{child_account.name}"
    payload = UpdateChildAccountRequest(child_account=child_account, update_mask=update_mask)
    response = requests.patch(url, json=payload.__dict__, headers=HEADERS)
    return response

def create_tweet(parent, tweet):
    url = f"{BASE_URL}/{parent}/tweet"
    payload = CreateTweetRequest(parent=parent, tweet=tweet)
    response = requests.post(url, json=payload.__dict__, headers=HEADERS)
    return response

def delete_tweet(name):
    url = f"{BASE_URL}/{name}"
    payload = DeleteTweetRequest(name=name)
    response = requests.delete(url, json=payload.__dict__, headers=HEADERS)
    return response

def list_tweets(parent, page_size=10, page_token="", order_by="", filter="", show_deleted=False):
    url = f"{BASE_URL}/{parent}/tweets"
    payload = ListTweetsRequest(parent=parent, page_size=page_size, page_token=page_token, order_by=order_by,
                                filter=filter, show_deleted=show_deleted)
    response = requests.get(url, params=payload.__dict__, headers=HEADERS)
    return response

def create_like(parent, like):
    url = f"{BASE_URL}/{parent}/like"
    payload = CreateLikeRequest(parent=parent, like=like)
    response = requests.post(url, json=payload.__dict__, headers=HEADERS)
    return response

def export_tweets(name, format):
    url = f"{BASE_URL}/{name}:export"
    payload = ExportTweetsRequest(child_account=name, format=format)
    response = requests.post(url, json=payload.__dict__, headers=HEADERS)
    return response
