package post.pms_backend.service;

import post.pms_backend.dto.PostDto;

import java.util.List;

public interface PostService {

    PostDto createPost(PostDto postDto);

    PostDto getPostById(Long postId);

    List<PostDto> getAllPosts();

    PostDto updatePost(Long postId, PostDto updatePost);

    void deletePost(Long postId);

}
