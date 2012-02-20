package tags;

import groovy.lang.Closure;
import play.mvc.Http;
import play.mvc.Router;
import play.templates.*;
import play.templates.GroovyTemplate.ExecutableTemplate;
import java.util.*;
import java.io.PrintWriter;

@FastTags.Namespace("lc")
public class MyFastTag extends FastTags {

    /**
     * Creates a link that will be styled differently if it is linked to the current page, or if the given header
     * matches the action.
     * called like: #{lc.menuItem class:'nav' activeStyle:'navdown', href:@Application.contact()}Contact Us#{/lc.menuItem}
     * produces: <a href="/contact_us" class="nav navDown">Contact Us</a>
     * @param args
     * @param body
     * @param out
     * @param template
     * @param fromLine
     */
    public static void _menuItem(Map<?, ?> args, Closure body, PrintWriter out, ExecutableTemplate template, int fromLine) {
        Router.ActionDefinition actionDef = (Router.ActionDefinition) args.get("action");
        String className     = (String) args.get("class");
        String header        = "Application." + (String) args.get("header");
        String activeStyle   = (String) args.get("activeStyle");
        String inactiveStyle = (String) args.get("inactiveStyle");
        String style         = "";

        args.remove("class");
        args.remove("activeStyle");
        args.remove("inactiveStyle");

        if (className != null) {
            style += " " + className;
        }
        if (actionDef.action.equals(header) && activeStyle != null) {
            style += " " + activeStyle;
        }
        else if (Http.Request.current().action.equals(actionDef.action) && activeStyle != null) {
            style += " " + activeStyle;
        }
        else if (!Http.Request.current().action.equals(actionDef.action) && inactiveStyle != null) {
            style += " " + inactiveStyle;
        }
        out.print("<a href=\"" + actionDef.url + "\" class=\"" + style + "\" " + serialize(args, "href") + ">");
        out.print(JavaExtensions.toString(body));
        out.print("</a>");
    }

}
