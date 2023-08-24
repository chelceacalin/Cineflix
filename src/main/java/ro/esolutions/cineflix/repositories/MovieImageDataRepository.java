package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.esolutions.cineflix.entities.MovieImageData;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MovieImageDataRepository extends JpaRepository<MovieImageData, UUID> {
    Optional<MovieImageData> findImageDataByName(String filename);

    @Query("select img from MovieImageData img where img.movie.id=:id")
    Optional<MovieImageData> findMovieImageDataByMovieId(UUID id);

    void deleteByMovie_Id(UUID id);
}
