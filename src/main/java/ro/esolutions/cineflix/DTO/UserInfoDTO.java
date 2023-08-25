package ro.esolutions.cineflix.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.esolutions.cineflix.entities.UserCineflix;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private UserCineflix.Role role;
    private String token;
}
