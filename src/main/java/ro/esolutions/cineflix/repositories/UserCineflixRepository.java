package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.List;

public interface UserCineflixRepository extends JpaRepository<UserCineflix, String> {
    List<UserCineflix> findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrEmailIgnoreCaseContaining(
            String firstName, String lastName, String email
    );
}