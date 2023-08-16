package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.exceptions.CategoryAlreadyExistsException;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.exceptions.EmptyCategoryNameField;
import ro.esolutions.cineflix.repositories.CategoryRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Optional<String> validateUpdate(CategoryDTO categoryDTO, UUID id) throws EmptyCategoryNameField,
            CategoryAlreadyExistsException {
        if (categoryDTO.getName().isEmpty()) {
            throw new EmptyCategoryNameField("You must add a name for the category, it cannot be empty");
        }
        Category nameCategory = categoryRepository.findByNameIgnoreCase(categoryDTO.getName());
        if (nameCategory != null) {
            throw new CategoryAlreadyExistsException("This category already exists");
        }
        return Optional.empty();
    }

    public Category updateCategory(CategoryDTO categoryDTO, UUID id) throws CategoryNotFoundException {
        Category category;
        Optional<Category> existsCategory = categoryRepository.findById(id);
        if (existsCategory.isEmpty()) {
            throw new CategoryNotFoundException("Category to be edited does not exist");
        } else {
            Category toUpdateCategory = existsCategory.get();
            toUpdateCategory.setName(categoryDTO.getName());
            categoryRepository.save(toUpdateCategory);
            category = toUpdateCategory;
        }
        return category;
    }
}
