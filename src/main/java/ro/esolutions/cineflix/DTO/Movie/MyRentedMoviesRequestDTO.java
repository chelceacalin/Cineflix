package ro.esolutions.cineflix.DTO.Movie;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor

public class MyRentedMoviesRequestDTO {

    private String rentUsername;

    private String title;

    private String director;

    private String category;

    private Boolean isAvailable;

    private LocalDate rentedStart;

    private LocalDate rentedUntil;
    private String direction;
    private String sortField;

    public MyRentedMoviesRequestDTO(){
        this.direction="ASC";
        this.sortField="title";
    }
}