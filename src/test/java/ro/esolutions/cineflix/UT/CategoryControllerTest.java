package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategory;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategoryDTO;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.services.CategoryService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {

    @Mock
    CategoryService categoryService;

    @InjectMocks
    CategoryController categoryController;

    @Test
    @DisplayName("Delete Category Without Exception Thrown Controller UT")
    public void deleteCategoryWithoutExceptionThrown() throws CategoryNotFoundException {
        String name = "Drama";
        ResponseEntity<?> deletedUser = categoryController.deleteCategory(name);
        verify(categoryService, times(1)).deleteCategory(name);
        assertEquals(HttpStatus.OK, deletedUser.getStatusCode());
    }

    @Test
    @DisplayName("Delete Category With Exception Thrown Controller UT")
    public void deleteCategoryWithExceptionThrown() throws CategoryNotFoundException {
        String name = "Drama";
        doThrow(CategoryNotFoundException.class).when(categoryService).deleteCategory(name);
        ResponseEntity<?> response = categoryController.deleteCategory(name);
        verify(categoryService, times(1)).deleteCategory(name);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    @DisplayName("Update category controller test UT")
    public void updateCategory() throws CategoryNotFoundException {
        Category category = aCategory();
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.empty());
        when(categoryService.updateCategory(categoryDTO,category.getId())).thenReturn(category);
        ResponseEntity<?> response = categoryController.updateCategory(categoryDTO,category.getId());
        verify(categoryService,times(1)).updateCategory(categoryDTO,category.getId());
        assertEquals(ResponseEntity.ok(category),response);
    }
    @Test
    @DisplayName("Update category exception controller test UT")
    public void updateCategoryException() throws CategoryNotFoundException {
        CategoryDTO categoryDTO = aCategoryDTO();
        Category category = aCategory();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.of("Error"));
        ResponseEntity<?> response = categoryController.updateCategory(categoryDTO,category.getId());
        verify(categoryService,times(0)).updateCategory(categoryDTO,category.getId());
        assertEquals(new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST),response);
    }


}
