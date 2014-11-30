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
public class MerchController {
    @Autowired
    private Merch merch;
    
    @RequestMapping("/merch/getlist")
    public Object[] getList(@RequestParam(value="userid") Long userid, @RequestParam(value="orderdate") Date orderdate) throws SQLException {
        return merch.getList(orderdate, userid);
    }
//    @RequestMapping("/povar/del")
//    public boolean del(@RequestParam(value="matid") long matid) throws SQLException {
//        return merch.del(matid);
//    }
//
    @RequestMapping("/merch/add")
    public Object addOrder(
            @RequestParam(value="userid") Long userid, 
            @RequestParam(value="orderdate") Date orderdate, 
            @RequestParam(value="goodsid") Long goodsid, 
            @RequestParam(value="amount") float amount, 
            @RequestParam(value="matid") Long matid) throws SQLException {
        return merch.addOrder(orderdate, userid, goodsid, amount, matid);
    }

}
