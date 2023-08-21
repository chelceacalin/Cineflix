package ro.esolutions.cineflix.controllers;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.services.CategoryService;

import java.util.Optional;

import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.exceptions.CategoryNotFoundException;

import java.util.UUID;

import org.springframework.data.domain.Page;
import ro.esolutions.cineflix.DTO.Category.CategoryFilterDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity createCategory(@RequestBody final CategoryDTO categoryDTO) {
        Optional<String> errorOptional = categoryService.validateCategory(categoryDTO);
        if (errorOptional.isEmpty()) {
            return new ResponseEntity(categoryService.createCategory(categoryDTO), HttpStatus.OK);
        } else {
            return new ResponseEntity(errorOptional.get(), HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/update/{id}")
    public ResponseEntity updateCategory(@RequestBody CategoryDTO categoryDTO,
                                         @PathVariable("id") @NotNull UUID id) {
        Optional<String> errorOptional = categoryService.validateCategory(categoryDTO);
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

    @PostMapping("/delete/{name}")
    public ResponseEntity<?> deleteCategory(@PathVariable("name") @NotNull String name) {
        categoryService.deleteCategory(name);
        return ResponseEntity.ok("Category was deleted successfully");
    }

    @GetMapping
    public Page<CategoryDTO> getCategories(@ModelAttribute CategoryFilterDTO dto,
                                           @RequestParam(defaultValue = "0", required = false) int pageNo,
                                           @RequestParam(defaultValue = "15", required = false) int pageSize) {
        return categoryService.getCategories(dto, pageNo, pageSize);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category was deleted successfully");
    }

    @GetMapping("/{name}")
    public CategoryDTO findCategoryByName(@PathVariable String name) {
        return categoryService.findCategoryByName(name);
    }
}
