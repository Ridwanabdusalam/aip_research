import requests
from google.protobuf import json_format
from google.protobuf.timestamp_pb2 import Timestamp
from example_pb2 import (
    ChildProfile,
    CreateChildProfileRequest,
    DeleteChildProfileRequest,
    GetChildProfileRequest,
    ListChildProfilesRequest,
    ListChildProfilesResponse,
    UpdateChildProfileRequest,
    Child,
    CreateChildRequest,
    DeleteChildRequest,
    GetChildRequest,
    ListChildrenRequest,
    ListChildrenResponse,
    UndeleteChildRequest,
    UpdateChildRequest,
    Tweet,
    CreateTweetRequest,
    DeleteTweetRequest,
    GetTweetRequest,
    ListTweetsRequest,
    ListTweetsResponse,
    UndeleteTweetRequest,
    UpdateTweetRequest,
    ParentProfile,
    CreateParentProfileRequest,
    DeleteParentProfileRequest,
    GetParentProfileRequest,
    ListParentProfilesRequest,
    ListParentProfilesResponse,
    UpdateParentProfileRequest,
    Parent,
    CreateParentRequest,
    DeleteParentRequest,
    GetParentRequest,
    ListParentsRequest,
    ListParentsResponse,
    UndeleteParentRequest,
    UpdateParentRequest,
    )

# Define base URL and headers
BASE_URL = "https://api.aip_research.com/v1"
HEADERS = {"Authorization": "Bearer ACCESS_TOKEN", "Content-Type": "application/json"}

# Helper function to send HTTP requests
def send_request(url, method, data=None):
    response = requests.request(method, url, headers=HEADERS, json=data)
    response.raise_for_status()
    return response

# Define API functions

# ChildProfile API
def create_child_profile(parent, child_profile):
    url = f"{BASE_URL}/{parent}/childprofiles"
    request = CreateChildProfileRequest(parent=parent, child_profile=child_profile)
    send_request(url, "POST", json_format.MessageToDict(request))

def delete_child_profile(name):
    url = f"{BASE_URL}/{name}"
    send_request(url, "DELETE")

def get_child_profile(name):
    url = f"{BASE_URL}/{name}"
    response = send_request(url, "GET")
    return json_format.Parse(response.content, ChildProfile())

def list_child_profiles(parent, page_size=None, page_token=None, order_by=None):
    url = f"{BASE_URL}/{parent}/childprofiles"
    params = {"page_size": page_size, "page_token": page_token, "order_by": order_by}
    response = send_request(url, "GET", params)
    return json_format.Parse(response.content, ListChildProfilesResponse())

def update_child_profile(child_profile, update_mask):
    url = f"{BASE_URL}/{child_profile.name}"
    request = UpdateChildProfileRequest(child_profile=child_profile, update_mask=update_mask)
    send_request(url, "PATCH", json_format.MessageToDict(request))

# Child API
def create_child(parent, child):
    url = f"{BASE_URL}/{parent}/children"
    request = CreateChildRequest(parent=parent, child=child)
    send_request(url, "POST", json_format.MessageToDict(request))


# Example usage:
if __name__ == "__main__":
    parent = "parents/123"
    child_profile = ChildProfile(name="children/456")
    
    # Create a child profile
    create_child_profile(parent, child_profile)
    
    # Get a child profile
    profile = get_child_profile("children/456/childprofiles/789")
    print(profile)
    
    # List child profiles
    response = list_child_profiles(parent, page_size=10)
    print(response)

    # Update child profile
    child_profile.bio = "New bio"
    update_mask = {"paths": ["bio"]}
    update_child_profile(child_profile, update_mask)
