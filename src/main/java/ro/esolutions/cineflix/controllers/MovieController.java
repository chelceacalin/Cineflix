package ro.esolutions.cineflix.controllers;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.MovieDTO;
import ro.esolutions.cineflix.DTO.MovieFilterDTO;
import ro.esolutions.cineflix.services.MovieService;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    @NonNull
    private final MovieService movieService;

    @GetMapping
    public Page<MovieDTO> findAll(@ModelAttribute MovieFilterDTO dto,
                                  @RequestParam(name = "pageNo", defaultValue = "0") int pageNo,
                                  @RequestParam(name = "pageSize", defaultValue = "15") int pageSize) {
        return movieService.findAllMoviesFiltered(dto, pageNo, pageSize);
    }
}
