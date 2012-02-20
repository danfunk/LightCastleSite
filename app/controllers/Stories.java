package controllers;

import play.mvc.*;

public class Stories extends Controller {

    @Before
    static void setPageLevel3() {
        renderArgs.put("level", 3);
    }

    public static void architecture() { render();}
    public static void clustering() { render();}
    public static void monitoring() { render();}
    public static void mops() { render();}
    public static void reporting() { render();}
    public static void ruby() { render();}
    public static void solr() { render();}
    public static void testing() { render();}
}
