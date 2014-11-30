/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.codeinside.rstmvn;

/**
 *
 * @author Администратор
 */
public class MerchModel {
    private int goodsid;
    private String goodsname;
    private float ordered;
    private float in_store;
    private long matid;
    private float buy;

    public long getMatid() {
        return matid;
    }

    public void setMatid(long matid) {
        this.matid = matid;
    }

    public float getBuy() {
        return buy;
    }

    public void setBuy(float buy) {
        this.buy = buy;
    }
    
    public int getGoodsid() {
        return goodsid;
    }

    public void setGoodsid(int goodsid) {
        this.goodsid = goodsid;
    }

    public String getGoodsname() {
        return goodsname;
    }

    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname;
    }

    public float getOrdered() {
        return ordered;
    }

    public void setOrdered(float ordered) {
        this.ordered = ordered;
    }

    public float getIn_store() {
        return in_store;
    }

    public void setIn_store(float in_store) {
        this.in_store = in_store;
    }
    
}
