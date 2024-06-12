package com.sjsu.cmpe202.doctrina.model;

public class User {

    private long id;
    private String name;
    private String address;
    private long phone;
    private boolean isLoggedIn;
    private String username;
    private String password;

    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    public void setLoggedIn(boolean loggedIn) {
        isLoggedIn = loggedIn;
    }

    public User() {
    }

    public User(long id, String name, String address, long phone) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public User login(String username, String password){
        //todo: user class initialization and authentication via database
        return new User(10000L, "Loggedin User", "Washington square", 4081234567L );

    }
    public User logout(String username) {
        //todo: to be updated
        return new User();
    }

    public String toJson() {
        // todo: use the Json module to get this
        return "{" +
                "id:" + id +
                ", name:'" + name + '\'' +
                ", address:'" + address + '\'' +
                ", phone:" + phone +
                ", isLoggedIn:" + isLoggedIn +
                '}';
    }
}
