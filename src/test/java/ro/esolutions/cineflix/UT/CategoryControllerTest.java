package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.services.CategoryService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {

    @Mock
    CategoryService categoryService;

    @InjectMocks
    CategoryController categoryController;

    @Test
    @DisplayName("Delete Category Without Exception Thrown Controller UT")
    public void deleteCategoryWithoutExceptionThrown() throws CategoryNotFoundException {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        ResponseEntity<?> deletedUser = categoryController.deleteCategory(id);
        verify(categoryService, times(1)).deleteCategory(id);
        assertEquals(HttpStatus.OK, deletedUser.getStatusCode());
    }

    @Test
    @DisplayName("Delete Category With Exception Thrown Controller UT")
    public void deleteCategoryWithExceptionThrown() throws CategoryNotFoundException {
        UUID id = UUID.fromString("12f310ee-3cc9-11ee-be56-0242ac120002");
        doThrow(CategoryNotFoundException.class).when(categoryService).deleteCategory(id);
        ResponseEntity<?> response = categoryController.deleteCategory(id);
        verify(categoryService, times(1)).deleteCategory(id);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
