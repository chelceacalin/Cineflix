package ro.esolutions.cineflix.services;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.Movie.*;
import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.exceptions.Category.CategoryNotFoundException;
import ro.esolutions.cineflix.exceptions.Movie.MovieNotFoundException;
import ro.esolutions.cineflix.exceptions.MovieNotAvailableException;
import ro.esolutions.cineflix.exceptions.User.UserNotFoundException;
import ro.esolutions.cineflix.mapper.MovieHistoryMapper;
import ro.esolutions.cineflix.mapper.MovieMapper;
import ro.esolutions.cineflix.repositories.*;
import ro.esolutions.cineflix.specification.GenericSpecification;
import ro.esolutions.cineflix.specification.MovieSpecification;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import static java.util.Objects.nonNull;
@Service
@Transactional
@RequiredArgsConstructor

public class MovieService {

    private final MovieRepository movieRepository;

    private final MovieHistoryRepository movieHistoryRepository;

    private final UserCineflixService userCineflixService;

    private final CategoryRepository categoryRepository;

    private final UserCineflixRepository userCineflixRepository;

    private final MovieImageDataRepository movieImageDataRepository;

    public static final String USERNAME = "movieHistories.rentedBy.username";
    public static final String CATEGORY = "category";
    public static final String MOVIE_HISTORIES_RENTED_UNTIL = "movieHistories.rentedUntil";
    public static final String MOVIE_HISTORIES_RENTED_DATE = "movieHistories.rentedDate";
    public static final String RENTED_BY = "rentedBy";
    public static final String RENTED_UNTIL = "rentedUntil";
    public static final String RENTED_DATE = "rentedDate";
    public static final String DIRECTOR = "director";
    public static final String OWNER = "owner_username";
    public static final String TITLE = "title";
    public static final String RENTED_BY_USERNAME = "rentedBy.username";
    public static final String MOVIE_OWNER_USERNAME = "movie.owner.username";
    public static final String MOVIE_DIRECTOR = "movie.director";
    public static final String MOVIE_CATEGORY_NAME = "movie.category.name";
    public static final String MOVIE_TITLE = "movie.title";

    public Page<MovieDTO> findUserMovies(MovieFilterDTO movieFilter, int pageNo, int pageSize) {
        Specification<Movie> specification = getSpecification(movieFilter);
        Sort.Direction sortDirection = Sort.Direction.fromString(movieFilter.getDirection());
        Pageable pageable = getPageable(pageNo, pageSize, movieFilter.getSortField(), sortDirection);

        Page<Movie> moviesPage = movieRepository.findAll(specification, pageable);
        List<MovieDTO> movies = moviesPage.getContent().stream()
                .map(movie -> {
                    MovieHistory history = movieHistoryRepository.findMovieHistoryByRentedUntilMostRecent(movie.getId());
                    return MovieMapper.toDto(movie, history);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(movies, pageable, moviesPage.getTotalElements());
    }

    private static Pageable getPageable(int pageNo, int pageSize, String sortField, Sort.Direction sortDirection) {
        return switch (sortField) {
            case RENTED_BY -> PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, USERNAME));
            case RENTED_UNTIL -> PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, MOVIE_HISTORIES_RENTED_UNTIL));
            case RENTED_DATE -> PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, MOVIE_HISTORIES_RENTED_DATE));
            default -> PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, sortField));
        };
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

        if (nonNull(movieFilter.getRentedDate())) {
            specification = specification.and(MovieSpecification.rentedDateFieldEquals(movieFilter.getRentedDate(), RENTED_DATE));
        }

        if (nonNull(movieFilter.getRentedUntil())) {
            specification = specification.and(MovieSpecification.rentedDateFieldEquals(movieFilter.getRentedUntil(), RENTED_UNTIL));
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

    public String getRentedBy(UUID id) {
        MovieHistory movieHistory = movieHistoryRepository.findMovieHistoryByRentedUntilMostRecent(id);
        UserCineflix userCineflix = movieHistory.getRentedBy();
        String firstName = userCineflix.getFirstName();
        String lastName = userCineflix.getLastName();
        return firstName + " " + lastName;
    }

    public void deleteMovieIfNotRented(UUID id) {
        Movie movieFound = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException("Movie to be deleted does not exist"));
        if (!movieFound.isAvailable()) {
            String userName = getRentedBy(id);
            throw new MovieNotAvailableException("Movie is being watched by: " + userName
                    + ". You will be able to delete it after it's been returned");
        }
        movieImageDataRepository.deleteByMovie_Id(id);
        movieHistoryRepository.deleteMovieHistoryByMovie_Id(id);
        movieRepository.deleteById(id);
    }

    public MovieAddDTO findMovieByID(UUID id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            return MovieMapper.toMovieAddDto(movie);
        } else {
            throw new MovieNotFoundException("Movie with id " + id + " not found");
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
                throw new CategoryNotFoundException("Category not found");
            }
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    public MovieRentDTO findMovieToRent(UUID id) {
        return movieRepository.findById(id)
                .map(MovieMapper::toMovieRentDto)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found"));
    }

    @Transactional
    public void addMovieHistory(MovieHistoryDTO movieHistoryDTO) {
        MovieHistory movieHistory = MovieHistoryMapper.toMovieHistory(movieHistoryDTO);
        movieHistoryRepository.save(movieHistory);
    }

    public Optional<String> validateMovieHistory(MovieHistoryDTO movieHistoryDTO) {
        Optional<Movie> movie = movieRepository.findById(movieHistoryDTO.getMovieId());
        if (movie.isEmpty()) {
            return Optional.of("Movie not found");
        }

        Optional<UserCineflix> userCineflix = userCineflixRepository.findById(String.valueOf(movieHistoryDTO.getUserId()));
        if (userCineflix.isEmpty()) {
            return Optional.of("User not found");
        }

        return Optional.empty();
    }

    public Page<MovieDTO> findRentedMoviesForUser(MyRentedMoviesRequestDTO myRentedMoviesDTO, int pageNo, int pageSize) {
        UserDTO userCineflix = userCineflixService.findUserByUsername(myRentedMoviesDTO.getRentUsername());
        Pageable pageable = myRentedMoviesDTO.getPageableRented(pageNo, pageSize, myRentedMoviesDTO.getSortField());

        Page<MovieHistory> movieHistories = movieHistoryRepository.findAllByRentedBy_Id(userCineflix.getId(), pageable);
        List<MovieDTO> rentedMovies = movieHistories.getContent().stream()
                .map(history -> MovieMapper.toDto(history.getMovie(), history))
                .collect(Collectors.toList());
        return new PageImpl<>(rentedMovies, pageable, movieHistories.getTotalElements());
    }

}