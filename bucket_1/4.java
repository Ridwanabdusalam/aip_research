import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ChildProfileApiClient {
    private static final String BASE_URL = "https://api.aip_research/v1";
    private static final String ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";
    
    private static final HttpClient httpClient = HttpClient.newHttpClient();
    
    public static void main(String[] args) {
        String parent = "parents/123";
        ChildProfile childProfile = ChildProfile.newBuilder()
                .setName("children/456/childprofiles/789")
                .build();
        
        try {
            // Create a child profile
            createChildProfile(parent, childProfile);
            
            // Get a child profile
            ChildProfile fetchedProfile = getChildProfile("children/456/childprofiles/789");
            System.out.println(fetchedProfile);
            
            // List child profiles
            ListChildProfilesResponse response = listChildProfiles(parent, 10, "", "create_time DESC");
            System.out.println(response);
            
            // Update child profile
            childProfile = childProfile.toBuilder().setBio("New bio").build();
            updateChildProfile(childProfile, parent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void createChildProfile(String parent, ChildProfile childProfile) throws Exception {
        String url = BASE_URL + "/" + parent + "/childprofiles";
        CreateChildProfileRequest request = CreateChildProfileRequest.newBuilder()
                .setParent(parent)
                .setChildProfile(childProfile)
                .build();
        
        sendPostRequest(url, request.toByteArray());
    }
    
    public static ChildProfile getChildProfile(String name) throws Exception {
        String url = BASE_URL + "/" + name;
        byte[] response = sendGetRequest(url);
        return ChildProfile.parseFrom(response);
    }
    
    public static ListChildProfilesResponse listChildProfiles(String parent, int pageSize, String pageToken, String orderBy) throws Exception {
        String url = BASE_URL + "/" + parent + "/childprofiles";
        ListChildProfilesRequest request = ListChildProfilesRequest.newBuilder()
                .setParent(parent)
                .setPageSize(pageSize)
                .setPageToken(pageToken)
                .setOrderBy(orderBy)
                .build();
        
        byte[] response = sendGetRequest(url);
        return ListChildProfilesResponse.parseFrom(response);
    }
    
    public static void updateChildProfile(ChildProfile childProfile, String parent) throws Exception {
        String url = BASE_URL + "/" + childProfile.getName();
        UpdateChildProfileRequest request = UpdateChildProfileRequest.newBuilder()
                .setChildProfile(childProfile)
                .build();
        
        sendPatchRequest(url, request.toByteArray());
    }
    
    // Helper methods for sending HTTP requests
    
    private static byte[] sendGetRequest(String url) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Authorization", "Bearer " + ACCESS_TOKEN)
                .GET()
                .build();
        
        HttpResponse<byte[]> response = httpClient.send(request, HttpResponse.BodyHandlers.ofByteArray());
        return response.body();
    }
    
    private static void sendPostRequest(String url, byte[] data) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Authorization", "Bearer " + ACCESS_TOKEN)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofByteArray(data))
                .build();
        
        HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
    }
    
    private static void sendPatchRequest(String url, byte[] data) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Authorization", "Bearer " + ACCESS_TOKEN)
                .header("Content-Type", "application/json")
                .method("PATCH", HttpRequest.BodyPublishers.ofByteArray(data))
                .build();
        
        HttpResponse<Void> response = httpClient.send(request, HttpResponse.BodyHandlers.discarding());
    }
}
