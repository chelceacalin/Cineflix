package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieImageData;
import ro.esolutions.cineflix.repositories.MovieImageDataRepository;
import ro.esolutions.cineflix.util.MovieImageDataUtil;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieImageDataService {

    @NonNull
    private MovieImageDataRepository movieImageDataRepository;
    @NonNull
    private MovieImageDataUtil util;
    @NonNull
    private MovieService movieService;
    public MovieImageData store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        MovieImageData data=
                MovieImageData.builder()
                        .name(fileName)
                        .type(file.getContentType())
                        .imageData(file.getBytes())
                        .build();


        return movieImageDataRepository.save(data);
    }

    public MovieImageData getFile(UUID id) {
        return movieImageDataRepository.findById(id).get();
    }


    public String uploadImage(MultipartFile file,UUID empID) throws Exception {
        Optional<Movie> e1=movieService.findById(empID);
        MovieImageData data;
        if(e1.isPresent()){
            data= movieImageDataRepository.save(MovieImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(util.compressImage(file.getBytes()))
                    .movie(e1.get())
                    .build());
            System.out.println(e1.toString());
            e1.get().setPhoto(data);
            movieService.updateMovie(e1.get().getId(),e1.get());
        }
        else
        {
            data= movieImageDataRepository.save(MovieImageData.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(util.compressImage(file.getBytes()))
                    .build());
        }

        if(!data.equals("")){
            return "File uploaded successfully "+file.getOriginalFilename();
        }
        else
            return null;
    }

    public byte[] downloadImage(String fileName){
        Optional<MovieImageData> data=movieImageDataRepository.findImageDataByName(fileName);
        return data.map(movieImageData -> util.decompressImage(movieImageData.getImageData())).orElse(null);
    }
    public byte[] findImageByMovieID(UUID id) {
        MovieImageData data=movieImageDataRepository.findImageDataByMovieID(id);
        byte[] image=util.decompressImage(data.getImageData());
        return image;
    }

}
