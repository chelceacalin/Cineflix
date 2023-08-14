package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.MovieDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.repositories.MovieRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {

    @NonNull
    private final MovieRepository movieRepository;

    public Page<MovieDTO> getMovies(MovieDTO dto, int pageNo, int pageSize) {
//        if (dto.getMovieTitle() == null && dto.getDirector() == null && dto.getCategory() == null && dto.getIsAvailable() == null && dto.getRentedBy()==null && dto.getRentedDate() == null && dto.getRentedUntil() == null) {
//            return CategoryRepository.findAll(PageRequest.of(pageNo, pageSize));
//        }
        List<Movie> movies=movieRepository.findAllMoviesHistory();
        System.out.println(movies);
    return  null;

    };
}
