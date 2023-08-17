package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.repositories.CategoryRepository;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    @NonNull
    private final CategoryRepository categoryRepository;

    public Optional<String> validateCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getName().isEmpty()) {
            return Optional.of("You must add a name for the category, it cannot be empty");
        }
        Category nameCategory = categoryRepository.findByNameIgnoreCase(categoryDTO.getName());
        if (nameCategory != null) {
            return Optional.of("This category already exists");
        }
        return Optional.empty();
    }

    public Category updateCategory(CategoryDTO categoryDTO, UUID id) throws CategoryNotFoundException {
        Optional<Category> existsCategory = categoryRepository.findById(id);
        if (existsCategory.isEmpty()) {
            throw new CategoryNotFoundException("Category to be edited does not exist");
        }
        Category toUpdateCategory = existsCategory.get();
        toUpdateCategory.setName(categoryDTO.getName());
        return categoryRepository.save(toUpdateCategory);

    }

    public Category ScreateCategory(final CategoryDTO categoryDTO) {
        Category categoryToBeSaved = Category.builder()
                .name(categoryDTO.getName())
                .isAvailable(true)
                .build();
        return categoryRepository.save(categoryToBeSaved);
    }
}
