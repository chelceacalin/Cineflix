package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserCineflixRepository extends JpaRepository<UserCineflix, String>, JpaSpecificationExecutor<UserCineflix> {

    Optional<UserCineflix> findByUsername(String username);

}