/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import java.sql.SQLException;
import java.util.Date;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Администратор
 */
public interface IPovarOrder {

    @Transactional
    PovarOrderModel addOrder(Date date, long userid, long goodsid, float amount) throws SQLException;

    /**
     *
     * @param id
     * @return
     * @throws java.sql.SQLException
     */
    @Transactional
    boolean del(long matid) throws SQLException;

    /**
     * Получает список заказов повара
     * @return список
     * @throws SQLException
     */
    @Transactional
    Object[] getList(Date date, long userid) throws SQLException;
    
}
