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
}
