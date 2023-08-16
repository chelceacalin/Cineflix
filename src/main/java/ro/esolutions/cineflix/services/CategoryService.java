package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.repositories.CategoryRepository;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

//    public Category updateCategory(CategoryDTO categoryDTO, String name){
//        Category category=null;
//        Optional<Category> existsCategory=categoryRepository.findByNameIgnoreCase()
//    }
}
