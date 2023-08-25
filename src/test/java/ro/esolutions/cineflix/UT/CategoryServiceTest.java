package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.exceptions.Category.CategoryContainsMovieException;
import ro.esolutions.cineflix.exceptions.Category.CategoryNotFoundException;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.services.CategoryService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategory;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategoryDTO;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;


    @Test
    @DisplayName("Create category")
    public void createCategory() {
        Category categoryToBeSaved = aCategory();
        categoryToBeSaved.setId(null);
        Category savedCategory = aCategory();
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryRepository.save(categoryToBeSaved)).thenReturn(savedCategory);
        Category result = categoryService.createCategory(categoryDTO);
        assertEquals(savedCategory, result);
    }


    @Test()
    @DisplayName("Thrown exception when deleting a category that doesn't exist")
    public void thrownExceptionWhenDeletingACategoryThatDoesntExist() {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryRepository.findById(id))
                .thenReturn(Optional.empty());
        assertThrows(CategoryNotFoundException.class, () -> categoryService.updateCategory(categoryDTO,
                id));
    }

    @Test()
    @DisplayName("Delete Category With Exception Thrown Service UT")
    public void deleteCategoryWithExceptionThrown() {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        when(categoryRepository.findById(id))
                .thenReturn(Optional.empty());
        assertThrows(CategoryNotFoundException.class, () -> categoryService.deleteCategory(
                id));
    }

    @Test
    @DisplayName("Delete Category")
    public void deleteCategory() throws CategoryNotFoundException {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        Category categoryToBeDeleted = Category.builder()
                .id(id)
                .name("Drama")
                .movieList(new ArrayList<>())
                .build();

        when(categoryRepository.findById(id)).thenReturn(Optional.of(categoryToBeDeleted));
        categoryService.deleteCategory(categoryToBeDeleted.getId());

        verify(categoryRepository, times(1)).findById(id);
        verify(categoryRepository, times(1)).deleteById(id);
    }


    @Test
    @DisplayName("Update category")
    public void updateCategory() throws CategoryNotFoundException {
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

        when(categoryRepository.findByNameIgnoreCase(categoryDTO.getName())).thenReturn(Optional.empty());

        Optional<String> validationResult = categoryService.validateCategoryCaseInsensitive(categoryDTO);

        verify(categoryRepository, times(1)).findByNameIgnoreCase(categoryDTO.getName());
        assertFalse(validationResult.isPresent());
    }

    @Test
    public void testValidateCategoryFailureDuplicateName() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Existing Category");

        Category existingCategory = new Category();
        existingCategory.setName("Existing Category");

        when(categoryRepository.findByNameIgnoreCase(categoryDTO.getName())).thenReturn(Optional.of(existingCategory));

        Optional<String> validationResult = categoryService.validateCategoryCaseInsensitive(categoryDTO);

        assertTrue(validationResult.isPresent());
        assertEquals("This category already exists", validationResult.get());
    }

    @Test
    public void testValidateCategoryFailureEmptyName() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("");

        Optional<String> validationResult = categoryService.validateCategoryCaseSensitive(categoryDTO);

        assertTrue(validationResult.isPresent());
        assertEquals("You must add a name for the category, it cannot be empty", validationResult.get());
    }

    @Test()
    @DisplayName("Delete a category that is assigned to a movie should thrown CategoryContainsMovieException")
    public void deleteCategoryShouldThrownCategoryContainsMovieException(){
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        Category categoryToBeDeleted = Category.builder()
                .id(id)
                .name("Drama")
                .movieList(new ArrayList<>())
                .build();
        List<Movie> listMovies = createListMoviesWithASpecificCategory(categoryToBeDeleted);
        categoryToBeDeleted.setMovieList(listMovies);

        when(categoryRepository.findById(id)).thenReturn(Optional.of(categoryToBeDeleted));

        assertThrows(CategoryContainsMovieException.class, () -> categoryService.deleteCategory(id));
    }

    public List<Movie> createListMoviesWithASpecificCategory(Category category){
        UserCineflix userCineflix = UserCineflix.builder()
                .id("1")
                .firstName("Joe")
                .lastName("Smith")
                .email("joe.smith@test.ro")
                .role(UserCineflix.Role.ADMIN)
                .username("joe.smith")
                .build();
        Movie movie = Movie.builder()
                .title("Harry Potter")
                .category(category)
                .description("Magical movie")
                .director("JKR")
                .owner(userCineflix)
                .build();
        return List.of(movie);
    }

}
