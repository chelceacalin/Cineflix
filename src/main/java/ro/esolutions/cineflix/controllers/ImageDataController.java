package ro.esolutions.cineflix.controllers;


import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ro.esolutions.cineflix.entities.MovieImageData;
import ro.esolutions.cineflix.services.MovieImageDataService;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ImageDataController {

    @NonNull
    private MovieImageDataService movieImageDataService;

    @PostMapping("/images/{movieID}")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file,
                                         @PathVariable UUID movieID) throws Exception {
        String upload = movieImageDataService.uploadImage(file, movieID);
        return ResponseEntity.ok(upload);
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName) throws IOException {
        byte[] imgData = movieImageDataService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imgData);
    }

    @GetMapping("/imagesByMovieID/{id}")
    public ResponseEntity<?> getImageDataByEmpID(@PathVariable(name = "id") UUID movieID) {
        byte[] imgData = movieImageDataService.findImageByMovieID(movieID);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imgData);
    }
}
