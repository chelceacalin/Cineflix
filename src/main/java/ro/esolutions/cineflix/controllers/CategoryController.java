package ro.esolutions.cineflix.controllers;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.exceptions.CategoryAlreadyExistsException;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.exceptions.EmptyCategoryNameField;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;


    @PutMapping("/update/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO categoryDTO,
                                            @PathVariable("id") @NotNull UUID id) {
        try {
            categoryService.validateUpdate(categoryDTO, id);
            return new ResponseEntity<>(categoryService.updateCategory(categoryDTO, id), HttpStatus.OK);
        } catch (CategoryAlreadyExistsException e) {
            return new ResponseEntity<>("This category already exists", HttpStatus.CONFLICT);
        } catch (EmptyCategoryNameField e) {
            return new ResponseEntity<>("You must add a name for the category, it cannot be empty", HttpStatus.BAD_REQUEST);
        } catch (CategoryNotFoundException e) {
            return new ResponseEntity<>("Category to be edited does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
