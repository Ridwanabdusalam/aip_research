import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.protobuf.FieldMask;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

class ChildAccount {
    public String name = "";
    public String username = "";
    public String child = "";
    public String birthdate = "";
    public String email = "";
    public String password = "";
    public List<String> parents = new ArrayList<>();
    public String profile_bio = "";
    public List<String> followed_children = new ArrayList<>();
}

class CreateChildAccountRequest {
    public ChildAccount child_account;

    public CreateChildAccountRequest(ChildAccount child_account) {
        this.child_account = child_account;
    }
}

class CreateLikeRequest {
    public String parent;
    public Like like;

    public CreateLikeRequest(String parent, Like like) {
        this.parent = parent;
        this.like = like;
    }
}

class CreateParentAccountRequest {
    public ParentAccount parent_account;

    public CreateParentAccountRequest(ParentAccount parent_account) {
        this.parent_account = parent_account;
    }
}

class CreateTweetRequest {
    public String parent;
    public Tweet tweet;

    public CreateTweetRequest(String parent, Tweet tweet) {
        this.parent = parent;
        this.tweet = tweet;
    }
}

class DeleteTweetRequest {
    public String name;

    public DeleteTweetRequest(String name) {
        this.name = name;
    }
}

class ExportTweetsRequest {
    public String child_account;
    public String format;

    public ExportTweetsRequest(String child_account, String format) {
        this.child_account = child_account;
        this.format = format;
    }
}

class ExportTweetsResponse {
    public String uri;

    public ExportTweetsResponse(String uri) {
        this.uri = uri;
    }
}

class GetChildAccountRequest {
    public String name;

    public GetChildAccountRequest(String name) {
        this.name = name;
    }
}

class GetParentAccountRequest {
    public String name;

    public GetParentAccountRequest(String name) {
        this.name = name;
    }
}

class Like {
    public String name = "";
    public String child = "";
}

class ListTweetsRequest {
    public String parent;
    public int page_size;
    public String page_token = "";
    public String order_by = "";
    public String filter = "";
    public boolean show_deleted = false;

    public ListTweetsRequest(String parent, int page_size, String page_token, String order_by, String filter, boolean show_deleted) {
        this.parent = parent;
        this.page_size = page_size;
        this.page_token = page_token;
        this.order_by = order_by;
        this.filter = filter;
        this.show_deleted = show_deleted;
    }
}

class ListTweetsResponse {
    public List<Tweet> tweets = new ArrayList<>();
    public String next_page_token = "";
}

class ParentAccount {
    public String name = "";
    public String parent = "";
    public String birthdate = "";
    public String email = "";
    public String password = "";
}

class Tweet {
    public String name = "";
    public String content = "";
    public String original_tweet = "";
    public boolean deleted = false;
}

class UpdateChildAccountRequest {
    public ChildAccount child_account;
    public FieldMask update_mask;

    public UpdateChildAccountRequest(ChildAccount child_account, FieldMask update_mask) {
        this.child_account = child_account;
        this.update_mask = update_mask;
    }
}

class UpdateParentAccountRequest {
    public ParentAccount parent_account;
    public FieldMask update_mask;

    public UpdateParentAccountRequest(ParentAccount parent_account, FieldMask update_mask) {
        this.parent_account = parent_account;
        this.update_mask = update_mask;
    }
}

class TwitterForKidsService {
    private static final String BASE_URL = "https://api.example.com/v1";
    private static final HttpHeaders HEADERS = new HttpHeaders();

    static {
        HEADERS.setContentType(MediaType.APPLICATION_JSON);
        HEADERS.set("Authorization", "Bearer YOUR_ACCESS_TOKEN");
    }

    private static final RestTemplate restTemplate = new RestTemplate();

    public static ParentAccount createParentAccount(ParentAccount parent_account) {
        String url = BASE_URL + "/parentaccounts";
        CreateParentAccountRequest payload = new CreateParentAccountRequest(parent_account);
        ResponseEntity<ParentAccount> response = restTemplate.postForEntity(url, payload, ParentAccount.class);
        return response.getBody();
    }

    public static ParentAccount getParentAccount(String name) {
        String url = BASE_URL + "/" + name;
        ResponseEntity<ParentAccount> response = restTemplate.getForEntity(url, ParentAccount.class);
        return response.getBody();
    }

    public static ParentAccount updateParentAccount(ParentAccount parent_account, FieldMask update_mask) {
        String url = BASE_URL + "/" + parent_account.name;
        UpdateParentAccountRequest payload = new UpdateParentAccountRequest(parent_account, update_mask);
        ResponseEntity<ParentAccount> response = restTemplate.patchForEntity(url, payload, ParentAccount.class);
        return response.getBody();
    }

    public static ChildAccount createChildAccount(String parent, ChildAccount child_account) {
        String url = BASE_URL + "/" + parent + "/childaccounts";
        CreateChildAccountRequest payload = new CreateChildAccountRequest(child_account);
        ResponseEntity<ChildAccount> response = restTemplate.postForEntity(url, payload, ChildAccount.class);
        return response.getBody();
    }

    public static ChildAccount getChildAccount(String name) {
        String url = BASE_URL + "/" + name;
        ResponseEntity<ChildAccount> response = restTemplate.getForEntity(url, ChildAccount.class);
        return response.getBody();
    }

    public static ChildAccount updateChildAccount(ChildAccount child_account, FieldMask update_mask) {
        String url = BASE_URL + "/" + child_account.name;
        UpdateChildAccountRequest payload = new UpdateChildAccountRequest(child_account, update_mask);
        ResponseEntity<ChildAccount> response = restTemplate.patchForEntity(url, payload, ChildAccount.class);
        return response.getBody();
    }

    public static Tweet createTweet(String parent, Tweet tweet) {
        String url = BASE_URL + "/" + parent + "/tweet";
        CreateTweetRequest payload = new CreateTweetRequest(parent, tweet);
        ResponseEntity<Tweet> response = restTemplate.postForEntity(url, payload, Tweet.class);
        return response.getBody();
    }

    public static void deleteTweet(String name) {
        String url = BASE_URL + "/" + name;
        DeleteTweetRequest payload = new DeleteTweetRequest(name);
        restTemplate.delete(url, payload);
    }

    public static ListTweetsResponse listTweets(String parent, int page_size, String page_token, String order_by, String filter, boolean show_deleted) {
        String url = BASE_URL + "/" + parent + "/tweets";
        ListTweetsRequest payload = new ListTweetsRequest(parent, page_size, page_token, order_by, filter, show_deleted);
        ResponseEntity<ListTweetsResponse> response = restTemplate.getForEntity(url, ListTweetsResponse.class, payload);
        return response.getBody();
    }

    public static Like createLike(String parent, Like like) {
        String url = BASE_URL + "/" + parent + "/" + parent + "/like";
        CreateLikeRequest payload = new CreateLikeRequest(parent, like);
        ResponseEntity<Like> response = restTemplate.postForEntity(url, payload, Like.class);
        return response.getBody();
    }

    public static ExportTweetsResponse exportTweets(String name, String format) {
        String url = BASE_URL + "/" + name + ":export";
        ExportTweetsRequest payload = new ExportTweetsRequest(name, format);
        ResponseEntity<ExportTweetsResponse> response = restTemplate.postForEntity(url, payload, ExportTweetsResponse.class);
        return response.getBody();
    }

    public static void main(String[] args) {
        ParentAccount newParentAccount = new ParentAccount();
        newParentAccount.name = "parent-username";
        newParentAccount.birthdate = "2000-01-01";
        newParentAccount.email = "parent@example.com";
        newParentAccount.password = "parentpassword";

        ParentAccount createdParentAccount = createParentAccount(newParentAccount);
        if (createdParentAccount != null) {
            System.out.println("Parent account created: " + createdParentAccount.name);
        }

        ParentAccount parentAccount = getParentAccount("parentaccounts/parent-username");
        if (parentAccount != null) {
            System.out.println("Parent account retrieved: " + parentAccount.name);
        }

        FieldMask updateMask = FieldMask.newBuilder().addPaths("parent").build();
        ParentAccount updatedParentAccount = new ParentAccount();
        updatedParentAccount.name = "parent-username";
        updatedParentAccount.parent = "New Parent Name";

        ParentAccount updatedAccount = updateParentAccount(updatedParentAccount, updateMask);
        if (updatedAccount != null) {
            System.out.println("Parent account updated: " + updatedAccount.name);
        }

        ChildAccount newChildAccount = new ChildAccount();
        newChildAccount.username = "child-username";
        newChildAccount.child = "Child";
        newChildAccount.birthdate = "2005-01-01";
        newChildAccount.email = "child@example.com";
        newChildAccount.password = "childpassword";
        newChildAccount.parents.add("parentaccounts/parent-username");
        newChildAccount.profile_bio = "Child bio";

        ChildAccount createdChildAccount = createChildAccount("parentaccounts/parent-username", newChildAccount);
        if (createdChildAccount != null) {
            System.out.println("Child account created: " + createdChildAccount.name);
        }

        ChildAccount childAccount = getChildAccount("parentaccounts/parent-username/childaccounts/child-username");
        if (childAccount != null) {
            System.out.println("Child account retrieved: " + childAccount.name);
        }

        FieldMask childUpdateMask = FieldMask.newBuilder().addPaths("email").addPaths("profile_bio").build();
        ChildAccount updatedChildAccount = new ChildAccount();
        updatedChildAccount.name = "parentaccounts/parent-username/childaccounts/child-username";
        updatedChildAccount.email = "updated-child@example.com";
        updatedChildAccount.profile_bio = "Updated Child Bio";

        ChildAccount updatedChild = updateChildAccount(updatedChildAccount, childUpdateMask);
        if (updatedChild != null) {
            System.out.println("Child account updated: " + updatedChild.name);
        }

        Tweet newTweet = new Tweet();
        newTweet.content = "Hello, this is a new tweet!";

        Tweet createdTweet = createTweet("parentaccounts/parent-username/childaccounts/child-username", newTweet);
        if (createdTweet != null) {
            System.out.println("Tweet created: " + createdTweet.name);
        }

        deleteTweet("parentaccounts/parent-username/childaccounts/child-username/tweets/123456");
        System.out.println("Tweet deleted.");

        ListTweetsResponse listTweetsResponse = listTweets("parentaccounts/parent-username/childaccounts/child-username", 10, "", "", "", false);
        if (listTweetsResponse != null) {
            System.out.println("List of tweets: " + listTweetsResponse.tweets.size());
        }

        Like newLike = new Like();
        newLike.child = "parentaccounts/parent-username/childaccounts/child-username";

        Like createdLike = createLike("parentaccounts/parent-username/childaccounts/child-username/tweets/123456", newLike);
        if (createdLike != null) {
            System.out.println("Like created: " + createdLike.name);
        }

        ExportTweetsResponse exportTweetsResponse = exportTweets("parentaccounts/parent-username/childaccounts/child-username", "csv");
        if (exportTweetsResponse != null) {
            System.out.println("Tweets exported: " + exportTweetsResponse.uri);
        }
    }
}
