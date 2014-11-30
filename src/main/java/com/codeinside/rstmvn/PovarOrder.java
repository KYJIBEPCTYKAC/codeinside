/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PovarOrder implements IPovarOrder{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    
    /**
     * 
     * @param id
     * @return 
     * @throws java.sql.SQLException 
     */
    @Transactional
    @Override
    public boolean del(long matid) throws SQLException{
        String sql = "delete from rest.mat where id=?;";
        jdbcTemplate.update(sql, new Object[] { matid });
        return true;
    }
    /**
     * Получает список заказов повара
     * @return список
     * @throws SQLException
     */
    @Transactional
    @Override
    public Object[] getList(Date date, long userid) throws SQLException{
        String sql = "SELECT matid, docid, goodsid, goodsname, ordered, received from rest.povarorderget(?, ?);";
        List<PovarOrderModel> rows = jdbcTemplate.query(sql, new Object[] { userid, date }, new BeanPropertyRowMapper(PovarOrderModel.class));
        return (Object[]) rows.toArray();
    }

    @Transactional
    @Override
    public PovarOrderModel addOrder(Date date, long userid, long goodsid, float amount) throws SQLException{
//        String sql = "SELECT matid, docid, goodsid, goodsname, ordered, received, isexists from rest.povarorderadd(?, ?, ?, ?);";
        String sql = "SELECT * from rest.povarorderadd(?, ?, ?, ?);";
        int[] argTypes = new int[4];
        argTypes[0] = java.sql.Types.BIGINT;
        argTypes[1] = java.sql.Types.DATE;
        argTypes[2] = java.sql.Types.BIGINT;
        argTypes[3] = java.sql.Types.NUMERIC;
//        List<PovarOrderModel> rows = jdbcTemplate.queryForList(sql, new Object[] { userid, date, goodsid, amount }, argTypes, PovarOrderModel.class);
        List<PovarOrderModel> rows = jdbcTemplate.query(sql, new Object[] { userid, date, goodsid, amount }, argTypes, new BeanPropertyRowMapper(PovarOrderModel.class) );
        Object[] o = (Object[]) rows.toArray();
        return (PovarOrderModel)o[0];
    }
    

}