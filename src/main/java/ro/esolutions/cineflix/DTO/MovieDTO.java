package ro.esolutions.cineflix.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {

    private String movieTitle;

    private String director;

    private String category;

    private Boolean isAvailable;

    private String rentedBy;

    private LocalDate rentedDate;

    private LocalDate rentedUntil;
}
