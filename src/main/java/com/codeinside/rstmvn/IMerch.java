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
public interface IMerch {

    @Transactional
    boolean addOrder(Date date, long userid, long goodsid, float amount, long matid) throws SQLException;

    /**
     * Получает список заказов и остаток товара
     * @return список
     * @throws SQLException
     */
    @Transactional
    Object[] getList(Date date, long userid) throws SQLException;
    
}
