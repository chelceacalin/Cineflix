package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
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
    @NonNull
    private final CategoryRepository categoryRepository;

    public Optional<String> validateUpdate(CategoryDTO categoryDTO) {
        if (categoryDTO.getName().isEmpty()) {
            return Optional.of("You must add a name for the category, it cannot be empty");
        }
        Category nameCategory = categoryRepository.findByNameIgnoreCase(categoryDTO.getName());
        if (nameCategory != null) {
            return Optional.of("This category already exists");
        }
        return Optional.empty();
    }


    public Category createCategory(final CategoryDTO categoryDTO) {
        Category categoryToBeSaved = Category.builder()
                .name(categoryDTO.getName())
                .isAvailable(true)
                .build();
        Category categorySaved = categoryRepository.save(categoryToBeSaved);
        return categorySaved;
    }
}
