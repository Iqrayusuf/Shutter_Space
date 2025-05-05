package post.pms_backend.entity;

import jakarta.persistence.*;
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

@Entity
@Table(name="posts")

public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "post_media", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "media_url")
    private List<String> mediaUrls;

    @Column(name = "is_video")
    private boolean isVideo;

    @ElementCollection
    @CollectionTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "tag")
    private List<String> tags;

    @Column(name = "likes_count", columnDefinition = "INT DEFAULT 0")
    private int likesCount = 0;

    @Column(name = "comments_count", columnDefinition = "INT DEFAULT 0")
    private int commentsCount = 0;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_public")
    private boolean isPublic = true;

    public Post() {
        // Required by JPA/Hibernate
    }

    public Post(Long postId, Long userId, String title, String description, List<String> mediaUrls,
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


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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


}

