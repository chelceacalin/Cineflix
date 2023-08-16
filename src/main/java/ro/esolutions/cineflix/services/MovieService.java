package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.MovieDTO;
import ro.esolutions.cineflix.DTO.MovieFilterDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.mapper.MovieMapper;
import ro.esolutions.cineflix.repositories.MovieHistoryRepository;
import ro.esolutions.cineflix.repositories.MovieRepository;
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

    @NonNull
    private final MovieRepository movieRepository;
    @NonNull
    private final MovieHistoryRepository movieHistoryRepository;

    public Page<MovieDTO> findUserMovies(MovieFilterDTO movieFilter, int pageNo, int pageSize) {
        if (movieFilter.getOwner_username() == null) {
            return Page.empty();
        }

        Specification<Movie> specification = getSpecification(movieFilter);

        Sort.Direction sortDirection = Sort.Direction.fromString(movieFilter.getDirection());
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, movieFilter.getSortField()));

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
            specification = specification.and(GenericSpecification.fieldNameLike(movieFilter.getTitle(), "title"));
        }

        if (nonNull(movieFilter.getDirector())) {
            specification = specification.and(GenericSpecification.fieldNameLike(movieFilter.getDirector(), "director"));
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


        return specification;
    }

    public Optional<Movie> findById(UUID id){ return movieRepository.findById(id); }

    public Movie updateMovie(UUID id, Movie employee) {
        Optional<Movie> optionalEmployee = movieRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            return movieRepository.save(employee);
        }
        return employee;
    }

}
