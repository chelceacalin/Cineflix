package ro.esolutions.cineflix.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ro.esolutions.cineflix.entities.UserCineflix;


@Data
@Builder
@AllArgsConstructor
public class UserDTO {

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private UserCineflix.Role role;
}
