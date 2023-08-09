package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ro.esolutions.cineflix.entities.UserCineflix;

public interface UserCineflixRepository extends JpaRepository<UserCineflix, String>, JpaSpecificationExecutor<UserCineflix> {
}