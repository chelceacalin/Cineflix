package ro.esolutions.cineflix.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.List;

public interface UserCineflixRepository extends JpaRepository<UserCineflix, String> {
    List<UserCineflix> findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrEmailIgnoreCaseContaining(
            String firstName, String lastName, String email
    );

//    List<UserCineflix> findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrRoleIgnoreCaseContainingOrIsActiveIsTrueOrIsActiveIsFalse(
//            String firstName, String lastName, String role, Boolean isActive
//    );
}