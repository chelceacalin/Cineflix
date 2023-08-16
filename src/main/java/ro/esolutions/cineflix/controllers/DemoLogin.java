// TODO: decomment after security works
//package ro.esolutions.cineflix.controllers;
//
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class DemoLogin {
//
//    //@PreAuthorize("hasRole('admin')")
//    @GetMapping("/admin")
//    public String getAdmin(){
//        SecurityContextHolder.getContext().getAuthentication();
//        return "this is admin";
//    }
//}
