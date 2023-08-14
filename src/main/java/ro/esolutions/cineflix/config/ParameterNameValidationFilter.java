package ro.esolutions.cineflix.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Filter;
import java.util.logging.LogRecord;

public class ParameterNameValidationFilter implements Filter, jakarta.servlet.Filter {

    private final Set<String> allowedParameterNames;

    public ParameterNameValidationFilter(Set<String> allowedParameterNames) {
        this.allowedParameterNames = allowedParameterNames;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String[] parameterNames = request.getParameterMap().keySet().toArray(new String[0]);
        for (String paramName : parameterNames) {
            if (!allowedParameterNames.contains(paramName)) {
                return;
            }
        }
        chain.doFilter(request, response);
    }

    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void destroy() {
    }

    @Override
    public boolean isLoggable(LogRecord record) {
        return false;
    }
}
