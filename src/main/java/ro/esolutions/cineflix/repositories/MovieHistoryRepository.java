package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.UUID;

public interface MovieHistoryRepository  extends JpaRepository<MovieHistory, UUID> {

    @Query("SELECT mh FROM MovieHistory mh " +
            "WHERE mh.movie.id = :id order by mh.rentedUntil desc limit 1")
    MovieHistory findMovieHistoryByRentedUntilMostRecent(UUID id);


}
