package post.pms_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import post.pms_backend.dto.PostDto;
import post.pms_backend.service.PostService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // ✅ Manually defined constructor for injection
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDTO) {
        return ResponseEntity.ok(postService.createPost(postDTO));
    }

    //Build GET post Rest Api
    @GetMapping("{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") Long postId){
        PostDto postDto = postService.getPostById(postId);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    //Build get All posts
    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(){
        List<PostDto> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    //Build Update Post
    @PutMapping("{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable("id") Long postId, @RequestBody PostDto updatedPost){
        PostDto postDto = postService.updatePost(postId, updatedPost);
        return new ResponseEntity<>(postDto,HttpStatus.OK);
    }

    //Build delete post Rest API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") Long postId){
        postService.deletePost(postId);
        return ResponseEntity.ok("Post Deleted Successfully!");
    }

}
