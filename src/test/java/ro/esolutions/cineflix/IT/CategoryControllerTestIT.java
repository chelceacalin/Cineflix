package ro.esolutions.cineflix.IT;

import org.junit.ClassRule;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.config.CommonPostgresqlContainer;
import ro.esolutions.cineflix.config.SecurityConfig;
import ro.esolutions.cineflix.config.TestSecurityConfig;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.services.CategoryService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

@RunWith(SpringRunner.class)

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(TestSecurityConfig.class)
public class CategoryControllerTestIT {

    @ClassRule
    public static PostgreSQLContainer<CommonPostgresqlContainer> postgreSQLContainer = CommonPostgresqlContainer.getInstance();

    @Autowired
    CategoryController categoryController;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @MockBean
    private SecurityConfig securityConfig;

    @Test
    @DisplayName("Create category")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_category.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_category.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/clean_up_category.sql", executionPhase = AFTER_TEST_METHOD)
    })
    public void createCategory() {
        String url = "/category/create";
        CategoryDTO categoryDTO = CategoryDTO.builder()
                .name("Drama")
                .build();
        ResponseEntity<?> categoryResponseEntity = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(categoryDTO), new ParameterizedTypeReference<>() {
        });
        assertEquals(HttpStatus.OK, categoryResponseEntity.getStatusCode());
        assertTrue(categoryRepository.findByNameIgnoreCase(categoryDTO.getName()).isPresent());
        assertEquals(categoryRepository.findByNameIgnoreCase(categoryDTO.getName()).get().getName(), categoryDTO.getName());
        assertEquals(categoryRepository.findAll().size(), 2);
    }
}
