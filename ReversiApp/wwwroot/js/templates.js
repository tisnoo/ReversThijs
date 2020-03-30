Handlebars.registerPartial("fiche", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"body\">\r\n "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"bericht") || (depth0 != null ? lookupProperty(depth0,"bericht") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"bericht","hash":{},"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\r\n </section>";
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