package ro.esolutions.cineflix.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Table(name = "movieImageData")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieImageData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String type;

    @Lob
    @Column(name = "imageData", columnDefinition = "BYTEA")
    private byte[] imageData;

    @OneToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;
}
