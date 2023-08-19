import axios from 'axios';
import { MessageToDict } from 'google-protobuf/google/protobuf/util';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';

const BASE_URL = "https://api.aip_research.com/v1";
const ACCESS_TOKEN = "ACCESS_TOKEN"; // Replace with your actual access token
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_TOKEN}`,
};

class Account {
  constructor(
    public name: string = "",
    public display_name: string = "",
    public birthdate: string = "",
    public email: string = "",
    public password: string = "",
    public username: string = "",
    public isParent: boolean = false,
    public bio: string = "",
    public children: string[] = []
  ) {}
}

class CreateAccountRequest {
  constructor(public account: Account | null = null) {}
}

class VerifyAccountRequest {
  constructor(public secret: string = "") {}
}

class UpdateAccountRequest {
  constructor(public account: Account | null = null, public update_mask: FieldMask | null = null) {}
}

class ListAccountsRequest {
  constructor(public page_size: number = 10, public page_token: string = "", public filter: string = "") {}
}

class CreateTweetRequest {
  constructor(public tweet: any | null = null) {} // Define your Tweet type here
}

class DeleteTweetRequest {
  constructor(public name: string = "") {}
}

class ListTweetsRequest {
  constructor(
    public page_size: number = 10,
    public page_token: string = "",
    public filter: string = "",
    public show_deleted: boolean = false,
    public order_by: string = ""
  ) {}
}

class ExportTweetsRequest {
  constructor(public parent: string = "", public csv_destination: string = "", public filter: string = "") {}
}

class CreateLikeRequest {
  constructor(public parent: string = "", public like: any | null = null) {} // Define your Like type here
}

class CreateFolloweeRequest {
  constructor(public parent: string = "", public followee: string = "") {}
}

// Initialize axios instance with headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

// API requests functions
async function createAccount(account: Account) {
  const url = `/accounts`;
  const payload = new CreateAccountRequest(account);

  try {
    const response = await axiosInstance.post(url, MessageToDict(payload));
    return response;
  } catch (error) {
    console.error("Error creating account:", error.message);
    return error.response;
  }
}

// Usage example
(async () => {
  const newAccount = new Account(
    "accounts/123456",
    "New Display Name",
    "birthdate",
    "email",
    "password",
    "username",
    true,
    "bio",
    []
  );

  const accountResponse = await createAccount(newAccount);
  if (accountResponse.status === 200) {
    console.log("Account created successfully!");
  } else {
    console.log("Error creating account:", accountResponse.data);
  }

})();
