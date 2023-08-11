import com.google.protobuf.util.JsonFormat;
import com.google.protobuf.FieldMask;
import org.example.api.AccountOuterClass.*;
import org.example.api.TweetOuterClass.*;
import org.example.api.ApiServiceGrpc.*;
import org.example.api.ApiServiceOuterClass.*;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class APIClient {
    private static final String BASE_URL = "https://api.example.com/v1";
    private static final String AUTHORIZATION = "Bearer YOUR_ACCESS_TOKEN";
    private static final String CONTENT_TYPE = "application/json";

    private static HttpURLConnection getConnection(String urlString, String requestMethod) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(requestMethod);
        connection.setRequestProperty("Authorization", AUTHORIZATION);
        connection.setRequestProperty("Content-Type", CONTENT_TYPE);
        connection.setDoOutput(true);
        return connection;
    }

    public static void main(String[] args) {
        Account newAccount = Account.newBuilder()
                .setDisplayName("John Doe")
                .setEmail("john@example.com")
                .setPassword("password123")
                .setIsParent(true)
                .build();

        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/accounts", "POST");

            CreateAccountRequest createAccountRequest = CreateAccountRequest.newBuilder()
                    .setAccount(newAccount)
                    .build();

            String jsonPayload = JsonFormat.printer().print(createAccountRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Account created successfully!");
            } else {
                System.out.println("Error creating account: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Define other methods here...
    // Define functions to make API requests

    // Create Account
    public static void createAccount(Account account) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/accounts", "POST");

            CreateAccountRequest createAccountRequest = CreateAccountRequest.newBuilder()
                    .setAccount(account)
                    .build();

            String jsonPayload = JsonFormat.printer().print(createAccountRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Account created successfully!");
            } else {
                System.out.println("Error creating account: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Verify Account
    public static void verifyAccount(String secret) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/accounts:verify", "POST");

            VerifyAccountRequest verifyAccountRequest = VerifyAccountRequest.newBuilder()
                    .setSecret(secret)
                    .build();

            String jsonPayload = JsonFormat.printer().print(verifyAccountRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Account verified successfully!");
            } else {
                System.out.println("Error verifying account: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Update Account
    public static void updateAccount(Account account, FieldMask updateMask) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/" + account.getName(), "PATCH");

            UpdateAccountRequest updateAccountRequest = UpdateAccountRequest.newBuilder()
                    .setAccount(account)
                    .setUpdateMask(updateMask)
                    .build();

            String jsonPayload = JsonFormat.printer().print(updateAccountRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Account updated successfully!");
            } else {
                System.out.println("Error updating account: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // List Accounts
    public static void listAccounts(int pageSize, String pageToken, String filter) {
        try {
            String url = BASE_URL + "/accounts";
            url += "?page_size=" + pageSize + "&page_token=" + pageToken + "&filter=" + filter;

            HttpURLConnection connection = getConnection(url, "GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Process the response here
                System.out.println("List of accounts received successfully!");
            } else {
                System.out.println("Error listing accounts: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Create Tweet
    public static void createTweet(Tweet tweet) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/tweets", "POST");

            CreateTweetRequest createTweetRequest = CreateTweetRequest.newBuilder()
                    .setTweet(tweet)
                    .build();

            String jsonPayload = JsonFormat.printer().print(createTweetRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Tweet created successfully!");
            } else {
                System.out.println("Error creating tweet: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Delete Tweet
    public static void deleteTweet(String name) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/" + name, "DELETE");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_NO_CONTENT) {
                System.out.println("Tweet deleted successfully!");
            } else {
                System.out.println("Error deleting tweet: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // List Tweets
    public static void listTweets(int pageSize, String pageToken, String filter, boolean showDeleted, String orderBy) {
        try {
            String url = BASE_URL + "/tweets";
            url += "?page_size=" + pageSize + "&page_token=" + pageToken + "&filter=" + filter +
                    "&show_deleted=" + showDeleted + "&order_by=" + orderBy;

            HttpURLConnection connection = getConnection(url, "GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Process the response here
                System.out.println("List of tweets received successfully!");
            } else {
                System.out.println("Error listing tweets: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Export Tweets
    public static void exportTweets(String parent, String csvDestination, String filter) {
        try {
            HttpURLConnection connection = getConnection(BASE_URL + "/tweets:export", "POST");

            ExportTweetsRequest exportTweetsRequest = ExportTweetsRequest.newBuilder()
                    .setParent(parent)
                    .setCsvDestination(csvDestination)
                    .setFilter(filter)
                    .build();

            String jsonPayload = JsonFormat.printer().print(exportTweetsRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Tweets exported successfully!");
            } else {
                System.out.println("Error exporting tweets: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Create Like
    public static void createLike(String parent, Like like) {
        try {
            String url = BASE_URL + "/" + parent + "/likes";
            HttpURLConnection connection = getConnection(url, "POST");

            CreateLikeRequest createLikeRequest = CreateLikeRequest.newBuilder()
                    .setParent(parent)
                    .setLike(like)
                    .build();

            String jsonPayload = JsonFormat.printer().print(createLikeRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Like created successfully!");
            } else {
                System.out.println("Error creating like: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Create Followee
    public static void createFollowee(String parent, Followee followee) {
        try {
            String url = BASE_URL + "/" + parent + "/followees";
            HttpURLConnection connection = getConnection(url, "POST");

            CreateFolloweeRequest createFolloweeRequest = CreateFolloweeRequest.newBuilder()
                    .setParent(parent)
                    .setFollowee(followee)
                    .build();

            String jsonPayload = JsonFormat.printer().print(createFolloweeRequest);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.writeBytes(jsonPayload);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Followee created successfully!");
            } else {
                System.out.println("Error creating followee: " + responseCode);
            }

            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
