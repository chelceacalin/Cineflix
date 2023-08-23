package ro.esolutions.cineflix.DTO.Movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieHistoryDTO {
    private LocalDate rentedDate;
    private LocalDate rentedUntil;
    private Integer rating;
    private String description;
    private UUID movieId;
    private UUID userId;
}
