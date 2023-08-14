package ro.esolutions.cineflix.controllers;

import jakarta.servlet.http.PushBuilder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.DTO.MovieDTO;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.services.MovieService;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    @NonNull
    MovieService movieService;
    public Page<MovieDTO> getMovies(){

        return movieService.getMovies(null,0,1);

    }
}
