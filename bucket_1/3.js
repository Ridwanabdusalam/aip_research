const axios = require('axios');

class Child {
    constructor(name = '', child_name = '', email = '', birthdate = '', following = []) {
        this.name = name;
        this.child_name = child_name;
        this.email = email;
        this.birthdate = birthdate;
        this.following = following;
    }
}

class AddAdditionalParentRequest {
    constructor(parent_email = '', child = '') {
        this.parent_email = parent_email;
        this.child = child;
    }
}

class ChildInfo {
    constructor(name = '', username = '', password = '', bio = '') {
        this.name = name;
        this.username = username;
        this.password = password;
        this.bio = bio;
    }
}

class CreateChildRequest {
    constructor(parent = '', child = null) {
        this.parent = parent;
        this.child = child;
    }
}

class CreateParentRequest {
    constructor(parent = null) {
        this.parent = parent;
    }
}

class CreateTweetRequest {
    constructor(tweet = null) {
        this.tweet = tweet;
    }
}

class DeleteParentRequest {
    constructor(username = '') {
        this.username = username;
    }
}

class DeleteTweetRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class ExportTweetsRequest {
    constructor(parent = '', printer_destination = null) {
        this.parent = parent;
        this.printer_destination = printer_destination;
    }
}

class FollowChildResponce {
    constructor(requestor = '', child = '') {
        this.requestor = requestor;
        this.child = child;
    }
}

class GetChildInfoRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class GetChildRequest {
    constructor(child = '') {
        this.child = child;
    }
}

class GetParentRequest {
    constructor(username = '') {
        this.username = username;
    }
}

class GetTweetRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class LikeTweetRequest {
    constructor(child = '', tweet = '') {
        this.child = child;
        this.tweet = tweet;
    }
}

class ListClosebyTweetsRequest {
    constructor(child = '', tweets = [], page_size = 0, page_token = '', sort = 0) {
        this.child = child;
        this.tweets = tweets;
        this.page_size = page_size;
        this.page_token = page_token;
        this.sort = sort;
    }
}

class ListDeletedTweetsRequest {
    constructor(child = '', tweets = [], page_size = 0, page_token = '') {
        this.child = child;
        this.tweets = tweets;
        this.page_size = page_size;
        this.page_token = page_token;
    }
}

class ListFeedRequest {
    constructor(child = '', page_size = 0, page_token = '', sort = 0) {
        this.child = child;
        this.page_size = page_size;
        this.page_token = page_token;
        this.sort = sort;
    }
}

class ListFeedResponse {
    constructor(tweets = [], next_page_token = '') {
        this.tweets = tweets;
        this.next_page_token = next_page_token;
    }
}

class ListTweetRequest {
    constructor(parent = '') {
        this.parent = parent;
    }
}

class Parent {
    constructor(name = '', parent_name = '', birthdate = '', email = '', password = '', children = []) {
        this.name = name;
        this.parent_name = parent_name;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.children = children;
    }
}

class Reply {
    constructor(author = '', body = '') {
        this.author = author;
        this.body = body;
    }
}

class ReplyRequest {
    constructor(reply = null) {
        this.reply = reply;
    }
}

class SearchChildrenRequest {
    constructor(name = '') {
        this.name = name;
    }
}

class SearchChildrenResponse {
    constructor(child = []) {
        this.child = child;
    }
}

class Tweet {
    constructor(name = '', body = '', status = 0, retweet = '') {
        this.name = name;
        this.body = body;
        this.status = status;
        this.retweet = retweet;
    }
}

class UpdateChildInfoRequest {
    constructor(child_info = null, update_mask = null) {
        this.child_info = child_info;
        this.update_mask = update_mask;
    }
}

class UpdateParentRequest {
    constructor(parent = null, update_mask = null) {
        this.parent = parent;
        this.update_mask = update_mask;
    }
}

class TwitterAPI {
    constructor(base_url, headers) {
        this.base_url = base_url;
        this.headers = headers;
    }

    async sendRequest(method, path, payload = null) {
        const url = this.base_url + path;
        let response;

        try {
            if (method === 'POST') {
                response = await axios.post(url, payload, { headers: this.headers });
            } else if (method === 'GET') {
                response = await axios.get(url, { headers: this.headers });
            } else if (method === 'PATCH') {
                response = await axios.patch(url, payload, { headers: this.headers });
            } else if (method === 'DELETE') {
                response = await axios.delete(url, { headers: this.headers });
            }

            if (response && response.status === 200) {
                return response.data;
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

// Define your base URL and headers
const BASE_URL = 'https://api.example.com/v1';
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
};

// Initialize TwitterAPI with base URL and headers
const twitterApi = new TwitterAPI(BASE_URL, HEADERS);

// Example usage of sending requests
const createParentRequest = new CreateParentRequest(new Parent('parent-username', 'Parent Name', '2023-01-01', 'parent@example.com', 'parentpassword'));
const createdParent = await twitterApi.sendRequest('POST', '/create_parent', createParentRequest);
console.log('Created Parent:', createdParent);

const getChildInfoRequest = new GetChildInfoRequest('children/child-username');
const childInfo = await twitterApi.sendRequest('GET', '/get_child_info', getChildInfoRequest);
console.log('Child Info:', childInfo);
