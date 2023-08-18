package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.Movie.MovieDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;

public class MovieMapper {
    public static MovieDTO toDto(Movie m, MovieHistory mh) {
        return MovieDTO.builder()
                .title(m.getTitle())
                .director(m.getDirector())
                .category(m.getCategory() != null ? m.getCategory().getName() : "DEFAULT")
                .isAvailable(m.isAvailable())
                .rentedBy(mh != null && mh.getRentedBy() != null ? mh.getRentedBy().getUsername() : "available")
                .owner_username(m.getOwner().getUsername())
                .rentedDate(mh != null && mh.getRentedDate() != null ? mh.getRentedDate() : null)
                .rentedUntil(mh != null && mh.getRentedUntil() != null ? mh.getRentedUntil() : null)
                .build();
    }
}
