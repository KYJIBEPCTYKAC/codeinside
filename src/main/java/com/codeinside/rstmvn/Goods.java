/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class Goods implements IGoods {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    @Override
    public GoodsModel add(String name){
        String sql = "SELECT goodsadd id from rest.goodsadd(?);";
        GoodsModel tmp = (GoodsModel)jdbcTemplate.queryForObject(sql, new Object[] { name }, new BeanPropertyRowMapper(GoodsModel.class));
        tmp.setName(name);
        return tmp;
    }

    /**
     * Обновляет объект и сохраняет изменения в БД
     * @param id
     * @param newName
     * @return
     * @throws SQLException 
     */
    @Transactional
    @Override
    public boolean upd(long id, String newName) throws SQLException{
        String sql = "SELECT rest.goodsupd(?, ?);";
        jdbcTemplate.queryForObject(sql, new Object[] { id, newName }, 
            new BeanPropertyRowMapper(Object.class));
        return true;
    }
    
    /**
     * 
     * @param id
     * @return 
     * @throws java.sql.SQLException 
     */
    @Transactional
    @Override
    public boolean del(long id) throws SQLException{
        String sql = "SELECT rest.goodsdel(?);";
        jdbcTemplate.queryForObject(sql, new Object[] { id }, 
            new BeanPropertyRowMapper(Object.class));
        return true;
    }
    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    @Transactional
    @Override
    public Object[] getGoodsList() throws SQLException{
        String sql = "select * from rest.goodsget();";
        List<GoodsModel> gms = new ArrayList<GoodsModel>();
      
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        for (Map row : rows) {
            GoodsModel gm = new GoodsModel();
            gm.setId(Integer.parseInt(String.valueOf(row.get("goodsid"))));
            gm.setName((String)row.get("goodsname"));
            gms.add(gm);
        }
        return (Object[]) gms.toArray();
    }
}