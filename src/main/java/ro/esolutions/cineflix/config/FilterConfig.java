package ro.esolutions.cineflix.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> parameterNameValidationFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter(new HashSet<>(Arrays.asList("email", "role", "firstName", "lastName",
                "pageNo", "pageSize", "sortField", "direction"))));

        registrationBean.addUrlPatterns("/users");
        return registrationBean;
    }





}
