package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.DTO.Category.CategoryFilterDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.exceptions.CategoryContainsMovieException;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.mapper.CategoryMapper;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.specification.CategorySpecification;

import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.nonNull;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {

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

    public Category createCategory(final CategoryDTO categoryDTO) {
        Category categoryToBeSaved = Category.builder()
                .name(categoryDTO.getName())
                .isAvailable(true)
                .build();
        return categoryRepository.save(categoryToBeSaved);
    }

    public Page<CategoryDTO> getCategories(CategoryFilterDTO dto, int pageNo, int pageSize) {
        if (dto.getName() == null && dto.getDirection() == null) {
            return categoryRepository.findAll(PageRequest.of(pageNo, pageSize)).map(CategoryMapper::toDTO);
        }
        Specification<Category> specification = getSpecification(dto);
        Sort.Direction sortDirection = Sort.Direction.fromString(dto.getDirection());
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, "name"));
        return categoryRepository.findAll(specification, pageable).map(CategoryMapper::toDTO);
    }

    public <T> Specification<T> getSpecification(CategoryFilterDTO dto) {
        Specification<T> specification = Specification.where(null);

        if (nonNull(dto.getName())) {
            specification = specification.and(CategorySpecification.getCategoryLike(dto.getName(), "name"));
        }
        return specification;
    }


    public void deleteCategory(UUID id) {
        Category categoryFound = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category to be deleted does not exist"));

        categoryFound.getMovieList().stream()
                .findAny()
                .ifPresent(movie -> {
                    throw new CategoryContainsMovieException("Found a movie, can not delete the category");
                });
    }
}
