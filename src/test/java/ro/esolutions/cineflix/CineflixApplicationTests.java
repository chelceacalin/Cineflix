package ro.esolutions.cineflix;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.ClassRule;
import org.testcontainers.containers.PostgreSQLContainer;
import ro.esolutions.cineflix.config.CommonPostgresqlContainer;


@SpringBootTest
class CineflixApplicationTests {

	@ClassRule
	public static PostgreSQLContainer<CommonPostgresqlContainer> postgreSQLContainer = CommonPostgresqlContainer.getInstance();

	@Test
	void contextLoads() {
	}

}
