package com.codeinside.rstmvn;

import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    /**
     * Производит проверку пароля пользователя, возвращает ID и TYPE в случае успеха, -1 -1 в случае провала
     * @param name 
     * @param pass
     * @return
     * @throws SQLException 
     */
    @RequestMapping("/user/login")
    public User login(@RequestParam(value="name") String name, @RequestParam(value="pass") String pass) throws SQLException {
        return new User(name, pass);
    }
    
    /**
     * Возвращает список пользователей
     * @return
     * @throws SQLException 
     */
    @RequestMapping("/user/getlist")
    public User[] getlist() throws SQLException {
        return User.getUserList();
    }
}
