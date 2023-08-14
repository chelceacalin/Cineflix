package ro.esolutions.cineflix.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Table(name = "movieHistory")
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDate rentedDate;

    private LocalDate rentedUntil;

    private Integer rating;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserCineflix rentedBy;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;


}
