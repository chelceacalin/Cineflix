package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.mapper.CategoryMapper;
import ro.esolutions.cineflix.services.CategoryService;
import ro.esolutions.cineflix.util.CategoryGenerator;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategory;
import static ro.esolutions.cineflix.util.CategoryGenerator.aCategoryDTO;

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {

    @Mock
    CategoryService categoryService;

    @InjectMocks
    CategoryController categoryController;

    @Test
    @DisplayName("Create category controller test UT")
    public void createCategory() {
        Category category = aCategory();
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.empty());
        when(categoryService.createCategory(categoryDTO)).thenReturn(category);
        ResponseEntity<?> response = categoryController.createCategory(categoryDTO);
        verify(categoryService,times(1)).createCategory(categoryDTO);
        assertEquals(ResponseEntity.ok(category),response);
    }

    @Test
    @DisplayName("Create category exception controller test UT")
    public void createCategoryException() {
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.of("Error"));
        ResponseEntity<?> response = categoryController.createCategory(categoryDTO);
        verify(categoryService,times(0)).createCategory(categoryDTO);
        assertEquals(new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST),response);

    }


}
