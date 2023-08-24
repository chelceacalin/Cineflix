package ro.esolutions.cineflix.controllers;

import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.Movie.*;
import ro.esolutions.cineflix.services.MovieService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    @GetMapping("/rent/{id}")
    public MovieRentDTO findMovieToRent(@PathVariable UUID id) {
        return movieService.findMovieToRent(id);
    }

    @PostMapping("/history")
    public ResponseEntity<?> addMovieHistory(@Valid @RequestBody MovieHistoryDTO movieHistoryDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> validationErrors = new ArrayList<>();

            for (FieldError error : bindingResult.getFieldErrors()) {
                validationErrors.add(error.getDefaultMessage());
            }

            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }

        Optional<String> errorOptional = movieService.validateMovieHistory(movieHistoryDTO);

        if (errorOptional.isEmpty()) {
            movieService.addMovieHistory(movieHistoryDTO);
            return new ResponseEntity<>(movieHistoryDTO, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(errorOptional.get(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/rented")
    public Page<MovieDTO> findRentedMoviesForUser(
            @ModelAttribute MyRentedMoviesRequestDTO myRentedMoviesRequestDTO,
            @RequestParam(name = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(name = "pageSize", defaultValue = "15") int pageSize

    ) {
        return movieService.findRentedMoviesForUser(myRentedMoviesRequestDTO, pageNo, pageSize);
    }


}
