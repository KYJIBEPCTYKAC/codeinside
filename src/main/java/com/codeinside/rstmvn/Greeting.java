/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;
public class Greeting {

    private final long id;
    private final String content;
    private final String[] tst;
    
    
    public Greeting(long id, String content) {
        this.id = id;
        this.content = content;
        tst = new String[3];
        tst[0] = "Ass";
        tst[1] = "Cunt";
        tst[2] = "Tits";
        
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
    
    public String[] getTst(){
        return tst;
    }
}