package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.entities.MovieHistory;

import java.util.UUID;
@Repository
public interface MovieHistoryRepository  extends JpaRepository<MovieHistory, UUID> {

    @Query("SELECT mh FROM MovieHistory mh " +
            "WHERE mh.movie.id = :id order by mh.rentedUntil desc limit 1")
    MovieHistory findMovieHistoryByRentedUntilMostRecent(UUID id);

    void deleteMovieHistoryByMovie_Id(UUID uuid);


}
