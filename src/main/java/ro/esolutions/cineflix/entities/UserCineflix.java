package ro.esolutions.cineflix.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class UserCineflix {
    @Id
    private String id;

    @Column
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Role role;

    public enum Role {
        ADMIN,
        USER
    }
}
