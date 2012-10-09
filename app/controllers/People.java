package controllers;

import play.mvc.*;

public class People extends Controller {

    @Before
    static void setPageLevel3() {
        renderArgs.put("level", 3);
    }
    public static void tamara() { render();}
    public static void dan() { render();}
    public static void fred() { render();}
    public static void josh() { render();}
}

