/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

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
    
    public Goods (int goodsid, String goodsname){
        id = goodsid;
        name = goodsname;
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