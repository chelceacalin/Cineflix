package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.Movie.MovieAddDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieRentDTO;
import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;

public class MovieMapper {
    public static MovieDTO toDto(Movie m, MovieHistory mh) {
        return MovieDTO.builder()
                .id(m.getId())
                .title(m.getTitle())
                .director(m.getDirector())
                .category(m.getCategory() != null ? m.getCategory().getName() : "DEFAULT")
                .description(m.getDescription())
                .isAvailable(m.isAvailable())
                .rentedBy(mh != null && mh.getRentedBy() != null ? mh.getRentedBy().getUsername() : "available")
                .owner_username(m.getOwner().getUsername())
                .rentedDate(mh != null && mh.getRentedDate() != null ? mh.getRentedDate() : null)
                .rentedUntil(mh != null && mh.getRentedUntil() != null ? mh.getRentedUntil() : null)
                .build();
    }

    public static Movie toMovie(MovieAddDTO dto, UserDTO userDTO, Category category){
        return Movie.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .isAvailable(dto.getIsAvailable())
                .director(dto.getDirector())
                .category(category)
                .owner(UserMapper.toUserCineflix(userDTO))
                .build();
    }

    public static MovieAddDTO toMovieAddDto(Movie movie){
        return MovieAddDTO.builder()
                .title(movie.getTitle())
                .director(movie.getDirector())
                .description(movie.getDescription())
                .category(movie.getCategory().getName())
                .owner_username(movie.getOwner().getUsername())
                .isAvailable(movie.isAvailable())
                .id(movie.getId())
                .build();
    }

    public static MovieRentDTO toMovieRentDto(Movie movie) {
        return MovieRentDTO.builder()
                .title(movie.getTitle())
                .director(movie.getDirector())
                .ownerUsername(movie.getOwner().getUsername())
                .build();
    }


}
