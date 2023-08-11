package ro.esolutions.cineflix.IT;

import org.junit.ClassRule;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.CineflixApplication;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.config.CommonPostgresqlContainer;
import ro.esolutions.cineflix.controllers.UserRoleManagementController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.wrapper.UserPageWrapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CineflixApplication.class, webEnvironment = RANDOM_PORT)
public class UserRoleManagementControllerTestIT {

    @ClassRule
    public static PostgreSQLContainer<CommonPostgresqlContainer> postgreSQLContainer = CommonPostgresqlContainer.getInstance();

    @Autowired
    UserRoleManagementController userRoleManagementController;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    UserCineflixRepository userCineflixRepository;

    @Test
    @DisplayName("Edit user role IT")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = AFTER_TEST_METHOD)
    })
    public void updateUserRole() {
       String url = "/users/update/ADMIN";
       UserDTO userDTO = UserDTO.builder()
               .username("test123")
               .firstName("test")
               .lastName("test")
               .email("test@gmail.com")
               .role(UserCineflix.Role.USER)
               .build();
       ResponseEntity<UserCineflix> userCineflixResponseEntity = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(userDTO), new ParameterizedTypeReference<UserCineflix>(){});
       assertEquals(UserCineflix.Role.ADMIN, userCineflixResponseEntity.getBody().getRole());
       assertEquals(HttpStatus.OK,userCineflixResponseEntity.getStatusCode());
    }
    @Test
    @DisplayName("Test filter data all users")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getAllUsers(){
        UserFilterDTO dtoFilter = UserFilterDTO.builder()
                .build();
        String url="/users" + dtoFilter.toString();
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertEquals(2, result.getBody().getContent().size());

    }
    @Test
    @DisplayName("Test filter data get specific user")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getFilteredSpecificUser(){
        UserFilterDTO dtoFilterSpecificUser = UserFilterDTO.builder()
                .firstName("test")
                .lastName("test")
                .email("test@gmail.com")
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoFilterSpecificUser .toString();
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertEquals(1, result.getBody().getContent().size());
    }

}
