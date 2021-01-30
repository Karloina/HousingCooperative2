package com.example.apartmentservice.controller;

import com.example.apartmentservice.dto.BlockDto;
import com.example.apartmentservice.service.BlockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@SessionAttributes
@RequestMapping("block")
//@RolesAllowed("administrator")
public class BlockController {
    private BlockService blockService;

    @Autowired
    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<BlockDto> listBlocks() {
        return blockService.listBlock();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addBlock(@RequestBody BlockDto block) {
        blockService.addBlock(block);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    public void editBlock(@RequestBody BlockDto block) {
        blockService.editBlock(block);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/delete/{blockId}", method = RequestMethod.DELETE)
    public void deleteBlock(@PathVariable("blockId") Integer blockId) {
        blockService.removeBlock(blockId);
    }
}
