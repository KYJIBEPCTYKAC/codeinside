/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.beans.Transient;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Goods {

    private long id;
    private String name;

    
    public long getId() {
        return id;
    }
    
    public String getName(){
        return name;
    }
    
    public Goods (long goodsid, String goodsname){
        id = goodsid;
        name = goodsname;
    }
/**
 * Создает товар, сохраняет его в БД и читает новый идентификатор
 * @param goodsname
 * @throws SQLException 
 */
    public Goods(String goodsname) throws SQLException{
        name = goodsname;
        Connection conn = ConnectionFactory.getConnection();
        PreparedStatement insertGoods = conn.prepareStatement("SELECT * from rest.goodsadd(?);");
        insertGoods.setString(1, name);
        ResultSet rs = insertGoods.executeQuery();
        rs.next();
        this.id = rs.getLong(1);
        rs.close();
        insertGoods.close();
        conn.close();
    }
    /**
     * Обновляет объект и сохраняет изменения в БД
     * @param newName
     * @return
     * @throws SQLException 
     */
    public boolean upd(String newName) throws SQLException{
        Connection conn = ConnectionFactory.getConnection();
        PreparedStatement updGoods = conn.prepareStatement("SELECT * from rest.goodsupd(?, ?);");
        updGoods.setLong(1, id);
        updGoods.setString(2, newName);
        ResultSet rs = updGoods.executeQuery();
        rs.next();
        boolean tmpRez = rs.getBoolean(1);
        rs.close();
        updGoods.close();
        conn.close();
        return tmpRez;
    }
    
    /**
     * 
     * @param id
     * @return 
     * @throws java.sql.SQLException 
     */
    public static boolean del(long id) throws SQLException{
        Connection conn = ConnectionFactory.getConnection();
        PreparedStatement delGoods = conn.prepareStatement("SELECT * from rest.goodsdel(?);");
        delGoods.setLong(1, id);
        ResultSet rs = delGoods.executeQuery();
        rs.next();
        boolean rez = rs.getBoolean(1);
        rs.close();
        delGoods.close();
        conn.close();
        return rez;
    }
    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    public static Goods[] getGoodsList() throws SQLException{
        Goods[] tmpArr;
        int cnt = 0, goodsid;
        String goodsname;
        Connection conn = ConnectionFactory.getConnection();
        conn.setAutoCommit(false);
        PreparedStatement getGoods = conn.prepareStatement("select * from rest.goodsget();", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
        ResultSet resultSet = getGoods.executeQuery();
        int size;
        try {
            resultSet.last();
            size = resultSet.getRow();
            resultSet.beforeFirst();
        }
        catch(SQLException ex) {
            size = 0;
        }
        
        if (size == 0){
            return null;
        }
        tmpArr = new Goods[size];
        
        while (resultSet.next())
        {
            goodsid = resultSet.getInt(1);
            goodsname = resultSet.getString(2);
            tmpArr[cnt] = new Goods(goodsid, goodsname);
            cnt++;
            // do something with the results.
        }
        resultSet.close();
        getGoods.close();
        
        conn.commit();
        conn.close();
        return tmpArr;
    }
    

}