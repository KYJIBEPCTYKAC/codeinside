/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Администратор
 */
public interface IUser {

    @Transactional
    UserModel addUser(String userName, String userPass, long userType);

    @Transactional
    UserModel checkLogin(String userName, String userPass) throws SQLException;

    @Transactional
    boolean delUser(long id);

    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    @Transactional
    Object[] getUserList() throws SQLException;

    @Transactional
    boolean updUser(long id, String userName, long userType);

    @Transactional
    boolean updUserPass(long id, String userPass);
    
}
