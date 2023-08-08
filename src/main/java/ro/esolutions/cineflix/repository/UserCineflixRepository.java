package ro.esolutions.cineflix.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.List;

public interface UserCineflixRepository extends JpaRepository<UserCineflix, String> {

    @Query("SELECT u FROM UserCineflix u ORDER BY u.firstName ASC, u.lastName ASC")
    List<UserCineflix> findAllOrderedByName();


}
