//JPA entity classes like User and Skill

package com.shutterspace.user_service.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    private String name;
    private String level;
}
