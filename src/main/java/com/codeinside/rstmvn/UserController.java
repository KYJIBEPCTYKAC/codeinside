package com.codeinside.rstmvn;

import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping("/user/login")
    public User login(@RequestParam(value="name") String name, @RequestParam(value="pass") String pass) throws SQLException {
        return new User(name, pass);
    }
}
