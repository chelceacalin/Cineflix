package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieAddDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieFilterDTO;
import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.exceptions.MovieNotFoundException;
import ro.esolutions.cineflix.mapper.MovieMapper;
import ro.esolutions.cineflix.mapper.UserMapper;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.repositories.MovieHistoryRepository;
import ro.esolutions.cineflix.repositories.MovieRepository;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.specification.GenericSpecification;
import ro.esolutions.cineflix.specification.MovieSpecification;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {

    @NonNull
    private final MovieRepository movieRepository;
    @NonNull
    private final MovieHistoryRepository movieHistoryRepository;

    private final UserCineflixRepository userCineflixRepository;

    @NonNull
    private final UserCineflixService userCineflixService;
    @NonNull
    private final CategoryService categoryService;

    @NonNull
    private final CategoryRepository categoryRepository;
    public static final String USERNAME = "movieHistories.rentedBy.username";
    public static final String MOVIE_HISTORIES_RENTED_UNTIL = "movieHistories.rentedUntil";
    public static final String RENTED_BY = "rentedBy";
    public static final String RENTED_UNTIL = "rentedUntil";
    public static final String DIRECTOR = "director";
    public static final String TITLE = "title";

    public Page<MovieDTO> findUserMovies(MovieFilterDTO movieFilter, int pageNo, int pageSize) {
        if (movieFilter.getOwner_username() == null) {
            return Page.empty();
        }

        Specification<Movie> specification = getSpecification(movieFilter);

        Sort.Direction sortDirection = Sort.Direction.fromString(movieFilter.getDirection());

        String sortField = movieFilter.getSortField();

        Pageable pageable = null;
        if (RENTED_BY.equals(sortField)) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, USERNAME));
        } else if (RENTED_UNTIL.equals(sortField)) {
            sortField = MOVIE_HISTORIES_RENTED_UNTIL;
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, sortField));
        } else {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, sortField));
        }

        Page<Movie> moviesPage = movieRepository.findAll(specification, pageable);
        List<MovieDTO> movies = moviesPage.getContent().stream()
                .map(movie -> {
                    MovieHistory history = movieHistoryRepository.findMovieHistoryByRentedUntilMostRecent(movie.getId());
                    return MovieMapper.toDto(movie, history);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(movies, pageable, moviesPage.getTotalPages());
    }

    private Specification<Movie> getSpecification(MovieFilterDTO movieFilter) {
        Specification<Movie> specification = Specification.where(null);

        if (nonNull(movieFilter.getOwner_username())) {
            specification = specification.and(MovieSpecification.hasUsername(movieFilter.getOwner_username()));
        }

        if (nonNull(movieFilter.getTitle())) {
            specification = specification.and(GenericSpecification.fieldNameLike(movieFilter.getTitle(), TITLE));
        }

        if (nonNull(movieFilter.getDirector())) {
            specification = specification.and(GenericSpecification.fieldNameLike(movieFilter.getDirector(), DIRECTOR));
        }

        if (nonNull(movieFilter.getCategory())) {
            specification = specification.and(MovieSpecification.hasCategory(movieFilter.getCategory()));
        }

        if (nonNull(movieFilter.getIsAvailable())) {
            specification = specification.and(GenericSpecification.isAvailable(movieFilter.getIsAvailable()));
        }

        if (nonNull(movieFilter.getRentedBy())) {
            specification = specification.and(MovieSpecification.getRentedBy(movieFilter.getRentedBy()));
        }

        if (nonNull(movieFilter.getRentedUntil())) {
            specification = specification.and(MovieSpecification.rentedUntilEquals(movieFilter.getRentedUntil()));
        }

        return specification;
    }

    public Optional<Movie> findById(UUID id) {
        return movieRepository.findById(id);
    }

    public void updateMovie(UUID id, MovieAddDTO movieDTO) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isPresent()) {
            Movie foundMovie = optionalMovie.get();
            Optional<Category> categoryOptional = categoryRepository.findByNameIgnoreCase(movieDTO.getCategory());
            if (categoryOptional.isPresent()) {
                foundMovie.setCategory(categoryOptional.get());
                foundMovie.setTitle(movieDTO.getTitle());
                foundMovie.setDirector(movieDTO.getDirector());
                foundMovie.setDescription(movieDTO.getDescription());
                movieRepository.save(foundMovie);
            } else {
                throw new CategoryNotFoundException("Category not found");
            }

        } else {
            throw new MovieNotFoundException("Movie Not Found");
        }
    }

    public MovieAddDTO findMovieByID(UUID id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            MovieAddDTO dto = MovieMapper.toMovieAddDto(movie);
            return dto;
        } else {
            throw new RuntimeException("Movie with id " + id + " not found");
        }
    }

    @Transactional
    public MovieAddDTO addMovie(MovieAddDTO movie) {
        UserDTO userCineflix = userCineflixService.findUserByUsername(movie.getOwner_username());
        if (nonNull(userCineflix)) {
            Optional<Category> categoryOptional = categoryRepository.findByNameIgnoreCase(movie.getCategory());
            if (categoryOptional.isPresent()) {
                Category category = categoryOptional.get();
                Movie createdMovie = MovieMapper.toMovie(movie, userCineflix, category);
                movieRepository.save(createdMovie);
                return MovieMapper.toMovieAddDto(createdMovie);

            } else {
                throw new RuntimeException("Category not found");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}