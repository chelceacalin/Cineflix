package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.Movie.MovieHistoryDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;

import java.util.UUID;

public class MovieHistoryMapper {
    public static MovieHistory toMovieHistory(MovieHistoryDTO movieHistoryDTO) {
        Movie movie = new Movie();
        movie.setId(movieHistoryDTO.getMovieId());

        UserCineflix userCineflix = new UserCineflix();
        userCineflix.setId(String.valueOf(movieHistoryDTO.getUserId()));

        return MovieHistory.builder()
                .id(UUID.randomUUID())
                .description(movieHistoryDTO.getDescription())
                .rating(movieHistoryDTO.getRating())
                .rentedDate(movieHistoryDTO.getRentedDate())
                .rentedUntil(movieHistoryDTO.getRentedUntil())
                .movie(movie)
                .rentedBy(userCineflix)
                .build();
    }
}
