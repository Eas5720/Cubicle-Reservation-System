package com.example.demo.controller;

import com.example.demo.domain.Book;
import com.example.demo.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BookController {

    //controller is the entry point

    private final BookService bookService;

    @GetMapping("/hello")
    public String save(){

        return "Hello World";

    }

    // GET "/students/{id}"

    @PostMapping("/books")
    public ResponseEntity<?> save(@RequestBody Book book){
        return new ResponseEntity<>(bookService.create(book), HttpStatus.CREATED);
    }


    @GetMapping("/books")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                bookService.findAll(), HttpStatus.OK);
    }


}
