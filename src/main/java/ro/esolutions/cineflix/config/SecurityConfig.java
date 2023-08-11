// TODO: decomment after security works
//package ro.esolutions.cineflix.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
//import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
////    private final ClientRegistrationRepository clientRegistrationRepository;
//
////    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                .authorizeHttpRequests(registry -> registry
//                        .anyRequest()
//                        .authenticated()
//                )
//                .oauth2Login(oauth2Login -> oauth2Login
//                        .successHandler((request, response, authentication) -> {
//                            response.sendRedirect("http://localhost:3000");
//                        })
//                        .permitAll()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(Customizer.withDefaults())
//                )
//                .logout((logout) -> logout.logoutSuccessHandler(oidcLogoutSuccessHandler()));
//
//        return httpSecurity.build();
//
//    }
//
////    private LogoutSuccessHandler oidcLogoutSuccessHandler() {
////        OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
////                new OidcClientInitiatedLogoutSuccessHandler(this.clientRegistrationRepository);
////
////        oidcLogoutSuccessHandler.setPostLogoutRedirectUri("{baseUrl}");
////
////        return oidcLogoutSuccessHandler;
////    }
//}
