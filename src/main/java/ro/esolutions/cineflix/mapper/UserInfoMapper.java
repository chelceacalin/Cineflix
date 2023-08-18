package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.UserInfoDTO;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserInfoMapper {
    static public UserInfoDTO toDTO(UserCineflix u, String t) {
        return UserInfoDTO.builder()
                .username(u.getUsername())
                .firstName(u.getFirstName())
                .lastName(u.getLastName())
                .role(u.getRole())
                .token(t)
                .build();
    }
}
