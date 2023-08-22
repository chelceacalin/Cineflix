package ro.esolutions.cineflix.controllers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.Movie.MovieAddDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieDTO;
import ro.esolutions.cineflix.DTO.Movie.MovieFilterDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.services.MovieService;

import java.util.UUID;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    @NonNull
    private final MovieService movieService;

    @GetMapping
    public Page<MovieDTO> findUserMovies(@ModelAttribute MovieFilterDTO dto,
                                         @RequestParam(name = "pageNo", defaultValue = "0") int pageNo,
                                         @RequestParam(name = "pageSize", defaultValue = "15") int pageSize) {
        return movieService.findUserMovies(dto, pageNo, pageSize);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable UUID id) {
        movieService.deleteMovieIfNotRented(id);
        return ResponseEntity.ok("Movie can be deleted");
    }

    @PostMapping
    public MovieAddDTO addMovie(@RequestBody MovieAddDTO movieDTO) {
        return movieService.addMovie(movieDTO);
    }

    @PostMapping("/{id}")
    public void updateMovie(@PathVariable UUID id, @RequestBody MovieAddDTO movie) {
        movieService.updateMovie(id, movie);
    }

    @GetMapping("/{id}")
    public MovieAddDTO findMovieById(@PathVariable UUID id) {
        return movieService.findMovieByID(id);
    }
}
