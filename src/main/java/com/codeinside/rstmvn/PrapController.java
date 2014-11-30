/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PrapController {
    @Autowired
    private Prap prap;
    
    @RequestMapping("/prap/getlist")
    public Object[] getList(@RequestParam(value="userid") Long userid, @RequestParam(value="orderdate") Date orderdate) throws SQLException {
        return prap.getList(orderdate, userid);
    }

    
    @RequestMapping("/prap/add")
    public Object addOrder(
            @RequestParam(value="userid") Long userid, 
            @RequestParam(value="povarid") Long povarid, 
            @RequestParam(value="orderdate") Date orderdate, 
            @RequestParam(value="goodsid") Long goodsid, 
            @RequestParam(value="amount") float amount, 
            @RequestParam(value="matid") Long matid) throws SQLException {
        return prap.addOrder(orderdate, userid, povarid, goodsid, amount, matid);
    }

}
