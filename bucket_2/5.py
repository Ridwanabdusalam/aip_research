import { loadPackageDefinition, Server, ServerUnaryCall, sendUnaryData } from 'grpc';
import * as grpcProtoLoader from '@grpc/proto-loader';
import axios from 'axios';

import { TweetServiceService, ITweetServiceServer } from './path-to-corrected-api_pb_grpc';
import { CreateTweetRequest, ListTweetsRequest, LikeTweetRequest, Tweet, ListTweetsResponse, LikeTweetResponse } from './path-to-corrected-api_pb';

const PROTO_PATH = 'path-to-corrected-api.proto'; // Replace with the actual path
const API_BASE_URL = 'your_api_base_url_here'; // Replace with the actual API base URL

const packageDefinition = grpcProtoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const tweetServicePackage: any = loadPackageDefinition(packageDefinition).corrected_api; // Replace 'corrected_api' with the actual package name

class TweetService implements ITweetServiceServer {
  createTweet(call: ServerUnaryCall<CreateTweetRequest>, callback: sendUnaryData<Tweet>) {
    axios.post(`${API_BASE_URL}/create_tweet`, call.request, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const tweet = new Tweet();
        callback(null, tweet);
      })
      .catch(error => {
        console.error('Error creating tweet:', error);
        callback(error, null);
      });
  }

  listTweets(call: ServerUnaryCall<ListTweetsRequest>, callback: sendUnaryData<ListTweetsResponse>) {
    axios.get(`${API_BASE_URL}/list_tweets`, { params: call.request, headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const listTweetsResponse = new ListTweetsResponse();
        callback(null, listTweetsResponse);
      })
      .catch(error => {
        console.error('Error listing tweets:', error);
        callback(error, null);
      });
  }

  likeTweet(call: ServerUnaryCall<LikeTweetRequest>, callback: sendUnaryData<LikeTweetResponse>) {
    axios.post(`${API_BASE_URL}/like_tweet`, call.request, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const likeTweetResponse = new LikeTweetResponse();
        callback(null, likeTweetResponse);
      })
      .catch(error => {
        console.error('Error liking tweet:', error);
        callback(error, null);
      });
  }
}

const server = new Server();
server.addService(TweetServiceService, new TweetService());
server.bindAsync('127.0.0.1:50051', credentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server started on port ${port}`);
    server.start();
  }
});
