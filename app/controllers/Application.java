package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    @Before(unless={"index"})
    static void setPageLevel2() {
        renderArgs.put("level", 2);
    }

    public static void index() { render();}
    public static void sysadmin() { render(); }
    public static void webdev() { render(); }
    public static void analysis() { render();}
    public static void about() { render();}
    public static void contact() { render();}

}