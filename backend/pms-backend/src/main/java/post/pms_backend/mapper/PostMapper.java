package post.pms_backend.mapper;

import post.pms_backend.dto.PostDto;
import post.pms_backend.entity.Post;


public class PostMapper {

    public static PostDto mapToPostDto(Post post) {
        return new PostDto(
                post.getPostId(),
                post.getUserId(),
                post.getTitle(),
                post.getDescription(),
                post.getMediaUrls(),
                post.isVideo(),
                post.getTags(),
                post.getLikesCount(),
                post.getCommentsCount(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.isPublic()

        );
    }

    public static Post mapToPost(PostDto postDto) {
        return new Post(
                postDto.getPostId(),
                postDto.getUserId(),
                postDto.getTitle(),
                postDto.getDescription(),
                postDto.getMediaUrls(),
                postDto.isVideo(),
                postDto.getTags(),
                postDto.getLikesCount(),
                postDto.getCommentsCount(),
                postDto.getCreatedAt(),
                postDto.getUpdatedAt(),
                postDto.isPublic()

        );
    }

}
