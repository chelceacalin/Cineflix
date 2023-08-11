package ro.esolutions.cineflix.IT;

import org.junit.ClassRule;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.CineflixApplication;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.controllers.UserRoleManagementController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.wrapper.UserPageWrapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CineflixApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRoleManagementControllerTestIT{


    @Autowired
    UserRoleManagementController userRoleManagementController;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("Test filter data all users")
    @SqlGroup({
            @Sql(value = "/sql/clean_up_users.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_users.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getFilteredUsers(){
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
            @Sql(value = "/sql/clean_up_users.sql", executionPhase = BEFORE_TEST_METHOD),
            @Sql(value = "/sql/insert_users.sql", executionPhase = BEFORE_TEST_METHOD)
    })
    public void getFilteredSpecificUser(){
        UserFilterDTO dtoFilterSpecificUser = UserFilterDTO.builder()
                .firstName("anca")
                .lastName("lautarescu")
                .email("anca.lautarescu@esolutions.ro")
                .role(UserCineflix.Role.ADMIN)
                .build();
        String url="/users" + dtoFilterSpecificUser .toString();
        ResponseEntity<UserPageWrapper> result = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<UserPageWrapper>() {});
        assertEquals(OK, result.getStatusCode());
        assertEquals(1, result.getBody().getContent().size());
    }


}
