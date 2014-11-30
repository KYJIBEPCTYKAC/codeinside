package com.codeinside.rstmvn;

public class PrapModel {
    private long goodsid;
    private String goodsname;
    private long povarid;
    private String povarname;
    private float ordered;
    private float in_store;
    private long consid;
    private float consumed;

    public long getGoodsid() {
        return goodsid;
    }

    public void setGoodsid(long goodsid) {
        this.goodsid = goodsid;
    }

    public String getGoodsname() {
        return goodsname;
    }

    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname;
    }

    public long getPovarid() {
        return povarid;
    }

    public void setPovarid(long povarid) {
        this.povarid = povarid;
    }

    public String getPovarname() {
        return povarname;
    }

    public void setPovarname(String povarname) {
        this.povarname = povarname;
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

    public long getConsid() {
        return consid;
    }

    public void setConsid(long consid) {
        this.consid = consid;
    }

    public float getConsumed() {
        return consumed;
    }

    public void setConsumed(float consumed) {
        this.consumed = consumed;
    }
    
}
