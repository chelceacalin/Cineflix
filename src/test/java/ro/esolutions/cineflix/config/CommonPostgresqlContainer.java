package ro.esolutions.cineflix.config;

import org.testcontainers.containers.PostgreSQLContainer;

public class CommonPostgresqlContainer extends PostgreSQLContainer<CommonPostgresqlContainer> {
    private static final String IMAGE_VERSION = "postgres:15.3";
    private static CommonPostgresqlContainer container;

    private CommonPostgresqlContainer() {
        super(IMAGE_VERSION);
    }

    public static CommonPostgresqlContainer getInstance() {
        if (container == null) {
            container = new CommonPostgresqlContainer()
                    .withDatabaseName("testcineflixdb")
                    .withUsername("testcineflixdb")
                    .withPassword("testcineflixdb");
        }
        return container;
    }

    @Override
    public void start() {
        super.start();
    }

    @Override
    public void stop() {

    }
}