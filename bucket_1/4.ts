import axios from 'axios';
import {
  CreateChildProfileRequest,
  ListChildProfilesResponse,
  UpdateChildProfileRequest,
  ChildProfile,
} from './example_pb2';

const BASE_URL = 'https://api.aip_research.com/v1';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your actual access token
const HEADERS = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

// Helper function to send HTTP requests
async function sendRequest(url: string, method: string, data?: any) {
  const response = await axios({
    method,
    url,
    headers: HEADERS,
    data,
  });
  return response.data;
}

// ChildProfile API
async function createChildProfile(parent: string, childProfile: ChildProfile) {
  const url = `${BASE_URL}/${parent}/childprofiles`;
  const request = new CreateChildProfileRequest();
  request.setParent(parent);
  request.setChildProfile(childProfile);

  await sendRequest(url, 'POST', request.serializeBinary());
}

async function deleteChildProfile(name: string) {
  const url = `${BASE_URL}/${name}`;
  await sendRequest(url, 'DELETE');
}

async function getChildProfile(name: string) {
  const url = `${BASE_URL}/${name}`;
  const response = await sendRequest(url, 'GET');
  const childProfile = new ChildProfile();
  childProfile.deserializeBinary(response);
  return childProfile;
}

async function listChildProfiles(
  parent: string,
  pageSize?: number,
  pageToken?: string,
  orderBy?: string
) {
  const url = `${BASE_URL}/${parent}/childprofiles`;
  const params: any = { page_size: pageSize, page_token: pageToken, order_by: orderBy };
  const response = await sendRequest(url, 'GET', { params });
  const listChildProfilesResponse = new ListChildProfilesResponse();
  listChildProfilesResponse.deserializeBinary(response);
  return listChildProfilesResponse;
}

async function updateChildProfile(childProfile: ChildProfile, updateMask: any) {
  const url = `${BASE_URL}/${childProfile.getName()}`;
  const request = new UpdateChildProfileRequest();
  request.setChildProfile(childProfile);
  request.setUpdateMask(updateMask);

  await sendRequest(url, 'PATCH', request.serializeBinary());
}

// Example usage
(async () => {
  const parent = 'parents/123';
  const childProfile = new ChildProfile();
  childProfile.setName('children/456');

  // Create a child profile
  await createChildProfile(parent, childProfile);

  // Get a child profile
  const profile = await getChildProfile('children/456/childprofiles/789');
  console.log(profile.toObject());

  // List child profiles
  const response = await listChildProfiles(parent, 10);
  console.log(response.toObject());

  // Update child profile
  childProfile.setBio('New bio');
  const updateMask = { paths: ['bio'] };
  await updateChildProfile(childProfile, updateMask);
})();
