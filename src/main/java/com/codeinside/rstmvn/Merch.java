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
public class Merch{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    
    /**
     * Получает список заказов и остаток товара
     * @return список
     * @throws SQLException
     */
    @Transactional
    public Object[] getList(Date date, long userid) throws SQLException{
        String sql = "SELECT * from rest.merchget(?, ?);";
        int[] argTypes = new int[2];
        argTypes[0] = java.sql.Types.DATE;
        argTypes[1] = java.sql.Types.BIGINT;
        List<MerchModel> rows = jdbcTemplate.query(sql, new Object[] { date , userid}, argTypes, new BeanPropertyRowMapper(MerchModel.class));
        return (Object[]) rows.toArray();
    }

    @Transactional
    public boolean addOrder(Date date, long userid, long goodsid, float amount, long matid) throws SQLException{
        String sql = "SELECT * from rest.merchadd(?, ?, ?, ?, ?);";
        int[] argTypes = new int[5];
        argTypes[0] = java.sql.Types.BIGINT;
        argTypes[1] = java.sql.Types.DATE;
        argTypes[2] = java.sql.Types.BIGINT;
        argTypes[3] = java.sql.Types.NUMERIC;
        argTypes[5] = java.sql.Types.BIGINT;
        jdbcTemplate.update(sql, new Object[] { userid, date, goodsid, amount, matid }, argTypes);
//        List<PovarOrderModel> rows = jdbcTemplate.queryForList(sql, new Object[] { userid, date, goodsid, amount }, argTypes, PovarOrderModel.class);
//        List<MerchModel> rows = jdbcTemplate.query(sql, new Object[] { userid, date, goodsid, amount, matid }, argTypes, new BeanPropertyRowMapper(MerchModel.class) );
//        Object[] o = (Object[]) rows.toArray();
        return true;
    }
    

}