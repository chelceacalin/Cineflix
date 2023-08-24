package ro.esolutions.cineflix.repositories;

import lombok.ToString;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.DTO.Movie.MovieDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.List;
import java.util.UUID;
import java.util.function.Function;

@Repository

public interface MovieHistoryRepository  extends JpaRepository<MovieHistory, UUID> {

    @Query("SELECT mh FROM MovieHistory mh " +
            "WHERE mh.movie.id = :id order by mh.rentedUntil desc limit 1")
    MovieHistory findMovieHistoryByRentedUntilMostRecent(UUID id);
    void deleteMovieHistoryByMovie_Id(UUID uuid);

    Page<MovieHistory> findAllByRentedBy_Id(String userId, Pageable pageable);


}
