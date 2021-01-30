package com.example.apartmentservice.service.impl;

import com.example.apartmentservice.dto.BlockDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.apartmentservice.dao.BlockRepository;
import com.example.apartmentservice.domain.Block;
import com.example.apartmentservice.service.BlockService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service("blockService")
public class BlockServiceImpl implements BlockService {
    private ModelMapper modelMapper;
    private BlockRepository blockRepository;

    @Autowired
    public BlockServiceImpl(BlockRepository blockRepository, ModelMapper modelMapper) {
        this.blockRepository = blockRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void addBlock(BlockDto blockDto) {
        Block block = modelMapper.map(blockDto, Block.class);
        blockRepository.save(block);
    }

    @Override
    public void editBlock(BlockDto blockDto) {
        Block block = modelMapper.map(blockDto, Block.class);
        blockRepository.save(block);
    }

    @Override
    public List<BlockDto> listBlock() {
        List<Block> blocks = blockRepository.findAll();
        return blocks
                .stream()
                .map(block -> modelMapper.map(block, BlockDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void removeBlock(long id) {
        blockRepository.deleteById(id);
    }

    @Override
    public BlockDto getBlock(long id) {
        Block block = blockRepository.findById(id);
        return modelMapper.map(block, BlockDto.class);
    }

    @Override
    public Set<BlockDto> findAllByBlockManagerId(long id) {
        Set<Block> blocks = blockRepository.findAllByBlockManagerId(id);
        return blocks
                .stream()
                .map(block -> modelMapper.map(block, BlockDto.class))
                .collect(Collectors.toSet());
    }

//    @Override
//    public Set<BlockDto> findAllByAddressId(long addressId) {
//        Set<Block> blocks = blockRepository.findAllByAddress_Id(addressId);
//        return blocks
//                .stream()
//                .map(block -> modelMapper.map(block, BlockDto.class))
//                .collect(Collectors.toSet());
//    }

}
