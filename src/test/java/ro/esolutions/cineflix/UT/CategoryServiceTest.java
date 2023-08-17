package ro.esolutions.cineflix.UT;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.jdbc.Sql;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.mapper.CategoryMapper;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;

    @Test
    @DisplayName("Create category test UT")
    @Sql
    public void createCategory() {
        Category category = Category.builder()
                .id(UUID.fromString("cf7c88c8-e767-466e-95a0-ff00bd160d73"))
                .name("Drama")
                .isAvailable(true)
                .build();
        CategoryDTO categoryDTO = CategoryMapper.toDTO(category);

        Category updatedCategory = categoryService.createCategory(categoryDTO);
        assertEquals(category.getName(), updatedCategory.getName());
        verify(categoryRepository,times(1)).save(category);
    }
}
