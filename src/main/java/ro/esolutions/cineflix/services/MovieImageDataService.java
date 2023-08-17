package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieImageData;
import ro.esolutions.cineflix.repositories.MovieImageDataRepository;
import ro.esolutions.cineflix.util.MovieImageDataUtil;

import java.util.*;

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

    public String uploadImage(MultipartFile file, UUID movieID) throws Exception {
        Set<String> contentTypes = new HashSet<>(List.of("image/jpeg", "image/jpg", "image/png"));
        if (file == null) {
            return "You haven't selected a file";
        }
        if (!contentTypes.contains(file.getContentType())) {
            return "Content type is invalid";
        }

        Optional<MovieImageData> checkExisting = movieImageDataRepository.findMovieImageDataByMovieId(movieID);
        checkExisting.ifPresent(movieImageData -> movieImageDataRepository.deleteById(movieImageData.getId()));

        Optional<Movie> movieOptional = movieService.findById(movieID);
        MovieImageData data = null;

        if (movieOptional.isPresent()) {
            data = movieOptional.get().getPhoto();

            data = movieImageDataRepository.save(MovieImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(movieImageDataUtil.compressImage(file.getBytes()))
                    .movie(movieOptional.get())
                    .build());


            movieOptional.get().setPhoto(data);
            movieService.updateMovie(movieOptional.get().getId(), movieOptional.get());
        } else {
            data = movieImageDataRepository.save(MovieImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(movieImageDataUtil.compressImage(file.getBytes()))
                    .build());
        }

        if (data != null) {
            return "File uploaded successfully " + file.getOriginalFilename();
        } else {
            return "Eroare la încărcarea fișierului " + file.getOriginalFilename();
        }
    }


    public byte[] downloadImage(String fileName) {
        Optional<MovieImageData> data = movieImageDataRepository.findImageDataByName(fileName);
        byte[] bytes;
        if (data.isPresent()) {
            bytes = movieImageDataUtil.decompressImage(data.get().getImageData());
        } else throw new UsernameNotFoundException("The image you are trying to download does not exist");

        return bytes;
    }

    public byte[] findImageByMovieID(UUID id) {
        Optional<MovieImageData> data = movieImageDataRepository.findMovieImageDataByMovieId(id);
        if (data.isPresent()) {
            return movieImageDataUtil.decompressImage(data.get().getImageData());
        } else {
            throw new UsernameNotFoundException("Image not found");
        }
    }

}
