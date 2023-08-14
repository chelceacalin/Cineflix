package ro.esolutions.cineflix.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Table(name = "movie")
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    private String title;

    private String director;

    private String description;

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    public List<MovieHistory> history;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private UserCineflix owner;

    @OneToOne(mappedBy = "movie")
    @JsonIgnore
    private MovieImageData photo;

    private boolean isAvailable;
}
