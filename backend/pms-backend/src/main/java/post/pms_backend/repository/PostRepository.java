package post.pms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import post.pms_backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {



}
