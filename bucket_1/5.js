const axios = require('axios');

class Adult {
    constructor(name = "", birthdate_time = null, given_name = "", email = "", children = []) {
        this.name = name;
        this.birthdate_time = birthdate_time;
        this.given_name = given_name;
        this.email = email;
        this.children = children;
    }
}

class Child {
    constructor(name = "", birthdate_time = null, given_name = "", email = "", profile = "", adults = [], followers = [], followee = [], tweets = []) {
        this.name = name;
        this.birthdate_time = birthdate_time;
        this.given_name = given_name;
        this.email = email;
        this.profile = profile;
        this.adults = adults;
        this.followers = followers;
        this.followee = followee;
        this.tweets = tweets;
    }
}

class Tweet {
    constructor(name = "", contents = "", likes = 0, replies = [], retweets = 0, poster = "") {
        this.name = name;
        this.contents = contents;
        this.likes = likes;
        this.replies = replies;
        this.retweets = retweets;
        this.poster = poster;
    }
}

class CreateAdultRequest {
    constructor(adult = null) {
        this.adult = adult;
    }
}

class CreateChildRequest {
    constructor(parent = "", child = null) {
        this.parent = parent;
        this.child = child;
    }
}

class GetAdultRequest {
    constructor(name = "") {
        this.name = name;
    }
}

class GetChildRequest {
    constructor(name = "") {
        this.name = name;
    }
}

class TwitterKidsAPI {
    constructor(base_url = "https://api.aip_research.com/v1", headers = {}) {
        this.base_url = base_url;
        this.headers = headers;
    }

    async send_request(method, path, payload = null) {
        const url = `${this.base_url}${path}`;
        const response = await axios({
            method: method,
            url: url,
            data: payload,
            headers: this.headers
        });
        return response.data;
    }

    async create_adult(adult) {
        const path = "/users";
        const payload = new CreateAdultRequest({ adult: adult });
        const response = await this.send_request("POST", path, payload);
        return response;
    }

    async update_adult(name, adult, update_mask) {
        const path = `/v1/users/${name}`;
        const payload = { adult: adult, update_mask: update_mask };
        const response = await this.send_request("PATCH", path, payload);
        return response;
    }

    async get_adult(name) {
        const path = `/v1/users/${name}`;
        const response = await this.send_request("GET", path);
        return response;
    }

    async create_child(parent, child) {
        const path = `/v1/users/${parent}/childs`;
        const payload = new CreateChildRequest({ parent: parent, child: child });
        const response = await this.send_request("POST", path, payload);
        return response;
    }

    async get_child(name) {
        const path = `/v1/users/${name}`;
        const response = await this.send_request("GET", path);
        return response;
    }
}

// Example usage
(async () => {
    // Initialize TwitterKidsAPI with base URL and headers
    const BASE_URL = "https://api.aip_research.com/v1";
    const HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
    };
    const twitterKidsAPI = new TwitterKidsAPI(BASE_URL, HEADERS);

    // Example usage of API methods
    const newAdult = new Adult(
        "adult_username",
        "2023-01-01T00:00:00Z",
        "John Doe",
        "john@aip_research.com"
    );
    const createdAdult = await twitterKidsAPI.create_adult(newAdult);
    console.log("Created Adult:", createdAdult);

    const adultName = "adult_username";
    const adultUpdate = new Adult(
        null,
        "2023-01-01T00:00:00Z",
        "Updated Name"
    );
    const updateMask = ["birthdate_time", "given_name"];
    const updatedAdult = await twitterKidsAPI.update_adult(adultName, adultUpdate, updateMask);
    console.log("Updated Adult:", updatedAdult);

    const adultInfo = await twitterKidsAPI.get_adult(adultName);
    console.log("Adult Info:", adultInfo);

    const parentName = "parent_username";
    const newChild = new Child(
        "child_username",
        "2023-01-01T00:00:00Z",
        "Child Name",
        "child@aip_research.com",
        "Child's profile"
    );
    const createdChild = await twitterKidsAPI.create_child(parentName, newChild);
    console.log("Created Child:", createdChild);

    const childName = "child_username";
    const childInfo = await twitterKidsAPI.get_child(childName);
    console.log("Child Info:", childInfo);
})();
