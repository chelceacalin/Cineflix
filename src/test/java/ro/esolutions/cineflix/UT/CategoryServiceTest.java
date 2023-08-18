package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.services.CategoryService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategoryDTO;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;

    @Test()
    @DisplayName("Delete Category With Exception Thrown Service UT")
    public void deleteCategoryWithExceptionThrown() {
        String name = "Horror";
        when(categoryRepository.findByName(name))
                .thenReturn(Optional.empty());
        assertThrows(CategoryNotFoundException.class, () -> categoryService.deleteCategory(
                name));
    }

    @Test
    @DisplayName("Delete Category Without Exception Thrown Service UT")
    public void deleteCategoryWithoutExceptionThrown() throws CategoryNotFoundException {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        Category categoryToBeDeleted = Category.builder()
                .id(id)
                .name("Drama")
                .build();

        when(categoryRepository.findByName("Drama")).thenReturn(Optional.of(categoryToBeDeleted));
        categoryService.deleteCategory(categoryToBeDeleted.getName());

        verify(categoryRepository, times(1)).findByName("Drama");
        verify(categoryRepository, times(1)).deleteById(id);
    }


    @DisplayName("Update Category With Exception Thrown Service UT")
    public void deleteCategoryWithExceptionThrown() {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryRepository.findById(id))
                .thenReturn(Optional.empty());
        assertThrows(CategoryNotFoundException.class, () -> categoryService.updateCategory(categoryDTO,
                id));
    }

    @Test
    public void testUpdateCategorySuccess() throws CategoryNotFoundException {
        UUID categoryId = UUID.randomUUID();
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Updated Category Name");

        Category existingCategory = new Category();
        existingCategory.setId(categoryId);
        existingCategory.setName("Original Category Name");

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(any(Category.class))).thenReturn(existingCategory);

        Category updatedCategory = categoryService.updateCategory(categoryDTO, categoryId);

        verify(categoryRepository, times(1)).findById(categoryId);
        verify(categoryRepository, times(1)).save(existingCategory);
        assertEquals(categoryDTO.getName(), updatedCategory.getName());
    }

    @Test
    public void testValidateCategorySuccess() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("New Category Name");

        when(categoryRepository.findByNameIgnoreCase(categoryDTO.getName())).thenReturn(null);

        Optional<String> validationResult = categoryService.validateCategory(categoryDTO);

        verify(categoryRepository, times(1)).findByNameIgnoreCase(categoryDTO.getName());
        assertFalse(validationResult.isPresent()); // Expecting an empty Optional
    }

    @Test
    public void testValidateCategoryFailureDuplicateName() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Existing Category");

        Category existingCategory = new Category();
        existingCategory.setName("Existing Category");

        when(categoryRepository.findByNameIgnoreCase(categoryDTO.getName())).thenReturn(existingCategory);

        Optional<String> validationResult = categoryService.validateCategory(categoryDTO);

        assertTrue(validationResult.isPresent());
        assertEquals("This category already exists", validationResult.get());
    }

    @Test
    public void testValidateCategoryFailureEmptyName() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("");

        Optional<String> validationResult = categoryService.validateCategory(categoryDTO);

        assertTrue(validationResult.isPresent());
        assertEquals("You must add a name for the category, it cannot be empty", validationResult.get());
    }



}
