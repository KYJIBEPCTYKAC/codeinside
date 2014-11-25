/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

import com.jolbox.bonecp.BoneCP;
import com.jolbox.bonecp.BoneCPConfig;
import java.sql.Connection;
//import java.sql.DriverManager;
import java.sql.SQLException;
//import java.util.Properties;

/**
 *
 * @author Администратор
 */
public class ConnectionFactory {
    private static BoneCP pool = null;
    public static Connection createConnection() throws SQLException{
        if (pool == null) {
//            Class.forName("org.postgresql.Driver")
            BoneCPConfig config = new BoneCPConfig();
            config.setJdbcUrl("jdbc:postgresql://localhost:5432/rest?searchpath=rest");
            config.setUsername("postgres");
            config.setPassword("123451");
            config.setMinConnectionsPerPartition(2);
            config.setMaxConnectionsPerPartition(5);
            config.setPartitionCount(3);
//            config.setCloseConnectionWatch(true);
            pool = new BoneCP(config);
        }
//        String url = "jdbc:postgresql://localhost:5432/rest?searchpath=rest";
//        Properties props = new Properties();
//        props.setProperty("user","postgres");
//        props.setProperty("password","123451");
//        Connection conn = DriverManager.getConnection(url, props);
        Connection conn = pool.getConnection();
        return conn;
    }
}
