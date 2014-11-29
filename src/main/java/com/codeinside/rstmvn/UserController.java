package com.codeinside.rstmvn;

import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private IUser user;
    /**
     * Производит проверку пароля пользователя, возвращает ID и TYPE в случае успеха, -1 -1 в случае провала
     * @param name 
     * @param pass
     * @return
     * @throws SQLException 
     */
    @RequestMapping("/user/login")
    public Object login(@RequestParam(value="name") String name, @RequestParam(value="pass") String pass) throws SQLException {
        return user.checkLogin(name, pass);
    }

    @RequestMapping("/user/del")
    public boolean del(@RequestParam(value="id") Long id) throws SQLException {
        return user.delUser(id);
    }

    @RequestMapping("/user/add")
    public Object add(@RequestParam(value="name") String name, @RequestParam(value="pass") String pass, @RequestParam(value="type") long type) throws SQLException {
        return user.addUser(name, pass, type);
    }
    @RequestMapping("/user/upd")
    public boolean upd(@RequestParam(value="name") String name, @RequestParam(value="id") long id, @RequestParam(value="type") long type) throws SQLException {
        return user.updUser(id, name, type);
    }
    @RequestMapping("/user/updpass")
    public boolean upd(@RequestParam(value="pass") String pass, @RequestParam(value="id") long id) throws SQLException {
        return user.updUserPass(id, pass);
    }
    
    /**
     * Возвращает список пользователей
     * @return
     * @throws SQLException 
     */
    @RequestMapping("/user/getlist")
    public Object[] getlist() throws SQLException {
        Object[] tmp = user.getUserList();
        return tmp;
    }
}
