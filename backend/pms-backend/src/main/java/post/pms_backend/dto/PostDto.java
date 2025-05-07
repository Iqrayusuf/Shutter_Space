package post.pms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class PostDto {

    private Long postId;
    private Long userId;

    private String title;
    private String description;

    private List<String> mediaUrls;
    private boolean isVideo;

    private List<String> tags;

    private int likesCount;
    private int commentsCount;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean isPublic;

    public PostDto(Long postId, Long userId, String title, String description, List<String> mediaUrls,
                boolean isVideo, List<String> tags, int likesCount, int commentsCount,
                LocalDateTime createdAt, LocalDateTime updatedAt, boolean isPublic) {
        this.postId = postId;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.mediaUrls = mediaUrls;
        this.isVideo = isVideo;
        this.tags = tags;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isPublic = isPublic;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMediaUrls(List<String> mediaUrls) {
        this.mediaUrls = mediaUrls;
    }

    public void setVideo(boolean isVideo) {
        this.isVideo = isVideo;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getPostId() {
        return postId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getMediaUrls() {
        return mediaUrls;
    }

    public boolean isVideo() {
        return isVideo;
    }

    public List<String> getTags() {
        return tags;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public boolean isPublic() {
        return isPublic;
    }

}
