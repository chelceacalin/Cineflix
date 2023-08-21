package ro.esolutions.cineflix.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.client.RestTemplate;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;


import java.util.HashSet;
import java.util.Set;


@RequiredArgsConstructor
@Configuration
@EnableWebSecurity

public class TestSecurityConfig  {
    private final ClientRegistrationRepository clientRegistrationRepository;
    private final UserCineflixService userCineflixService;

    @Bean
    public SecurityFilterChain securityTestFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(registry -> registry
                        .requestMatchers("/**").permitAll()

                ).csrf(csrf -> csrf.disable());

        return httpSecurity.build();
    }
}
