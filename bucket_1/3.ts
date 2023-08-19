import axios from 'axios';

class Child {
  constructor(
    public name: string = "",
    public child_name: string = "",
    public email: string = "",
    public birthdate: string = "",
    public following: string[] = []
  ) {}
}

class AddAdditionalParentRequest {
  constructor(public parent_email: string = "", public child: string = "") {}
}

class ChildInfo {
  constructor(public name: string = "", public username: string = "", public password: string = "", public bio: string = "") {}
}

class CreateChildRequest {
  constructor(public parent: string = "", public child: Child | null = null) {}
}

class CreateParentRequest {
  constructor(public parent: Parent | null = null) {}
}

class CreateTweetRequest {
  constructor(public tweet: Tweet | null = null) {}
}

class DeleteParentRequest {
  constructor(public username: string = "") {}
}

class DeleteTweetRequest {
  constructor(public name: string = "") {}
}

class ExportTweetsRequest {
  constructor(public parent: string = "", public printer_destination: any = null) {}
}

class FollowChildResponse {
  constructor(public requestor: string = "", public child: string = "") {}
}

class GetChildInfoRequest {
  constructor(public name: string = "") {}
}

class GetChildRequest {
  constructor(public child: string = "") {}
}

class GetParentRequest {
  constructor(public username: string = "") {}
}

class GetTweetRequest {
  constructor(public name: string = "") {}
}

class LikeTweetRequest {
  constructor(public child: string = "", public tweet: string = "") {}
}

class ListClosebyTweetsRequest {
  constructor(
    public child: string = "",
    public tweets: string[] = [],
    public page_size: number = 0,
    public page_token: string = "",
    public sort: number = 0
  ) {}
}

class ListDeletedTweetsRequest {
  constructor(public child: string = "", public tweets: string[] = [], public page_size: number = 0, public page_token: string = "") {}
}

class ListFeedRequest {
  constructor(public child: string = "", public page_size: number = 0, public page_token: string = "", public sort: number = 0) {}
}

class ListFeedResponse {
  constructor(public tweets: string[] = [], public next_page_token: string = "") {}
}

class ListTweetRequest {
  constructor(public parent: string = "") {}
}

class Parent {
  constructor(
    public name: string = "",
    public parent_name: string = "",
    public birthdate: string = "",
    public email: string = "",
    public password: string = "",
    public children: Child[] = []
  ) {}
}

class Reply {
  constructor(public author: string = "", public body: string = "") {}
}

class ReplyRequest {
  constructor(public reply: Reply | null = null) {}
}

class SearchChildrenRequest {
  constructor(public name: string = "") {}
}

class SearchChildrenResponse {
  constructor(public child: string[] = []) {}
}

class Tweet {
  constructor(public name: string = "", public body: string = "", public status: number = 0, public retweet: string = "") {}
}

class UpdateChildInfoRequest {
  constructor(public child_info: ChildInfo | null = null, public update_mask: any = null) {}
}

class UpdateParentRequest {
  constructor(public parent: Parent | null = null, public update_mask: any = null) {}
}

class TwitterAPI {
  constructor(private base_url: string, private headers: any) {}

  async sendRequest(method: string, path: string, payload: any = null) {
    const url = this.base_url + path;
    let response: any = null;

    try {
      if (method === "POST") {
        response = await axios.post(url, payload, { headers: this.headers });
      } else if (method === "GET") {
        response = await axios.get(url, { headers: this.headers });
      } else if (method === "PATCH") {
        response = await axios.patch(url, payload, { headers: this.headers });
      } else if (method === "DELETE") {
        response = await axios.delete(url, { headers: this.headers });
      }

      if (response && response.status === 200) {
        return response.data;
      } else {
        console.error("Error:", response?.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

// Define your base URL and headers
const BASE_URL = "https://api.aip_research.com/v1";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer ACCESS_TOKEN",
};

// Initialize TwitterAPI with base URL and headers
const twitter_api = new TwitterAPI(BASE_URL, HEADERS);

// Example usage of sending requests
const create_parent_request = new CreateParentRequest(new Parent("parent-username", "parent@example.com", "parentpassword"));
const created_parent = await twitter_api.sendRequest("POST", "/create_parent", create_parent_request);
console.log("Created Parent:", created_parent);

const get_child_info_request = new GetChildInfoRequest("children/child-username");
const child_info = await twitter_api.sendRequest("GET", "/get_child_info", get_child_info_request);
console.log("Child Info:", child_info);
