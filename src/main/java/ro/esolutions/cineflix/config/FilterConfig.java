package ro.esolutions.cineflix.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class FilterConfig {
    private static final Set<String> USER_PARAMS = new HashSet<>(Arrays.asList("email", "role", "firstName", "lastName",
            "pageNo", "pageSize", "sortField", "direction", "username"));

    private static final Set<String> MOVIE_PARAMS = new HashSet<>(Arrays.asList("title", "director", "category", "isAvailable",
            "rentedBy", "owner_username", "rentedDate", "rentedUntil", "direction", "sortField", "pageNo", "pageSize"));

    public static final Set<String> CATEGORY_PARAMS = new HashSet<>(Arrays.asList("name", "pageNo", "pageSize", "direction"));

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> usersFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(USER_PARAMS));
        registrationBean.addUrlPatterns("/users");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> moviesFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(MOVIE_PARAMS));
        registrationBean.addUrlPatterns("/movies");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> categoriesFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(CATEGORY_PARAMS));
        registrationBean.addUrlPatterns("/categories");
        return registrationBean;
    }

}
