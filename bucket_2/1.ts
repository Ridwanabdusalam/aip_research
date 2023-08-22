// child_twitter.proto

enum AccountType {
    ACCOUNT_TYPE_UNSPECIFIED = 0,
    PARENT_ACCOUNT = 1,
    CHILD_ACCOUNT = 2,
  }
  
  enum AccountLifecycle {
    ACCOUNT_LIFECYCLE_UNSPECIFIED = 0,
    PENDING_EMAIL_VERIFICATION = 1,
    PENDING_SIGN_UP = 2,
    ACTIVE = 3,
    DELETE_REQUESTED = 4,
  }
  
  interface MAccount {
    name: string;
    type: AccountType;
    account_lifecycle: AccountLifecycle;
    birthdate: string;
    email: string;
    password: string;
  }
  
  interface MAddParentRequest {
    account: string;
    parent_account: string;
    second_parent_email: string;
  }
  
  interface MAddParentResponse {
    account: MAccount;
  }
  
  interface MComment {
    name: string;
    text: string;
  }
  
  interface MCreateAccountRequest {
    account: MAccount;
    account_id: string;
  }
  
  interface MCreateCommentRequest {
    parent: string;
    comment: MComment;
  }
  
  interface MCreateTweetRequest {
    parent: string;
    tweet: MTweet;
  }
  
  interface MDeleteTweetRequest {
    name: string;
  }
  
  interface MExportTweetsRequest {
    account: string;
    filename: string;
  }
  
  interface MExportTweetsResponse {}
  
  interface MFollowAccountRequest {
    name: string;
  }
  
  interface MFollowAccountResponse {
    followed_accounts: string[];
  }
  
  interface MLikeTweetRequest {
    name: string;
  }
  
  interface MLikeTweetResponse {}
  
  interface MListTweetsRequest {
    parent: string;
    page_size: number;
    page_token: string;
    order_by: string;
  }
  
  interface MListTweetsResponse {
    tweets: MTweet[];
    next_page_token: string;
  }
  
  interface MReTweetRequest {
    name: string;
  }
  
  interface MReTweetResponse {
    tweet: MTweet;
  }
  
  interface MSearchAccountsRequest {
    name: string;
  }
  
  interface MSearchAccountsResponse {
    accounts: string[];
  }
  
  interface MTweet {
    name: string;
    text: string;
    likes: number;
    original_tweet: string;
  }
  
  interface MUpdateAccountRequest {
    account: MAccount;
    update_mask: google.protobuf.FieldMask;
  }
  
  // TwitterForKidsService
  interface STwitterForKidsService {
    CreateAccount(request: MCreateAccountRequest): MAccount;
    UpdateAccount(request: MUpdateAccountRequest): MAccount;
    AddParent(request: MAddParentRequest): MAddParentResponse;
    SearchAccounts(request: MSearchAccountsRequest): MSearchAccountsResponse;
    FollowAccount(request: MFollowAccountRequest): MFollowAccountResponse;
    CreateTweet(request: MCreateTweetRequest): MTweet;
    DeleteTweet(request: MDeleteTweetRequest): google.protobuf.Empty;
    ListTweets(request: MListTweetsRequest): MListTweetsResponse;
    LikeTweet(request: MLikeTweetRequest): MLikeTweetResponse;
    ReTweet(request: MReTweetRequest): MReTweetResponse;
    CreateComment(request: MCreateCommentRequest): MComment;
    ExportTweets(request: MExportTweetsRequest): MExportTweetsResponse;
  }
  