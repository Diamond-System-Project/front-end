package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MountDTO {
    String mountName;
    float size;
    String type;
    String material;
    float basePrice;

}
