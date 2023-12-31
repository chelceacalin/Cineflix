package ro.esolutions.cineflix.DTO.Movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.esolutions.cineflix.validators.RentDateConstraint;
import ro.esolutions.cineflix.validators.RentForTwoWeeksConstraint;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RentForTwoWeeksConstraint
public class MovieHistoryDTO {
    @RentDateConstraint
    private LocalDate rentedDate;
    @RentDateConstraint
    private LocalDate rentedUntil;
    private Integer rating;
    private String description;
    private UUID movieId;
    private UUID userId;
}
