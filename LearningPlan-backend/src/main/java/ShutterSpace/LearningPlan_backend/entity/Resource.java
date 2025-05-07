package ShutterSpace.LearningPlan_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Resource {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String url;

    // Link back to User (for @JoinColumn to work)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String name;

    public Object getName() {
        return this.name;
    }

    public void setName(String name) {

    }
}
