package ro.esolutions.cineflix.controllers;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.DTO.CategoryFilterDTO;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.services.CategoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO categoryDTO,
                                            @PathVariable("id") @NotNull UUID id) {
        Optional<String> errorOptional = categoryService.validateUpdate(categoryDTO);
        if (errorOptional.isEmpty()) {
            try {
                return new ResponseEntity<>(categoryService.updateCategory(categoryDTO, id), HttpStatus.OK);
            } catch (CategoryNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(errorOptional.get(), HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping()
    public Page<CategoryDTO> getCategories(@ModelAttribute CategoryFilterDTO dto,
                                  @RequestParam(defaultValue = "0",required = false) int pageNo,
                                  @RequestParam(defaultValue = "15",required = false) int pageSize) {
        return categoryService.getCategories(dto,pageNo,pageSize);
    }
}
