package com.example.apartmentservice.service;

import com.example.apartmentservice.dto.BlockDto;
import java.util.List;
import java.util.Set;

public interface BlockService {

    void addBlock(BlockDto block);

    void editBlock(BlockDto block);

    List<BlockDto> listBlock();

    void removeBlock(long id);

    BlockDto getBlock(long id);

    Set<BlockDto> findAllByBlockManagerId(long id);
}
