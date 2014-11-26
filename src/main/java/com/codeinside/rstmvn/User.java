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