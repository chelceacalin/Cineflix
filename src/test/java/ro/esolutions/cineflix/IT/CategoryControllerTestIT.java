package ro.esolutions.cineflix.IT;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.ClassRule;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.config.CommonPostgresqlContainer;
import ro.esolutions.cineflix.config.SecurityConfig;
import ro.esolutions.cineflix.config.TestSecurityConfig;
import ro.esolutions.cineflix.controllers.CategoryController;
import ro.esolutions.cineflix.controllers.UserRoleManagementController;
import ro.esolutions.cineflix.repositories.CategoryRepository;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.services.CategoryService;
import ro.esolutions.cineflix.services.UserCineflixService;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

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
    @MockBean
    private SecurityConfig securityConfig;
    @Autowired
    CategoryService categoryService;




}
