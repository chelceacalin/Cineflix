package ro.esolutions.cineflix.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<ParameterNameValidationFilter> parameterNameValidationFilter() {
        FilterRegistrationBean<ParameterNameValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ParameterNameValidationFilter());
        registrationBean.addUrlPatterns("/users");
        return registrationBean;
    }
}
