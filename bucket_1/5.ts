import axios from 'axios';

interface Adult {
    name: string;
    birthdate_time: string; // You can use a Date type
    given_name: string;
    email: string;
    children: string[];
}

interface Child {
    name: string;
    birthdate_time: string; // You can use a Date type
    given_name: string;
    email: string;
    profile: string;
    adults: string[];
    followers: string[];
    followee: string[];
    tweets: string[];
}

interface Tweet {
    name: string;
    contents: string;
    likes: number;
    replies: string[];
    retweets: number;
    poster: string;
}

interface CreateAdultRequest {
    adult: Adult;
}

interface CreateChildRequest {
    parent: string;
    child: Child;
}

interface GetAdultRequest {
    name: string;
}

interface GetChildRequest {
    name: string;
}

class TwitterKidsAPI {
    base_url: string;
    headers: { [key: string]: string };

    constructor(base_url: string, headers: { [key: string]: string }) {
        this.base_url = base_url;
        this.headers = headers;
    }

    async sendRequest(method: string, path: string, payload: any) {
        const url = this.base_url + path;
        const config = { headers: this.headers };
        
        // Implement sending HTTP request and receiving response (e.g., using axios, fetch, etc.)
        const response = await axios[method.toLowerCase()](url, payload, config);

        const responseData = response.data;
        return responseData;
    }

    async createAdult(adult: Adult) {
        const path = '/users';
        const payload: CreateAdultRequest = { adult };
        return await this.sendRequest('POST', path, payload);
    }

    async updateAdult(name: string, adult: Adult, update_mask: string[]) {
        const path = `/v1/users/${name}`;
        const payload = { adult, update_mask };
        return await this.sendRequest('PATCH', path, payload);
    }

    async getAdult(name: string) {
        const path = `/v1/users/${name}`;
        return await this.sendRequest('GET', path, null);
    }

    async createChild(parent: string, child: Child) {
        const path = `/v1/users/${parent}/childs`;
        const payload: CreateChildRequest = { parent, child };
        return await this.sendRequest('POST', path, payload);
    }

    async getChild(name: string) {
        const path = `/v1/users/${name}`;
        return await this.sendRequest('GET', path, null);
    }

    // Implement other methods similarly
}

// Example usage
const BASE_URL = 'https://api.aip_research.com/v1';
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ACCESS_TOKEN',
};

const twitterKidsAPI = new TwitterKidsAPI(BASE_URL, HEADERS);

async function main() {
    const newAdult: Adult = {
        name: 'adult_username',
        birthdate_time: '2023-08-15T00:00:00Z', // Replace with actual timestamp
        given_name: 'John Doe',
        email: 'john@example.com',
        children: [],
    };

    const createdAdult = await twitterKidsAPI.createAdult(newAdult);
    console.log('Created Adult:', createdAdult);

    const adultName = 'adult_username';
    const adultUpdate: Adult = {
        name: adultName,
        birthdate_time: '2023-08-15T00:00:00Z', // Replace with actual timestamp
        given_name: 'Updated Name',
        email: '',
        children: [],
    };
    const updateMask = ['birthdate_time', 'given_name'];
    const updatedAdult = await twitterKidsAPI.updateAdult(adultName, adultUpdate, updateMask);
    console.log('Updated Adult:', updatedAdult);

    const adultInfo = await twitterKidsAPI.getAdult(adultName);
    console.log('Adult Info:', adultInfo);

    const parentName = 'parent_username';
    const newChild: Child = {
        name: 'child_username',
        birthdate_time: '2023-08-15T00:00:00Z', // Replace with actual timestamp
        given_name: 'Child Name',
        email: 'child@example.com',
        profile: 'Child\'s profile',
        adults: [],
        followers: [],
        followee: [],
        tweets: [],
    };

    const createdChild = await twitterKidsAPI.createChild(parentName, newChild);
    console.log('Created Child:', createdChild);

    const childName = 'child_username';
    const childInfo = await twitterKidsAPI.getChild(childName);
    console.log('Child Info:', childInfo);
}

main();
