import axios from 'axios';

const BASE_URL = "https://api.aip_research.com/v1";
const ACCESS_TOKEN = "ACCESS_TOKEN"; 
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_TOKEN}`,
};

class ChildAccount {
  constructor(
    public name: string = "",
    public username: string = "",
    public child: string = "",
    public birthdate: string | null = null,
    public email: string = "",
    public password: string = "",
    public parents: string[] = [],
    public profile_bio: string = "",
    public followed_children: string[] = []
  ) {}
}

class CreateChildAccountRequest {
  constructor(public child_account: ChildAccount | null = null) {}
}

class CreateLikeRequest {
  constructor(public parent: string = "", public like: any | null = null) {} 
}

class CreateParentAccountRequest {
  constructor(public parent_account: any | null = null) {} 
}

class CreateTweetRequest {
  constructor(public parent: string = "", public tweet: any | null = null) {}
}

class DeleteTweetRequest {
  constructor(public name: string = "") {}
}

class ExportTweetsRequest {
  constructor(public child_account: string = "", public format: string = "") {}
}

class ExportTweetsResponse {
  constructor(public uri: string = "") {}
}

class GetChildAccountRequest {
  constructor(public name: string = "") {}
}

class GetParentAccountRequest {
  constructor(public name: string = "") {}
}

class Like {
  constructor(public name: string = "", public child: string = "") {}
}

class ListTweetsRequest {
  constructor(
    public parent: string = "",
    public page_size: number = 10,
    public page_token: string = "",
    public order_by: string = "",
    public filter: string = "",
    public show_deleted: boolean = false
  ) {}
}

class ListTweetsResponse {
  constructor(public tweets: any[] = [], public next_page_token: string = "") {} 
}

class ParentAccount {
  constructor(
    public name: string = "",
    public parent: string = "",
    public birthdate: string | null = null,
    public email: string = "",
    public password: string = ""
  ) {}
}

class Tweet {
  constructor(
    public name: string = "",
    public content: string = "",
    public original_tweet: string = "",
    public deleted: boolean = false
  ) {}
}

class UpdateChildAccountRequest {
  constructor(public child_account: ChildAccount | null = null, public update_mask: any | null = null) {}
}

class UpdateParentAccountRequest {
  constructor(public parent_account: any | null = null, public update_mask: any | null = null) {}
}

// Initialize axios instance with headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

// API requests functions
async function createParentAccount(parent_account: any) {
  const url = `/parentaccounts`;
  const payload = new CreateParentAccountRequest(parent_account);

  try {
    const response = await axiosInstance.post(url, payload);
    return response;
  } catch (error) {
    console.error("Error creating parent account:", error.message);
    return error.response;
  }
}


// Usage example
(async () => {
  const newParentAccount = new ParentAccount(
    "parent-username",
    "parent-name",
    "birthdate",
    "parent-email",
    "parent-password"
  );

  const parentAccountResponse = await createParentAccount(newParentAccount);
  if (parentAccountResponse.status === 200) {
    console.log("Parent account created successfully!");
  } else {
    console.log("Error creating parent account:", parentAccountResponse.data);
  }

  // Similar examples for other API functions
})();
