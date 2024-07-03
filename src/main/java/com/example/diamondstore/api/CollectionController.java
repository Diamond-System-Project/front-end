package com.example.diamondstore.api;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.Warranty;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @PostMapping("/create")
    public ResponseEntity<Collection> createCollection(@RequestBody CollectionDTO collectionDTO) {
        Collection newCollection = collectionService.createCollection(collectionDTO);
        return ResponseEntity.ok(newCollection);
    }

    @PutMapping("/update/{collectionId}")
    public ResponseEntity<?> updateCollection(@PathVariable Integer collectionId, @RequestBody CollectionDTO collectionDTO) {
        try {
            Collection updatedCollection = collectionService.updateCollection(collectionId, collectionDTO);
            return ResponseEntity.ok(updatedCollection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not update the collection");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCollection(@PathVariable Integer id) {
        try {
            collectionService.deleteCollection(id);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collection Deleted Successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/CollectionName/{name}")

    public ResponseEntity<?> getCollectionsByName(@PathVariable String name) {
        List<Collection> collections = collectionService.getCollectionByName(name);
        if (collections.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No collections found with the name: " + name);
        }
        return ResponseEntity.ok(collections);
    }

    @PostMapping("/addCollection")
    public ResponseEntity<ApiResponse> addProductToCollection(@RequestBody CollectionProductDTO collectionProductDTO) {
        try {
            Collection collection = collectionService.addProductToCollection(collectionProductDTO);

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Product Added to Collection Successfully")
                            .data(collection)
                            .build());
        } catch(Exception e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        ApiResponse.builder()
                                .success(false)
                                .message("Error: " + e.getMessage())
                                .build());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllCollection() {
        try {
            List<Collection> collection = collectionService.getAllCollection();
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("List of All Collection")
                    .data(collection)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{collectionId}/product/{productId}")
    public ResponseEntity<ApiResponse> removeProductFromCollection(@PathVariable Integer collectionId, @PathVariable Integer productId) {
        try {
            collectionService.removeProductFromCollection(collectionId, productId);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Product Removed from Collection Successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/product/{productId}/collection")
    public ResponseEntity<?> getCollectionsOfProduct(@PathVariable Integer productId) {
        List<Collection> collections = collectionService.getCollectionsOfProduct(productId);
        if (collections.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No collections found for product ID: " + productId);
        }
        return ResponseEntity.ok(collections);
    }

    @GetMapping("/{collectionId}/product")
    public ResponseEntity<?> getProductsInCollection(@PathVariable Integer collectionId) {
        List<Product> products = collectionService.getProductsInCollection(collectionId);
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No products found in collection ID: " + collectionId);
        }
        return ResponseEntity.ok(products);
    }
}
