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
public interface IGoods {

    @Transactional
    GoodsModel add(String name);

    /**
     *
     * @param id
     * @return
     * @throws java.sql.SQLException
     */
    @Transactional
    boolean del(long id) throws SQLException;

    /**
     * Получает список пользователей
     * @return список пользователей
     * @throws SQLException
     */
    @Transactional
    Object[] getGoodsList() throws SQLException;

    /**
     * Обновляет объект и сохраняет изменения в БД
     * @param id
     * @param newName
     * @return
     * @throws SQLException
     */
    @Transactional
    boolean upd(long id, String newName) throws SQLException;
    
}
