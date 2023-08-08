package ro.esolutions.cineflix.services;

import org.springframework.data.domain.Sort;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repository.UserCineflixRepository;

import java.util.List;

public interface UserCineflixService {
    List<UserCineflix> findAllOrderedByName();
}
