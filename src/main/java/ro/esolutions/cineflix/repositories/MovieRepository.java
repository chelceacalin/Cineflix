package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.DTO.MovieDTO;
import ro.esolutions.cineflix.entities.Movie;

import java.util.List;
import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID>, JpaSpecificationExecutor<Movie> {



    @Query("select c.name, m.director,m.title,m.isAvailable,h.rating,h.rentedBy,h.rentedDate,h.rentedUntil" +
            " from Movie m join MovieHistory h on m.id=h.movie.id join Category c on m.category.id=c.id ")
    List<Movie> findAllMoviesHistory();



}
