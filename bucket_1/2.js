const axios = require('axios');

const BASE_URL = 'https://api.example.com/v1';
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
};

class ChildAccount {
    constructor(name = '', username = '', child = '', birthdate = null, email = '', password = '', parents = [], profile_bio = '', followed_children = []) {
        this.name = name;
        this.username = username;
        this.child = child;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.parents = parents;
        this.profile_bio = profile_bio;
        this.followed_children = followed_children;
    }
}

class CreateChildAccountRequest {
    constructor(child_account = null) {
        this.child_account = child_account;
    }
}

class CreateLikeRequest {
    constructor(parent = '', like = null) {
        this.parent = parent;
        this.like = like;
    }
}

class CreateParentAccountRequest {
    constructor(parent_account = null) {
        this.parent_account = parent_account;
    }
}

class CreateTweetRequest {
    constructor(parent = '', tweet = null) {
        this.parent = parent;
        this.tweet = tweet;
    }
}

class DeleteTweetRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class ExportTweetsRequest {
    constructor(child_account = '', format = '') {
        this.child_account = child_account;
        this.format = format;
    }
}

class ExportTweetsResponse {
    constructor(uri = '') {
        this.uri = uri;
    }
}

class GetChildAccountRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class GetParentAccountRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class Like {
    constructor(name = '', child = '') {
        this.name = name;
        this.child = child;
    }
}

class ListTweetsRequest {
    constructor(parent = '', page_size = 10, page_token = '', order_by = '', filter = '', show_deleted = false) {
        this.parent = parent;
        this.page_size = page_size;
        this.page_token = page_token;
        this.order_by = order_by;
        this.filter = filter;
        this.show_deleted = show_deleted;
    }
}

class ListTweetsResponse {
    constructor(tweets = [], next_page_token = '') {
        this.tweets = tweets;
        this.next_page_token = next_page_token;
    }
}

class ParentAccount {
    constructor(name = '', parent = '', birthdate = null, email = '', password = '') {
        this.name = name;
        this.parent = parent;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
    }
}

class Tweet {
    constructor(name = '', content = '', original_tweet = '', deleted = false) {
        this.name = name;
        this.content = content;
        this.original_tweet = original_tweet;
        this.deleted = deleted;
    }
}

class UpdateChildAccountRequest {
    constructor(child_account = null, update_mask = null) {
        this.child_account = child_account;
        this.update_mask = update_mask;
    }
}

class UpdateParentAccountRequest {
    constructor(parent_account = null, update_mask = null) {
        this.parent_account = parent_account;
        this.update_mask = update_mask;
    }
}

async function createParentAccount(parent_account) {
    try {
        const url = `${BASE_URL}/parentaccounts`;
        const payload = new CreateParentAccountRequest(parent_account);
        const response = await axios.post(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error creating parent account:', error);
        return null;
    }
}

async function getParentAccount(name) {
    try {
        const url = `${BASE_URL}/${name}`;
        const response = await axios.get(url, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error getting parent account:', error);
        return null;
    }
}

async function updateParentAccount(parent_account, update_mask) {
    try {
        const url = `${BASE_URL}/${parent_account.name}`;
        const payload = new UpdateParentAccountRequest(parent_account, update_mask);
        const response = await axios.patch(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error updating parent account:', error);
        return null;
    }
}

async function createChildAccount(parent, child_account) {
    try {
        const url = `${BASE_URL}/${parent}/childaccounts`;
        const payload = new CreateChildAccountRequest(child_account);
        const response = await axios.post(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error creating child account:', error);
        return null;
    }
}

async function getChildAccount(name) {
    try {
        const url = `${BASE_URL}/${name}`;
        const response = await axios.get(url, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error getting child account:', error);
        return null;
    }
}

async function updateChildAccount(child_account, update_mask) {
    try {
        const url = `${BASE_URL}/${child_account.name}`;
        const payload = new UpdateChildAccountRequest(child_account, update_mask);
        const response = await axios.patch(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error updating child account:', error);
        return null;
    }
}

async function createTweet(parent, tweet) {
    try {
        const url = `${BASE_URL}/${parent}/tweet`;
        const payload = new CreateTweetRequest(parent, tweet);
        const response = await axios.post(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error creating tweet:', error);
        return null;
    }
}

async function deleteTweet(name) {
    try {
        const url = `${BASE_URL}/${name}`;
        const payload = new DeleteTweetRequest(name);
        const response = await axios.delete(url, { data: payload, headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error deleting tweet:', error);
        return null;
    }
}

async function listTweets(parent, page_size, page_token, order_by, filter, show_deleted) {
    try {
        const url = `${BASE_URL}/${parent}/tweets`;
        const payload = new ListTweetsRequest(parent, page_size, page_token, order_by, filter, show_deleted);
        const response = await axios.get(url, { params: payload, headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error listing tweets:', error);
        return null;
    }
}

async function createLike(parent, like) {
    try {
        const url = `${BASE_URL}/${parent}/${parent}/like`;
        const payload = new CreateLikeRequest(parent, like);
        const response = await axios.post(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error creating like:', error);
        return null;
    }
}

async function exportTweets(name, format) {
    try {
        const url = `${BASE_URL}/${name}:export`;
        const payload = new ExportTweetsRequest(name, format);
        const response = await axios.post(url, payload, { headers: HEADERS });
        return response.data;
    } catch (error) {
        console.error('Error exporting tweets:', error);
        return null;
    }
}

// Example usage
(async () => {
    const newParentAccount = new ParentAccount(
        'parent-username',
        'Parent',
        '2000-01-01',
        'parent@example.com',
        'parentpassword'
    );

    const createdParentAccount = await createParentAccount(newParentAccount);
    if (createdParentAccount) {
        console.log('Parent account created:', createdParentAccount);
    }

    const parentAccount = await getParentAccount('parentaccounts/parent-username');
    if (parentAccount) {
        console.log('Parent account retrieved:', parentAccount);
    }

    const updateMask = {
        paths: ['parent']
    };
    const updatedParentAccount = new ParentAccount(
        'parent-username',
        'New Parent Name'
    );
    const updatedAccount = await updateParentAccount(updatedParentAccount, updateMask);
    if (updatedAccount) {
        console.log('Parent account updated:', updatedAccount);
    }

    const newChildAccount = new ChildAccount(
        'child-username',
        'Child',
        '2005-01-01',
        'child@example.com',
        'childpassword',
        ['parentaccounts/parent-username'],
        'Child bio'
    );

    const createdChildAccount = await createChildAccount('parentaccounts/parent-username', newChildAccount);
    if (createdChildAccount) {
        console.log('Child account created:', createdChildAccount);
    }

    const childAccount = await getChildAccount('parentaccounts/parent-username/childaccounts/child-username');
    if (childAccount) {
        console.log('Child account retrieved:', childAccount);
    }

    const childUpdateMask = {
        paths: ['email', 'profile_bio']
    };
    const updatedChildAccount = new ChildAccount(
        'parentaccounts/parent-username/childaccounts/child-username',
        '',
        '',
        'child@example.com',
        '',
        [],
        'Updated Child Bio'
    );
    const updatedChild = await updateChildAccount(updatedChildAccount, childUpdateMask);
    if (updatedChild) {
        console.log('Child account updated:', updatedChild);
    }

    const newTweet = new Tweet(
        '',
        'Hello, this is a new tweet!',
        '',
        false
    );

    const createdTweet = await createTweet('parentaccounts/parent-username/childaccounts/child-username', newTweet);
    if (createdTweet) {
        console.log('Tweet created:', createdTweet);
    }

    const deletedTweetResponse = await deleteTweet('parentaccounts/parent-username/childaccounts/child-username/tweets/123456');
    if (deletedTweetResponse) {
        console.log('Tweet deleted:', deletedTweetResponse);
    }

    const listTweetsResponse = await listTweets('parentaccounts/parent-username/childaccounts/child-username', 10, '', '', '', false);
    if (listTweetsResponse) {
        console.log('List of tweets:', listTweetsResponse);
    }

    const newLike = new Like(
        '',
        'parentaccounts/parent-username/childaccounts/child-username'
    );

    const createdLike = await createLike('parentaccounts/parent-username/childaccounts/child-username/tweets/123456', newLike);
    if (createdLike) {
        console.log('Like created:', createdLike);
    }

    const exportTweetsResponse = await exportTweets('parentaccounts/parent-username/childaccounts/child-username', 'csv');
    if (exportTweetsResponse) {
        console.log('Tweets exported:', exportTweetsResponse);
    }
})();
