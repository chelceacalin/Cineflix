package ro.esolutions.cineflix.services;

import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.repositories.CategoryRepository;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;


    public void createCategory(final CategoryDTO categoryDTO) {
        if(categoryDTO.getName().isEmpty()) {
            throw new IllegalArgumentException("You must add a name for the category, it cannot be empty.");
        }
       if(categoryRepository.findByNameIgnoreCase(categoryDTO.getName()).isPresent()) {
           throw new IllegalArgumentException("This category already exists.");
       }

        Category categoryToBeSaved = Category.builder()
                .name(categoryDTO.getName())
                .isAvailable(true)
                .build();
        categoryRepository.save(categoryToBeSaved);
    }
}
