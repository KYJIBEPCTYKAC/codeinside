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
public class User implements IUser {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    @Transactional
    @Override
    public Object[] getUserList() throws SQLException{
        
        String sql = "select * from rest.usersget();";
        List<UserModel> ums = new ArrayList<UserModel>();
      
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        for (Map row : rows) {
            UserModel um = new UserModel();
            um.setId(Integer.parseInt(String.valueOf(row.get("userid"))));
            um.setName((String)row.get("username"));
            um.setType(Integer.parseInt(String.valueOf(row.get("usertype"))));
            ums.add(um);
        }
        return (Object[]) ums.toArray();
    }
    
    @Transactional
    @Override
    public UserModel checkLogin(String userName, String userPass) throws SQLException{
        String sql = "SELECT userid as id, usertype as type from rest.check_login(?, ?);";
        UserModel tmp = (UserModel)jdbcTemplate.queryForObject(sql, new Object[] { userName, userPass }, new BeanPropertyRowMapper(UserModel.class));
        tmp.setName(userName);
        return tmp;
    }
    
    @Transactional
    @Override
    public boolean delUser(long id){
        String sql = "delete from rest.user where id=?;";
        jdbcTemplate.update(sql, new Object[] { id });
        return true;
    }

    @Transactional
    @Override
    public UserModel addUser(String userName, String userPass, long userType){
        String sql = "select useradd id from rest.useradd(?, ?, ?);";
        UserModel tmp = (UserModel)jdbcTemplate.queryForObject(sql, new Object[] { userName, userPass, userType }, new BeanPropertyRowMapper(UserModel.class));
        tmp.setName(userName);
        tmp.setType(userType);
        return tmp;
    }
    @Transactional
    @Override
    public boolean updUser(long id, String userName, long userType){
        String sql = "update rest.user set name=?, type=? where id=?;";
        jdbcTemplate.update(sql, new Object[] {userName, userType, id });
        return true;
    }
    @Transactional
    @Override
    public boolean updUserPass(long id, String userPass){
        String sql = "update rest.user set pass=? where id=?;";
        jdbcTemplate.update(sql, new Object[] {userPass, id });
        return true;
    }

}