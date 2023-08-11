package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.services.UserCineflixService;
import ro.esolutions.cineflix.specification.UserCineflixSpecification;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserCineflixServiceTest {
    @Mock
    UserCineflixRepository userCineflixRepository;
    @InjectMocks
    UserCineflixService userCineflixService;


}
