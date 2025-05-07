package post.pms_backend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import post.pms_backend.dto.PostDto;
import post.pms_backend.entity.Post;
import post.pms_backend.exception.ResourceNotFoundException;
import post.pms_backend.mapper.PostMapper;
import post.pms_backend.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    // ✅ Constructor Injection
    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = PostMapper.mapToPost(postDto);

        post.setCreatedAt(LocalDateTime.now());

        Post createdPost = postRepository.save(post);
        return PostMapper.mapToPostDto(createdPost);
    }

    @Override
    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map((post) -> PostMapper.mapToPostDto(post)).collect(Collectors.toList());
    }

    @Override
    public PostDto updatePost(Long postId, PostDto updatePost) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResourceNotFoundException("Post does not exist"));

        post.setTitle(updatePost.getTitle());
        post.setDescription(updatePost.getDescription());
        post.setMediaUrls(updatePost.getMediaUrls());
        post.setVideo(updatePost.isVideo());
        post.setTags(updatePost.getTags());
        post.setLikesCount(updatePost.getLikesCount());
        post.setCommentsCount(updatePost.getCommentsCount());
        post.setPublic(updatePost.isPublic());

        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);

        return PostMapper.mapToPostDto(updatedPost);
    }

    @Override
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResourceNotFoundException("Post does not exist"));

        postRepository.deleteById(postId);

    }


}
