package com.mxpertz.inventory.backend.controller;

import com.mxpertz.inventory.backend.dto.ProductDto;
import com.mxpertz.inventory.backend.entity.Product;
import com.mxpertz.inventory.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductController {

    ProductService productService;

    ProductController(ProductService productService)
    {
        this.productService = productService;
    }

    @GetMapping("/")
    private String sayHello()
    {
        return "Hello Backend";
    }

    @PostMapping("/add")
    private List<Product> add(@RequestBody ProductDto productDto)
    {
        return productService.add(productDto);
    }

    @PutMapping("/update/{id}")
    private String update(@RequestBody ProductDto productDto,@PathVariable Long id)
    {
        return productService.update(productDto,id);
    }

    @DeleteMapping("/delete/{id}")
    private String delete(@PathVariable Long id)
    {
        return productService.delete(id);
    }

    @GetMapping("/all")
    private List<Product> findAllProducts()
    {
        return productService.getAllProducts();
    }


}
