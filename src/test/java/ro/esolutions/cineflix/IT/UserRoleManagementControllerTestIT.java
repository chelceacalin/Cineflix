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
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.config.CommonPostgresqlContainer;
import ro.esolutions.cineflix.config.SecurityConfig;
import ro.esolutions.cineflix.config.TestSecurityConfig;
import ro.esolutions.cineflix.controllers.UserRoleManagementController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.services.UserCineflixService;
import ro.esolutions.cineflix.wrapper.UserPageWrapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

@RunWith(SpringRunner.class)

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(TestSecurityConfig.class)

public class UserRoleManagementControllerTestIT {

    @ClassRule
    public static PostgreSQLContainer<CommonPostgresqlContainer> postgreSQLContainer = CommonPostgresqlContainer.getInstance();

    @Autowired
    UserRoleManagementController userRoleManagementController;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    UserCineflixRepository userCineflixRepository;
    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;
    @MockBean
    private SecurityConfig securityConfig;
    @Autowired
    UserCineflixService userCineflixService;

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
       ResponseEntity<UserCineflix> userCineflixResponseEntity = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(userDTO), new ParameterizedTypeReference<>(){});
       assertEquals(UserCineflix.Role.ADMIN, userCineflixResponseEntity.getBody().getRole());
       assertEquals(HttpStatus.OK,userCineflixResponseEntity.getStatusCode());
    }
    @Test
    @DisplayName("Test filter data all users")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })

    @WithMockUser(username="admin",roles="admin")
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
    @Test
    @DisplayName("Test filter data get non existing user")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getNonExistingUser(){
        UserFilterDTO dtoNonExistingUser = UserFilterDTO.builder()
                .firstName("z")
                .lastName("z")
                .email("z")
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoNonExistingUser .toString();
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertEquals(0, result.getBody().getContent().size());
    }

    public String missingLastLetterFromField(String field){
        return field.substring(0, field.length() - 1);
    }
    @Test
    @DisplayName("Test filter data get existing users but with wrong Query String for firstName")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersUsingWrongQueryStringFirstName(){
        String url="/users" + "?" + missingLastLetterFromField("firstName") + "=" + "e";
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data get existing users but with wrong Query String for lastName")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersUsingWrongQueryStringLastName(){
        String url="/users" + "?" + missingLastLetterFromField("lastName") + "=" + "e";
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data get existing users but with wrong Query String for email")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersUsingWrongQueryStringEmail(){
        String url="/users" + "?" + missingLastLetterFromField("email") + "=" + "e";
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data get existing users but with wrong Query String for role")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersUsingWrongQueryStringRole(){
        String url="/users" + "?" + missingLastLetterFromField("role") + "=" + "e";
        ResponseEntity<?> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }

    public String createWrongQueryString(){
        return "";
    }
    @Test
    @DisplayName("Test filter data: get existing users with Query String formed with all parameters valid except firstName")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersFilteredWithAllTheFieldsValidExceptFirstName(){
        UserFilterDTO dtoFilteredUser = UserFilterDTO.builder()
                .lastName("e")
                .email("e")
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoFilteredUser.toString() + missingLastLetterFromField("firstName") + "=" + "e";
        ResponseEntity<?> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data: get existing users with Query String formed with all parameters valid except lastName")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersFilteredWithAllTheFieldsValidExceptLastName(){
        UserFilterDTO dtoFilteredUser = UserFilterDTO.builder()
                .firstName("e")
                .email("e")
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoFilteredUser.toString() + missingLastLetterFromField("lastName") + "=" + "e";
        ResponseEntity<?> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data: get existing users with Query String formed with all parameters valid except email")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersFilteredWithAllTheFieldsValidExceptEmail(){
        UserFilterDTO dtoFilteredUser = UserFilterDTO.builder()
                .firstName("e")
                .lastName("e")
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoFilteredUser.toString() + missingLastLetterFromField("email") + "=" + "e";
        ResponseEntity<?> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data: get existing users with Query String formed with all parameters valid except role")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersFilteredWithAllTheFieldsValidExceptRole(){
        UserFilterDTO dtoFilteredUser = UserFilterDTO.builder()
                .firstName("e")
                .lastName("e")
                .email("e")
                .build();
        String url="/users" + dtoFilteredUser.toString() + missingLastLetterFromField("role") + "=" + UserCineflix.Role.USER;
        ResponseEntity<?> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertNull(result.getBody());
    }
    @Test
    @DisplayName("Test filter data: get all users with role USER")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_user.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_user.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getUsersFilteredWithRoleUser(){
        UserFilterDTO dtoFilteredUser = UserFilterDTO.builder()
                .role(UserCineflix.Role.USER)
                .build();
        String url="/users" + dtoFilteredUser.toString();
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        assertEquals(OK, result.getStatusCode());
        assertEquals(1, result.getBody().getContent().size());
    }
}
