package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.controllers.UserRoleManagementController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.mapper.UserMapper;
import ro.esolutions.cineflix.services.UserCineflixService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static ro.esolutions.cineflix.entities.UserCineflix.Role.ADMIN;

@ExtendWith(MockitoExtension.class)
public class UserRoleManagementControllerTest {

    @Mock
    UserCineflixService userCineflixService;

    @InjectMocks
    UserRoleManagementController userRoleManagementController;

    @Test
    @DisplayName("Update user role UI")
    public void updateUserRole() {
        UserCineflix userCineflix = UserCineflix.builder()
                .id("1")
                .username("test123")
                .lastName("te")
                .lastName("st")
                .role(ADMIN).build();
        UserDTO userDTO = UserMapper.toDTO(userCineflix);
        when(userCineflixService.updateUserRole(userDTO, ADMIN)).thenReturn(userCineflix);
        ResponseEntity<UserCineflix> updatedUserResponseEntity = userRoleManagementController.updateUserRole(userDTO, ADMIN);
        verify(userCineflixService, times(1)).updateUserRole(userDTO, ADMIN);
        assertEquals(ADMIN,updatedUserResponseEntity.getBody().getRole());
        assertEquals(HttpStatus.OK,updatedUserResponseEntity.getStatusCode());
    }
}
