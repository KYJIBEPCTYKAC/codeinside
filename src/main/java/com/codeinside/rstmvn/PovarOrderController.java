package com.codeinside.rstmvn;

import java.sql.SQLException;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PovarOrderController {
    @Autowired
    private IPovarOrder povarorder;
    
    @RequestMapping("/povar/getlist")
    public Object[] getList(@RequestParam(value="userid") Long userid, @RequestParam(value="orderdate") Date orderdate) throws SQLException {
        return povarorder.getList(orderdate, userid);
    }
    @RequestMapping("/povar/del")
    public boolean del(@RequestParam(value="matid") long matid) throws SQLException {
        return povarorder.del(matid);
    }

    @RequestMapping("/povar/add")
    public Object addOrder(@RequestParam(value="userid") Long userid, @RequestParam(value="orderdate") Date orderdate, @RequestParam(value="goodsid") Long goodsid, @RequestParam(value="amount") float amount) throws SQLException {
        return povarorder.addOrder(orderdate, userid, goodsid, amount);
    }

}
