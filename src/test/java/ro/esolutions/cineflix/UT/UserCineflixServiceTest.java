package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.mapper.UserMapper;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.services.UserCineflixService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserCineflixServiceTest {

    @Mock
    UserCineflixRepository userCineflixRepository;

    @InjectMocks
    UserCineflixService userCineflixService;

    @Test
    @DisplayName("Update User Role")
    public void updateUserRole() {
        UserCineflix userCineflix = UserCineflix.builder()
                .id("1")
                .username("mark.mark")
                .firstName("Mark")
                .lastName("Mark")
                .email("mark.mark@mail.com")
                .role(UserCineflix.Role.ADMIN)
                .build();
        UserDTO userDTO = UserMapper.toDTO(userCineflix);

        when(userCineflixRepository.findByUsername("mark.mark")).thenReturn(Optional.of(userCineflix));
        when(userCineflixRepository.save(userCineflix)).thenReturn(userCineflix);

        UserCineflix updatedUserCineflix = userCineflixService.updateUserRole(userDTO, UserCineflix.Role.USER);

        assertEquals(UserCineflix.Role.USER, updatedUserCineflix.getRole());

        verify(userCineflixRepository, times(1)).findByUsername("mark.mark");
        verify(userCineflixRepository, times(1)).save(userCineflix);
    }
}
