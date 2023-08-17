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

import java.util.Optional;
import java.util.UUID;

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
        if (file == null) return "File is empty";
        Optional<Movie> movieOptional = movieService.findById(movieID);
        MovieImageData data = null;
        if (movieOptional.isPresent()) {
            MovieImageData movieImageData = movieImageDataRepository.findImageDataByMovieID(movieID);
            if (movieImageData != null) {
                if (movieImageData.getName().equals(file.getOriginalFilename())) {
                    return "You cannot add the same image twice";
                } else {
//                    data = movieImageDataRepository.save(MovieImageData.builder()
//                            .name(file.getOriginalFilename())
//                            .type(file.getContentType())
//                            .imageData(movieImageDataUtil.compressImage(file.getBytes()))
//                            .movie(movieOptional.get())
//                            .build());
//                    movieOptional.get().setPhoto(data);
//                    movieService.updateMovie(movieOptional.get().getId(), movieOptional.get());
                }
            }

        } else {
            throw new UsernameNotFoundException("Movie with id " + movieID + " not found");
        }

        if (!data.equals("")) {
            return "File uploaded successfully " + file.getOriginalFilename();
        } else
            return "Error while uploading file " + file.getOriginalFilename();
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
        MovieImageData data = movieImageDataRepository.findImageDataByMovieID(id);
        if (data != null) {
            return movieImageDataUtil.decompressImage(data.getImageData());
        } else {
            throw new UsernameNotFoundException("Image not found");
        }
    }

}
