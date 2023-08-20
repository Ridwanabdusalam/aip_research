import express from 'express';

enum EAccountState {
    STATE_UNSPECIFIED = 0,
    CLAIMED = 1,
    NOT_CLAIMED = 2
}

enum EAccountType {
    ACCOUNT_TYPE_UNSPECIFIED = 0,
    PARENT_MAIN = 1,
    PARENT_OTHER = 2,
    CHILD = 3
}

enum EListTweetsRequestListTweetsType {
    LIST_TWEET_TYPE_UNSPECIFIED = 0,
    USERS = 1,
    TRENDING = 2,
    MY_FOLLOWERS = 3,
    FOR_ME = 4
}

enum EListTweetsRequestSortType {
    SORT_TYPE_UNSPECIFIED = 0,
    RECENT = 1,
    RELEVANT = 2
}

interface Account {
    first_name?: string;
    last_name?: string;
    birth_day?: string;
    email?: string;
    username?: string;
    password?: string;
    account_type?: EAccountType;
    account_state?: EAccountState;
}

interface ClaimAccountRequest {
    account?: Account;
    parent_account_reference_token?: string;
}

interface CreateAccountRequest {
    account?: Account;
}

interface Tweet {
    id?: string;
    created_time?: Timestamp;
    message?: string;
    author?: string;
    like_count?: number;
    retweet_count?: number;
}

interface CreateTweetRequest {
    tweet?: Tweet;
}

interface ListTweetsResponse {
    tweets?: Tweet[];
    next_page_token?: string;
}

interface Timestamp {
    seconds: number;
    nanos: number;
}

const app = express();
app.use(express.json());

// Mock database
const accountsDb: Record<string, Account> = {};
const tweetsDb: Record<string, Tweet> = {};

// API endpoints
app.post('/v1/account', (req, res) => {
    const requestAccount: Account = req.body.account;
    const account: Account = {
        ...requestAccount
    };
    // TODO: Add account creation logic
    res.json(account);
});

app.patch('/v1/account/:username', (req, res) => {
    const username = req.params.username;
    const requestUpdate = req.body;
    const updateMask: string[] = requestUpdate.update_mask || [];
    // TODO: Update account logic
    res.json(accountsDb[username]);
});

app.post('/v1/account:verify', (req, res) => {
    const requestAccount = req.body.account;
    const accountVerficationToken = req.body.account_verfication_token;
    // TODO: Verify account logic
    res.json(requestAccount);
});

app.post('/v1/account:claim', (req, res) => {
    const claimRequest: ClaimAccountRequest = req.body;
    // TODO: Claim account logic
    res.json(claimRequest.account);
});

app.get('/v1/:parent/tweets', (req, res) => {
    const parent = req.params.parent;
    const listTweetsType = req.query.list_tweets_type as string;
    const sortType = req.query.sort_type as string;
    const pageSize = Number(req.query.page_size) || 50;
    const pageToken = req.query.page_token as string;
    // TODO: List tweets logic
    res.json({
        tweets: [],
        next_page_token: ''
    });
});

app.post('/v1/tweet', (req, res) => {
    const requestTweet: Tweet = req.body.tweet;
    const tweet: Tweet = {
        ...requestTweet
    };
    // TODO: Create tweet logic
    res.json(tweet);
});

app.delete('/v1/tweet/:tweet_id', (req, res) => {
    const tweetId = req.params.tweet_id;
    // TODO: Delete tweet logic
    res.sendStatus(204);
});

app.post('/v1/tweet/like', (req, res) => {
    const requestAccount = req.body.account;
    const requestTweet = req.body.tweet;
    // TODO: Like tweet logic
    res.sendStatus(204);
});

app.post('/v1/tweet/retweet', (req, res) => {
    const requestTweet: Tweet = req.body.tweet;
    // TODO: Retweet logic
    res.sendStatus(204);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
