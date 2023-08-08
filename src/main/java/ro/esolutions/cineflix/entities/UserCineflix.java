package ro.esolutions.cineflix.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table
public class UserCineflix {
    @Id
    private String id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private Boolean isActive;

    @Column
    @Enumerated(value=EnumType.STRING)
    private Role role;

    public enum Role{
        ADMIN,
        USER
    }
}
