const axios = require('axios');
const { ChildProfile, CreateChildProfileRequest, UpdateChildProfileRequest, ListChildProfilesRequest } = require('./example_pb'); // Import your Protobuf message definitions

// Define base URL and headers
const BASE_URL = 'https://api.aip_research.com/v1';
const HEADERS = { Authorization: 'Bearer YOUR_ACCESS_TOKEN', 'Content-Type': 'application/json' };

// Helper function to send HTTP requests
async function sendRequest(url, method, data = {}) {
  const response = await axios({ url, method, headers: HEADERS, data });
  return response.data;
}

// ChildProfile API
async function createChildProfile(parent, childProfile) {
  const url = `${BASE_URL}/${parent}/childprofiles`;
  const request = new CreateChildProfileRequest();
  request.setParent(parent);
  request.setChildProfile(childProfile);
  await sendRequest(url, 'POST', request.serializeBinary());
}

async function getChildProfile(name) {
  const url = `${BASE_URL}/${name}`;
  const response = await sendRequest(url, 'GET');
  return ChildProfile.deserializeBinary(response);
}

async function listChildProfiles(parent, pageSize, pageToken, orderBy) {
  const url = `${BASE_URL}/${parent}/childprofiles`;
  const request = new ListChildProfilesRequest();
  request.setParent(parent);
  request.setPageSize(pageSize);
  request.setPageToken(pageToken);
  request.setOrderBy(orderBy);
  const response = await sendRequest(url, 'GET', request.serializeBinary());
  return ListChildProfilesResponse.deserializeBinary(response);
}

async function updateChildProfile(childProfile, updateMask) {
  const url = `${BASE_URL}/${childProfile.getName()}`;
  const request = new UpdateChildProfileRequest();
  request.setChildProfile(childProfile);
  request.setUpdateMask(updateMask);
  await sendRequest(url, 'PATCH', request.serializeBinary());
}

// Child API
async function createChild(parent, child) {
  const url = `${BASE_URL}/${parent}/children`;
  const request = new CreateChildRequest();
  request.setParent(parent);
  request.setChild(child);
  await sendRequest(url, 'POST', request.serializeBinary());
}

// Define other API functions...

// Example usage:
(async function() {
  const parent = 'parents/123';
  const childProfile = new ChildProfile();
  childProfile.setName('children/456');
  
  // Create a child profile
  await createChildProfile(parent, childProfile);
  
  // Get a child profile
  const profile = await getChildProfile('children/456/childprofiles/789');
  console.log(profile.toObject());
  
  // List child profiles
  const response = await listChildProfiles(parent, 10, '', 'create_time DESC');
  console.log(response.toObject());

  // Update child profile
  childProfile.setBio('New bio');
  const updateMask = { paths: ['bio'] };
  await updateChildProfile(childProfile, updateMask);
})();
