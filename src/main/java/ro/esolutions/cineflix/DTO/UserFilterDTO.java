package ro.esolutions.cineflix.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ro.esolutions.cineflix.entities.UserCineflix;

@Data
@Builder
@AllArgsConstructor
public class UserFilterDTO {

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String direction;
    private String sortField;
    private UserCineflix.Role role;

    public UserFilterDTO() {
        direction = "ASC";
        sortField = "defaultsort";
    }


}
