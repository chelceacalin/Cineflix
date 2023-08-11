package ro.esolutions.cineflix.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCineflix {
    @Id
    private String id;

    @Column(unique = true)
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Role role;

    public enum Role {
        ADMIN,
        USER
    }
}
