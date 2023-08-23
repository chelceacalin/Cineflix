package ro.esolutions.cineflix.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.esolutions.cineflix.validators.RentDateConstraint;
import ro.esolutions.cineflix.validators.RentForTwoWeeksConstraint;

import java.time.LocalDate;
import java.util.UUID;


@Table(name = "movieHistory", uniqueConstraints = @UniqueConstraint(
        columnNames = {"id", "user_id", "movie_id"}
))
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RentForTwoWeeksConstraint
public class MovieHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @RentDateConstraint
    private LocalDate rentedDate;

    private LocalDate rentedUntil;

    private Integer rating;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserCineflix rentedBy;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    @JsonIgnore
    private Movie movie;

}
