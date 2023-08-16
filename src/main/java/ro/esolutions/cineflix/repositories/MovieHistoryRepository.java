package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ro.esolutions.cineflix.entities.MovieHistory;

import java.util.UUID;

public interface MovieHistoryRepository  extends JpaRepository<MovieHistory, UUID> {

    @Query("SELECT mh FROM MovieHistory mh " +
            "WHERE mh.movie.id = :id " +
            "AND mh.rentedUntil = (" +
            "    SELECT MAX(mhist.rentedUntil) FROM MovieHistory mhist " +
            "    WHERE mhist.movie.id = mh.movie.id" +
            ")")
    MovieHistory findMovieHistoryByRentedUntilMostRecent(UUID id);

}
