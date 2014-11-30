package com.codeinside.rstmvn;

public class PovarOrderModel {
    private long matid;
    private long docid;
    private long goodsid;
    private String goodsname;
    private float ordered;
    private float received;
    private boolean isexists;
    
    public long getMatid() {
        return matid;
    }

    public void setMatid(long matid) {
        this.matid = matid;
    }

    public long getDocid() {
        return docid;
    }

    public void setDocid(long docid) {
        this.docid = docid;
    }

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

    public float getOrdered() {
        return ordered;
    }

    public void setOrdered(float ordered) {
        this.ordered = ordered;
    }

    public float getReceived() {
        return received;
    }

    public void setReceived(float received) {
        this.received = received;
    }

    public boolean isIsexists() {
        return isexists;
    }

    public void setIsexists(boolean isexists) {
        this.isexists = isexists;
    }
    
}
