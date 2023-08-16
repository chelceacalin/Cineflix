package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.entities.Movie;

import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID>, JpaSpecificationExecutor<Movie> {

}
