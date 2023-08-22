import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

enum SortBy {
  MOST_RECENT = 0,
  MOST_RELEVANT = 1,
}

enum LinkedTweetType {
  RETWEET = 0,
  REPLY = 2,
}

interface MAcceptInvitationRequest {
  invitationToken: string;
}

interface MChildAccount {
  name: string;
  username: string;
  birthDate: string;
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  profileBio: string;
  emailVerified: boolean;
}

interface MCreateChildAccountRequest {
  childAccount: MChildAccount;
  parentAccount: string;
}

// ... (other interfaces and enums)

class STwitterForKids {
  GetParentAccount(request: MGetParentAccountRequest): MParentAccount {
    // TODO: Implement logic
  }

  CreateParentAccount(request: MCreateParentAccountRequest): MParentAccount {
    // TODO: Implement logic
  }

  // ... (implement other methods)

  ExportTweets(request: MExportTweetsRequest): google.longrunning.Operation {
    // TODO: Implement logic
  }
}

// Methods with HTTP bindings
// TODO: Implement HTTP bindings

export {
  SortBy,
  LinkedTweetType,
  MAcceptInvitationRequest,
  MChildAccount,
  MCreateChildAccountRequest,
  // ... (export other interfaces and enums)
  STwitterForKids,
};
