package ro.esolutions.cineflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.esolutions.cineflix.entities.Category;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
