package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserMapper {

    public static UserDTO toDTO(UserCineflix user){
        return UserDTO.builder()
                .id(user.getId())
                .role(user.getRole())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

}
