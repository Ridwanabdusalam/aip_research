// ChildAccount
interface ChildAccount {
    name: string;
    given_name: string;
    family_name: string;
    birthdate: Date;
    email: string;
    password: string;
    username: string;
    is_verified: boolean;
    profile_bio: string;
}

// CreateChildAccountRequest
interface CreateChildAccountRequest {
    child_account: ChildAccount;
}

// CreateParentAccountRequest
interface CreateParentAccountRequest {
    parent_account: ParentAccount;
}

// CreateTweetRequest
interface CreateTweetRequest {
    parent: string;
    tweet: Tweet;
}

// DeleteTweetRequest
interface DeleteTweetRequest {
    name: string;
}

// ExportTweetsMetadata
interface ExportTweetsMetadata {
}

// ExportTweetsRequest
interface ExportTweetsRequest {
    parent: string;
    gcs_bucket: string;
}

// ExportTweetsResponse
interface ExportTweetsResponse {
    tweets: Tweet[];
}

// FollowChildAccountRequest
interface FollowChildAccountRequest {
    name: string;
}

// FollowChildAccountResponse
interface FollowChildAccountResponse {
}

// GetChildAccountRequest
interface GetChildAccountRequest {
    name: string;
}

// GetParentAccountRequest
interface GetParentAccountRequest {
    name: string;
}

// LikeTweetRequest
interface LikeTweetRequest {
    name: string;
}

// ListTweetsRequest
interface ListTweetsRequest {
    parent: string;
    page_size: number;
    page_token: string;
}

// ListTweetsResponse
interface ListTweetsResponse {
    tweets: Tweet[];
    next_page_token: string;
}

// ParentAccount
interface ParentAccount {
    name: string;
    given_name: string;
    family_name: string;
    birthdate: Date;
    email: string;
    password: string;
    username: string;
    is_verified: boolean;
    child_account: string;
}

// SearchChildAccountsRequest
interface SearchChildAccountsRequest {
    query: string;
    page_size: number;
    page_token: string;
}

// SearchChildAccountsResponse
interface SearchChildAccountsResponse {
    child_accounts: ChildAccount[];
    next_page_token: string;
}

// SearchFeedRequest
interface SearchFeedRequest {
    name: string;
    page_size: number;
    page_token: string;
}

// SearchFeedResponse
interface SearchFeedResponse {
    tweets: Tweet[];
    next_page_token: string;
}

// SearchFollowedRequest
interface SearchFollowedRequest {
    name: string;
    page_size: number;
    page_token: string;
}

// SearchFollowedResponse
interface SearchFollowedResponse {
    tweets: Tweet[];
    next_page_token: string;
}

// SearchFollowersRequest
interface SearchFollowersRequest {
    name: string;
    page_size: number;
    page_token: string;
}

// SearchFollowersResponse
interface SearchFollowersResponse {
    tweets: Tweet[];
    next_page_token: string;
}

// Tweet
interface Tweet {
    name: string;
    message: string;
    state: TweetState;
    is_liked: boolean;
    parent_tweet: string;
    retweeted_tweet: string;
}

// TweetState Enum
enum TweetState {
    STATE_UNSPECIFIED = 0,
    ACTIVE = 1,
    DELETED = 2
}

// UpdateChildAccountRequest
interface UpdateChildAccountRequest {
    child_account: ChildAccount;
    update_mask: FieldMask;
}

// UpdateParentAccountRequest
interface UpdateParentAccountRequest {
    parent_account: ParentAccount;
    update_mask: FieldMask;
}

// VerifyChildAccountRequest
interface VerifyChildAccountRequest {
    name: string;
    verification_code: string;
    password: string;
    username: string;
}

// VerifyParentAccountRequest
interface VerifyParentAccountRequest {
    name: string;
    verification_code: string;
}

// FieldMask
interface FieldMask {
    paths: string[];
}

// TwitterForKids
interface TwitterForKids {
    CreateParentAccount(request: CreateParentAccountRequest): ParentAccount;
    GetParentAccount(request: GetParentAccountRequest): ParentAccount;
    UpdateParentAccount(request: UpdateParentAccountRequest): ParentAccount;
    VerifyParentAccount(request: VerifyParentAccountRequest): ParentAccount;
    CreateChildAccount(request: CreateChildAccountRequest): ChildAccount;
    GetChildAccount(request: GetChildAccountRequest): ChildAccount;
    UpdateChildAccount(request: UpdateChildAccountRequest): ChildAccount;
    VerifyChildAccount(request: VerifyChildAccountRequest): ChildAccount;
    FollowChildAccount(request: FollowChildAccountRequest): FollowChildAccountResponse;
    SearchChildAccounts(request: SearchChildAccountsRequest): SearchChildAccountsResponse;
    SearchFeed(request: SearchFeedRequest): SearchFeedResponse;
    SearchFollowed(request: SearchFollowedRequest): SearchFollowedResponse;
    SearchFollowers(request: SearchFollowersRequest): SearchFollowersResponse;
    CreateTweet(request: CreateTweetRequest): Tweet;
    DeleteTweet(request: DeleteTweetRequest): void;
    ListTweets(request: ListTweetsRequest): ListTweetsResponse;
    ExportTweets(request: ExportTweetsRequest): any; // Replace any with the appropriate response type
    LikeTweet(request: LikeTweetRequest): Tweet;
}
