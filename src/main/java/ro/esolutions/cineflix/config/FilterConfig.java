package ro.esolutions.cineflix.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> usersFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(new HashSet<>(Arrays.asList("email", "role", "firstName", "lastName",
                "pageNo", "pageSize", "sortField", "direction","username"))));

        registrationBean.addUrlPatterns("/users");
        return registrationBean;
    }
    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> moviesFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(new HashSet<>(Arrays.asList("title", "director", "category", "isAvailable",
                "rentedBy", "owner_username", "rentedDate", "rentedUntil", "direction", "sortField", "pageNo", "pageSize"))));
        registrationBean.addUrlPatterns("/movies");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> categoriesFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(new HashSet<>(Arrays.asList("name", "pageNo", "pageSize", "direction"))));
        registrationBean.addUrlPatterns("/categories");
        return registrationBean;
    }

}
