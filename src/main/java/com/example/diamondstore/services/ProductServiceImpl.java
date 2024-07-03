package com.example.diamondstore.services;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.DiamondMount;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductDiamond;
import com.example.diamondstore.repositories.*;
import com.example.diamondstore.services.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DiamondMountRepository diamondMountRepository;
    @Autowired
    private ProductDiamondRepository productDiamondRepository;
    @Autowired
    private DiamondRepository diamondRepository;

    @Override
    public List<Product> productList() {
        List<Product> products = productRepository.findAll();
        for (Product p : products){
            p.setComponentsPrice(calculateComponentsPrice(p.getProductId()));
        }
        return products;
    }

    @Override
    public Product getProductById(int id) {
        Product product = productRepository.findProductByProductId(id);
        product.setComponentsPrice(calculateComponentsPrice(id));
        return product;
    }

    @Override
    public Product createProduct(ProductDTO productDTO) {
        Product saveProduct = productRepository.save(Product.builder()
                .productName(productDTO.getProductName())
                .description(productDTO.getDescription())
                .mountId(diamondMountRepository.findDiamondMountByMountId(productDTO.getMountId()))
                .laborFee(productDTO.getLaborFee())
                .componentsPrice(0)
                .price(0)
                .status(productDTO.getStatus())
                .build());
        return saveProduct;
    }

    @Override
    public Product updateProduct(ProductDTO productDTO, int id) {
        Product saveProduct = productRepository.findProductByProductId(id);
        saveProduct.setProductName(productDTO.getProductName());
        saveProduct.setDescription(productDTO.getDescription());
        saveProduct.setLaborFee(productDTO.getLaborFee());
        saveProduct.setStatus(productDTO.getStatus());
        saveProduct.setMountId(diamondMountRepository.findDiamondMountByMountId(productDTO.getMountId()));

        return productRepository.save(saveProduct);
    }

    @Override
    public List<Product> findProductByProductName(String name) {
        return productRepository.findProductByProductName(name);
    }

    @Override
    public float calculateComponentsPrice(int productId) {
        float componentsPrice = 0.0f;

        // Get all ProductDiamond relations for the given productId
        List<ProductDiamond> productDiamonds = productDiamondRepository.
                findByProductId(productRepository.findProductByProductId(productId));

        // Calculate the price from diamonds
        for (ProductDiamond pd : productDiamonds) {
            Diamond diamond = diamondRepository.findById(pd.getDiamondId().getDiamondId()).orElse(null);
            if (diamond != null) {
                componentsPrice += diamond.getBasePrice() * pd.getQuantity();
            }
        }

        // Get the associated DiamondMount
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null && product.getMountId() != null) {
            DiamondMount mount = diamondMountRepository.findById(
                    product.getMountId().getMountId()).orElse(null);
            if (mount != null) {
                componentsPrice += mount.getBasePrice();
            }
        }

        // Update the componentsPrice in the Product entity
        if (product != null) {
            product.setComponentsPrice(componentsPrice);
            productRepository.save(product);
        }

        return componentsPrice;
    }

    @Override
    public List<Product> getProductsByMountType(String type) {
        return productRepository.findByMountType(type);
    }
}
