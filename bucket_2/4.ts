import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

enum AccountVerificationStatus {
  UNKNOWN = 0,
  UNVERIFIED = 1,
  EMAIL_VERIFIED = 2,
}

enum ViewFeedRequest_Sort {
  UNKNOWN = 0,
  MOST_RECENT = 1,
  MOST_RELEVENT = 2,
}

interface ChildAccount {
  name: string;
  fullname: string;
  birthdate: Timestamp;
  email: string;
  password: string;
  profile_bio: string;
  verification_status: AccountVerificationStatus;
  following: string[];
}

interface CreateChildAccountRequest {
  child_account: ChildAccount;
}

interface CreateParentAccountRequest {
  parent_account: ParentAccount;
}

interface CreateTweetRequest {
  parent: string;
  tweet: Tweet;
}

interface DeleteTweetRequest {
  name: string;
}

interface ExportTweetsRequest {
  parent: string;
}

interface ExportTweetsResponse {
  csv: Uint8Array;
}

interface GetChildAccountRequest {
  name: string;
}

interface GetParentAccountRequest {
  name: string;
}

interface GetTweetRequest {
  name: string;
}

interface ListTweetsRequest {
  parent: string;
  page_size: number;
  page_token: string;
  show_deleted: boolean;
}

interface ListTweetsResponse {
  tweets: Tweet[];
  next_page_token: string;
}

interface ParentAccount {
  name: string;
  child_account: string;
  fullname: string;
  birthdate: Timestamp;
  email: string;
  password: string;
  username: string;
  verification_status: AccountVerificationStatus;
}

interface SearchChildAccountsRequest {
  page_size: number;
  page_token: string;
}

interface SearchChildAccountsResponse {
  child_accounts: ChildAccount[];
  next_page_token: string;
}

interface Tweet {
  name: string;
  liked_by: string[];
  comments: Tweet_Comment[];
  soft_deleted: boolean;
  original: string;
  is_trending: boolean;
  create_time: Timestamp;
}

interface Tweet_Comment {
  text: string;
  author: string[];
}

interface UpdateChildAccountRequest {
  child_account: ChildAccount;
  update_mask: { [key: string]: boolean };
}

interface UpdateParentAccountRequest {
  parent_account: ParentAccount;
  update_mask: { [key: string]: boolean };
}

interface UpdateTweetRequest {
  tweet: Tweet;
  update_mask: { [key: string]: boolean };
}

interface ViewFeedRequest {
  parent: string;
  page_size: number;
  page_token: string;
  sort_by: ViewFeedRequest_Sort;
}

interface ViewFeedResponse {
  tweets: Tweet[];
  next_page_token: string;
}

interface TwitterKids {
  GetParentAccount(request: GetParentAccountRequest): ParentAccount;
  CreateParentAccount(request: CreateParentAccountRequest): ParentAccount;
  UpdateParentAccount(request: UpdateParentAccountRequest): ParentAccount;
  GetChildAccount(request: GetChildAccountRequest): ChildAccount;
  SearchChildAccounts(request: SearchChildAccountsRequest): SearchChildAccountsResponse;
  CreateChildAccount(request: CreateChildAccountRequest): ChildAccount;
  UpdateChildAccount(request: UpdateChildAccountRequest): ChildAccount;
  GetTweet(request: GetTweetRequest): Tweet;
  CreateTweet(request: CreateTweetRequest): Tweet;
  ListTweets(request: ListTweetsRequest): ListTweetsResponse;
  UpdateTweet(request: UpdateTweetRequest): Tweet;
  DeleteTweet(request: DeleteTweetRequest): void;
  ViewFeed(request: ViewFeedRequest): ViewFeedResponse;
  ExportTweets(request: ExportTweetsRequest): ExportTweetsResponse;
}
async function searchChildAccounts(requestData: MSearchChildAccountsRequest) {
  const url = `${BASE_URL}/search_child_accounts`;
  const params = {
    page_size: requestData.page_size,
    page_token: requestData.page_token,
  };
  const response = await axios.get(url, { params, headers: HEADERS });
  return response.data;
}
