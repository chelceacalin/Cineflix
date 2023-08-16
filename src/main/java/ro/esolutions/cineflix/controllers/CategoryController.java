package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody final CategoryDTO categoryDTO) {
        Optional<String> errorOptional = categoryService.validateUpdate(categoryDTO);
        if (errorOptional.isEmpty()) {
            return new ResponseEntity<>(categoryService.createCategory(categoryDTO), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(errorOptional.get(), HttpStatus.BAD_REQUEST);
        }

    }
}
