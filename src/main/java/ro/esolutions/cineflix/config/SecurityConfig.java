
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
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final UserCineflixService userCineflixService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(registry -> registry
                        .requestMatchers(HttpMethod.OPTIONS).permitAll()
                        .requestMatchers("/users/").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/users/update/**").hasRole("ADMIN")
                        .requestMatchers("/movies/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable())
                .oauth2Login(oauth2Login -> oauth2Login
                        .userInfoEndpoint(userInfo -> {
                            userInfo.userAuthoritiesMapper(this.userAuthoritiesMapper());
                        })
                        .successHandler((request, response, authentication) -> {
                            response.sendRedirect("http://localhost:3000");
                        })
                        .permitAll()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                )
                .logout((logout) -> logout.logoutSuccessHandler(oidcLogoutSuccessHandler()));

        return httpSecurity.build();

    }

    private GrantedAuthoritiesMapper userAuthoritiesMapper() {
        return (authorities) -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

            authorities.forEach(authority -> {
                if (authority instanceof OidcUserAuthority oidcUserAuthority) {
                    OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();

                    userCineflixService.addUserCineflix(userInfo);
                    UserCineflix.Role role = userCineflixService.getUserRole(userInfo.getClaim("preferred_username"));

                    GrantedAuthority mappedAuthority = switch (role) {
                        case USER -> new SimpleGrantedAuthority("ROLE_USER");
                        case ADMIN -> new SimpleGrantedAuthority("ROLE_ADMIN");
                    };

                    mappedAuthorities.add(mappedAuthority);
                }
            });

            return mappedAuthorities;
        };
    }

    private LogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
                new OidcClientInitiatedLogoutSuccessHandler(this.clientRegistrationRepository);

        oidcLogoutSuccessHandler.setPostLogoutRedirectUri("{baseUrl}");

        return oidcLogoutSuccessHandler;
    }
}
