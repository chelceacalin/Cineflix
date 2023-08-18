package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieImageData;
import ro.esolutions.cineflix.repositories.MovieImageDataRepository;
import ro.esolutions.cineflix.util.MovieImageDataUtil;

import java.util.*;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieImageDataService {

    @NonNull
    private MovieImageDataRepository movieImageDataRepository;
    @NonNull
    private MovieImageDataUtil movieImageDataUtil;
    @NonNull
    private MovieService movieService;
    private final static Set<String> allowedFormats = new HashSet<>(List.of("image/png", "image/jpeg", "image/jpg"));

    @Transactional
    public void deleteExistingImage(UUID movieID) {
        Optional<MovieImageData> checkExistingMovieImageData = movieImageDataRepository.findMovieImageDataByMovieId(movieID);
        checkExistingMovieImageData.ifPresent(movieImageData -> movieImageDataRepository.deleteById(movieImageData.getId()));
    }

    @Transactional
    public void uploadImage(MultipartFile file, UUID movieID) throws Exception {
        if (nonNull(movieID)) {
            deleteExistingImage(movieID);
        }

        if (isNull(file)) {
            throw new Exception("You have to introduce a file");
        }

        if (!allowedFormats.contains(file.getContentType())) {
            throw new Exception("File type not allowed");
        }


        Optional<Movie> movieOptional = movieService.findById(movieID);
        boolean shouldUploadImage = movieImageDataRepository.findMovieImageDataByMovieId(movieID).isEmpty() && movieOptional.isPresent();
        if (shouldUploadImage) {
            Movie movie = movieOptional.get();
            MovieImageData data = movieImageDataRepository.save(
                    MovieImageData.builder()
                            .name(file.getOriginalFilename())
                            .type(file.getContentType())
                            .imageData(movieImageDataUtil.compressImage(file.getBytes()))
                            .movie(movie)
                            .build());
            movieOptional.get().setPhoto(data);
            movieService.updateMovie(movie.getId(), movie);
        } else {
            throw new Exception("Error uploading image");
        }
    }


    public byte[] downloadImage(String fileName) throws Exception {
        Optional<MovieImageData> data = movieImageDataRepository.findImageDataByName(fileName);
        byte[] bytes;
        if (data.isPresent()) {
            MovieImageData imageData = data.get();
            bytes = movieImageDataUtil.decompressImage(imageData.getImageData());
        } else {
            throw new Exception("The image you are trying to download does not exist");
        }

        return bytes;
    }

    public byte[] findImageByMovieID(UUID id) throws Exception {
        Optional<MovieImageData> data = movieImageDataRepository.findMovieImageDataByMovieId(id);
        if (data.isPresent()) {
            MovieImageData imageData = data.get();
            return movieImageDataUtil.decompressImage(imageData.getImageData());
        } else {
            throw new Exception("Image not found");
        }
    }

}
