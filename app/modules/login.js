define([
  "namespace",

  // Libs
  "use!backbone",

  // Modules

  // Plugins
  "use!plugins/backbone.layoutmanager"
],

function(namespace, Backbone) {

  // Create a new module
  var Login= namespace.module();

  Login.Model = Backbone.Model.extend({
    defaults : {
      "username" : ""
    }
  });

  loginModel = new Login.Model();

  // This will fetch the tutorial template and render it.
  Login.Views.NotLoggedIn = Backbone.View.extend({
    template: "login/notLoggedIn",

    serialize: function() {
      return { object: "App Layout" };
    }
  });

	Login.Views.LoggedIn = Backbone.View.extend({
		template: "login/loggedIn",

		serialize: function() {
			return { object: "notLoggedIn" };
		}
	});

	Login.Views.Index = Backbone.View.extend({
		template: "login/index",
    model: loginModel,
    events: {
      'click' : 'onClick'
    },
    views: {
      '#status' : new Login.Views.NotLoggedIn()
    },
    initialize: function() {
      _.bindAll(this, "onLoggedIn");
      namespace.app.on('login:loggedIn', this.onLoggedIn, this);
    },
    onClick: function() {
      console.log("simulating login");
      namespace.app.trigger('login:loggedIn', 'John Doe');
    },
    onLoggedIn: function(username){
      this.model.username = username;
      console.log("Login From: " + this.model.username);
      //TODO: fix error here
      this.views['#status'] = new Login.Views.LoggedIn({
        model: this.model
      });
      this.render();
      console.log("end simulating login");
    }
	});

  return Login;
});
