package ro.esolutions.cineflix.DTO.Movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieRentDTO {
    private String title;
    private String director;
    private String ownerUsername;
}
