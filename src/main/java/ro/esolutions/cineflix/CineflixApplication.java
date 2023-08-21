package ro.esolutions.cineflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class CineflixApplication {

	public static void main(String[] args) {

		SpringApplication.run(CineflixApplication.class, args);

	}

}