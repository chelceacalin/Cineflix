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

    private String title;

    private String director;

    private String description;

    @Column(name = "is_available")
    private boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private Category category;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private UserCineflix owner;

    @OneToOne(mappedBy = "movie")
    @JsonIgnore
    private MovieImageData photo;

    @OneToMany(mappedBy = "movie")
    List<MovieHistory> movieHistories;

}