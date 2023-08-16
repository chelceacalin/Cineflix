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
import java.util.Objects;
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

    public Page<MovieDTO> findAllMoviesFiltered(MovieFilterDTO dto, int pageNo, int pageSize){
        if(dto.getOwner_username()==null)  return Page.empty();
        Specification<Movie> specification=getSpecification(dto);

        Sort.Direction sortDirection=Sort.Direction.fromString(dto.getDirection());
        Pageable pageable= PageRequest.of(pageNo,pageSize,Sort.by(sortDirection,dto.getSortField()));

        Page<Movie> moviesPage = movieRepository.findAll(specification, pageable);

        List<MovieDTO> dtos = moviesPage.getContent().stream()
                .map(movie -> {
                    MovieHistory history = movieHistoryRepository.findMovieHistoryByRentedUntilMostRecent(movie.getId());
                    return MovieMapper.toDto(movie,history);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtos,pageable,moviesPage.getTotalPages());
    }
    private Specification<Movie> getSpecification(MovieFilterDTO dto) {
        Specification<Movie> specification = Specification.where(null);

        if (nonNull(dto.getOwner_username())) {
            specification = specification.and(MovieSpecification.hasUsername(dto.getOwner_username()));
        }

        if(nonNull(dto.getTitle())){
            specification=specification.and(GenericSpecification.fieldNameLike(dto.getTitle(),"title"));
        }

        if(nonNull(dto.getDirector())){
            specification=specification.and(GenericSpecification.fieldNameLike(dto.getDirector(),"director"));
        }

        if(nonNull(dto.getCategory())){
            specification = specification.and(MovieSpecification.hasCategory(dto.getCategory()));
        }

        if(nonNull(dto.getIsAvailable())){
            specification=specification.and(GenericSpecification.isAvailable(dto.getIsAvailable()));
        }

        if (nonNull(dto.getRentedBy())) {
            specification=specification.and(MovieSpecification.getRentedBy(dto.getRentedBy()));
        }


        return specification;
    }


}
