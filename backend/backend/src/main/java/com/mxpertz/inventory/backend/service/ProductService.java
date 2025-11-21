    package com.mxpertz.inventory.backend.service;

    import com.mxpertz.inventory.backend.dto.ProductDto;
    import com.mxpertz.inventory.backend.entity.Product;
    import com.mxpertz.inventory.backend.repository.ProductRepository;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class ProductService {

        ProductRepository productRepository;

        ProductService(ProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public List<Product> add(ProductDto productDto) {
            Product product = new Product();
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
            product.setQuantity(productDto.getQuantity());
            productRepository.save(product);
            return productRepository.findAll();
        }

        public String update(ProductDto productDto,Long id)
        {
            Product product = productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found"));
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setDescription(productDto.getDescription());
            product.setQuantity(productDto.getQuantity());

            productRepository.save(product);

            return "Product updated Successfully";
        }

        public String delete(Long id) {
            productRepository.deleteById(id);
            return "Product delete successfully";
        }

        public List<Product> getAllProducts()
        {
            return productRepository.findAll();
        }
    }
