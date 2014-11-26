/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

public class User {

    private long id;
    private String name;
    private String pass;
    private long type;
    
    public long getId() {
        return id;
    }

    public long getType() {
        return type;
    }
    
    public String getName(){
        return name;
    }
    
    public User (int userid, int usertype, String username){
        id = userid;
        type = usertype;
        name = username;
    }
    
    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    public static User[] getUserList() throws SQLException{
        User[] tmpArr;
        int cnt = 0, userid, usertype;
        String username;
        Connection conn = ConnectionFactory.getConnection();
        conn.setAutoCommit(false);
        PreparedStatement getUsers = conn.prepareStatement("select * from rest.usersget();", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
        ResultSet resultSet = getUsers.executeQuery();
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
        tmpArr = new User[size];
        
        while (resultSet.next())
        {
            userid = resultSet.getInt(1);
            usertype = resultSet.getInt(2);
            username = resultSet.getString(3);
            tmpArr[cnt] = new User(userid, usertype, username);
            cnt++;
            // do something with the results.
        }
        resultSet.close();
        getUsers.close();
        
        conn.commit();
        conn.close();
        return tmpArr;
    }
    
    public User(String username, String userpass) throws SQLException {
        this.id = -1;
        this.type = -1;
        this.name = username;
        this.pass = userpass;
        Connection conn = ConnectionFactory.getConnection();
        PreparedStatement checkLogin = conn.prepareStatement("SELECT userid, usertype from rest.check_login(?, ?);");
        checkLogin.setString(1, username);
        checkLogin.setString(2, userpass);
        ResultSet rs = checkLogin.executeQuery();
//        long id = checkLogin.get;
//        long type = checkLogin.getLong(2);
//        String s = checkLogin.getString(1);
        rs.next();
        this.id = rs.getLong(1);
        this.type = rs.getLong(2);
        rs.close();
        checkLogin.close();
        conn.close();
    }

}