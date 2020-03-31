Handlebars.registerPartial("piece", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div \r\nclass=\"piece "
    + alias4(((helper = (helper = lookupProperty(helpers,"classname") || (depth0 != null ? lookupProperty(depth0,"classname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classname","hash":{},"data":data,"loc":{"start":{"line":2,"column":13},"end":{"line":2,"column":26}}}) : helper)))
    + "\" \r\nonmousedown=\"Game.reversi.onMouseDown("
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":3,"column":38},"end":{"line":3,"column":47}}}) : helper)))
    + ")\" \r\nonmouseover=\"Game.reversi.onMouseOver("
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":4,"column":38},"end":{"line":4,"column":47}}}) : helper)))
    + ")\" \r\nonmouseout=\"Game.reversi.onMouseLeft("
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":5,"column":37},"end":{"line":5,"column":46}}}) : helper)))
    + ")\"\r\n>\r\n\r\n\r\n</div>";
},"useData":true}));
this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["templates"] = this["spa_templates"]["templates"]["templates"] || {};
this["spa_templates"]["templates"]["templates"]["body"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"body\">\r\n "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"bericht") || (depth0 != null ? lookupProperty(depth0,"bericht") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"bericht","hash":{},"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\r\n </section>";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["bord"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"ifIsNotEven") || (depth0 != null ? lookupProperty(depth0,"ifIsNotEven") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"ifIsNotEven","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":9,"column":24}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"ifIsNotEven")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"piece"),depth0,{"name":"piece","hash":{"classname":"piece--black","index":(data && lookupProperty(data,"index"))},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        \r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"piece"),depth0,{"name":"piece","hash":{"classname":"piece--white","index":(data && lookupProperty(data,"index"))},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = 
  " <div class= \"board\">\r\n";
  stack1 = ((helper = (helper = lookupProperty(helpers,"forloop") || (depth0 != null ? lookupProperty(depth0,"forloop") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"forloop","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":10,"column":17}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"forloop")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n </div>\r\n ";
},"usePartial":true,"useData":true});
this["spa_templates"]["templates"]["templates"]["chart"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<canvas id=\"myChart\" width=\"400\" height=\"400\"></canvas>";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["description"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <h2>Beschrijving:</h2>\r\n  <p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":2,"column":20}}}) : helper)))
    + "</p>";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["fiche"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"fiche-container\">\r\n    \r\n    <div class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"backstyle") || (depth0 != null ? lookupProperty(depth0,"backstyle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backstyle","hash":{},"data":data,"loc":{"start":{"line":3,"column":16},"end":{"line":3,"column":29}}}) : helper)))
    + "\">\r\n    </div>\r\n    \r\n    <div class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"frontStyle") || (depth0 != null ? lookupProperty(depth0,"frontStyle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"frontStyle","hash":{},"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":6,"column":30}}}) : helper)))
    + "\">\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["joke"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4>Hier is een willekeurig grapje ondertussen:</h4>\r\n\r\n<h6>"
    + alias4(((helper = (helper = lookupProperty(helpers,"setup") || (depth0 != null ? lookupProperty(depth0,"setup") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"setup","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":13}}}) : helper)))
    + "</h6>\r\n<p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"punchline") || (depth0 != null ? lookupProperty(depth0,"punchline") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"punchline","hash":{},"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":4,"column":16}}}) : helper)))
    + "</p>";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["template"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"data") || (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":20}}}) : helper)))
    + "</h2>";
},"useData":true});
this["spa_templates"]["templates"]["templates"]["toprow"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});