package ro.esolutions.cineflix.config;

import org.testcontainers.containers.PostgreSQLContainer;

//testcontainers config to generate only one
//docker container with postgres db for all integration tests
public class CommonPostgresqlContainer extends PostgreSQLContainer<CommonPostgresqlContainer> {
    private static final String IMAGE_VERSION = "postgres:15.3";
    private static CommonPostgresqlContainer container;

    private CommonPostgresqlContainer() {
        super(IMAGE_VERSION);
    }

    public static CommonPostgresqlContainer getInstance() {
        if (container == null) {
            container = new CommonPostgresqlContainer()
                    .withDatabaseName("cineflix")
                    .withUsername("cineflix")
                    .withPassword("cineflix")
                    .withExposedPorts(5433);
        }
        return container;
    }

    @Override
    public void start() {
        super.start();
    }

    @Override
    public void stop() {
        container.stop();
    }
}
