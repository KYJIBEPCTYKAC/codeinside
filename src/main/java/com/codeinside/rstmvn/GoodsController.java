/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoodsController {

//    @Autowired
//    private ApplicationContext context;
//    
//    @Autowired
//    private DataSource dataSource;

    @RequestMapping("/goods/getlist")
    public Goods[] getList() throws SQLException {
        return Goods.getGoodsList();
    }

    @RequestMapping("/goods/add")
    public Goods add(@RequestParam(value="name") String name) throws SQLException {
        return new Goods(name);
    }
    @RequestMapping("/goods/del")
    public boolean del(@RequestParam(value="id") Long id) throws SQLException {
        return Goods.del(id);
    }
    @RequestMapping("/goods/upd")
    public boolean upd(@RequestParam(value="id") Long id, @RequestParam(value="name") String name) throws SQLException {
        Goods tmpGoods = new Goods(id, name);
        return tmpGoods.upd(name);
    }

}
