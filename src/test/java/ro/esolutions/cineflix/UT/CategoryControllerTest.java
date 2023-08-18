package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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

@ExtendWith(MockitoExtension.class)
public class CategoryControllerTest {

    @Mock
    CategoryService categoryService;

    @InjectMocks
    CategoryController categoryController;

    @Test
    @DisplayName("Create category")
    public void createCategory() {
        Category category = aCategory();
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.empty());
        when(categoryService.createCategory(categoryDTO)).thenReturn(category);
        ResponseEntity response = categoryController.createCategory(categoryDTO);
        verify(categoryService,times(1)).createCategory(categoryDTO);
        assertEquals(ResponseEntity.ok(category),response);
    }

    @Test
    @DisplayName("Thrown exception when category already exists or is null")
    public void thrownExceptionWhenCategoryAlreadyExistsOrIsNull() {
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.of("Error"));
        ResponseEntity response = categoryController.createCategory(categoryDTO);
        verify(categoryService,times(0)).createCategory(categoryDTO);
        assertEquals(new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST),response);
    }

    @Test
    @DisplayName("Update category")
    public void updateCategory() throws CategoryNotFoundException {
        Category category = aCategory();
        CategoryDTO categoryDTO = aCategoryDTO();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.empty());
        when(categoryService.updateCategory(categoryDTO,category.getId())).thenReturn(category);
        ResponseEntity response = categoryController.updateCategory(categoryDTO,category.getId());
        verify(categoryService,times(1)).updateCategory(categoryDTO,category.getId());
        assertEquals(ResponseEntity.ok(category),response);
    }
    @Test
    @DisplayName("Thrown exception when updating a that category already exists or is null")
    public void thrownExceptionWhenUpdatingACategoryThatAlreadyExistsOrIsNull() throws CategoryNotFoundException {
        CategoryDTO categoryDTO = aCategoryDTO();
        Category category = aCategory();
        when(categoryService.validateCategory(categoryDTO)).thenReturn(Optional.of("Error"));
        ResponseEntity response = categoryController.updateCategory(categoryDTO,category.getId());
        verify(categoryService,times(0)).updateCategory(categoryDTO,category.getId());
        assertEquals(new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST),response);
       }
}
