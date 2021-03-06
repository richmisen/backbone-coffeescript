(function() {

  describe('Quick Tour', function() {
    describe("Backbone.Model", function() {
      before(function() {
        return this.suggestion = new Backbone.Model({
          subject: "Backbone + CoffeeScript"
        });
      });
      describe("get", function() {
        return it("should have initial value for attribute 'subject'", function() {
          return this.suggestion.get('subject').should.equal("Backbone + CoffeeScript");
        });
      });
      return describe("set", function() {
        return it("should return set value for attribute 'subject'", function() {
          this.suggestion.set('message', "What the world needs now...");
          return this.suggestion.get('message').should.equal("What the world needs now...");
        });
      });
    });
    describe("Suggestions", function() {
      beforeEach(function() {
        return this.suggestions = new Suggestions;
      });
      return describe("url", function() {
        return it("should return '/api/feedback/suggestions' for new instance", function() {
          return this.suggestions.url.should.equal("/api/feedback/suggestions");
        });
      });
    });
    describe("ShowView", function() {
      beforeEach(function() {
        var suggestion;
        suggestion = new Backbone.Model({
          subject: "Hello",
          message: "I am a Model."
        });
        return this.showView = new ShowView({
          model: suggestion
        });
      });
      describe("el", function() {
        return it("should return a 'div' element", function() {
          return this.showView.el.tagName.should.equal("DIV");
        });
      });
      return describe("render", function() {
        it("should include the subject from the model", function() {
          return this.showView.render().el.outerHTML.should.match(/Hello/);
        });
        return it("should include the message from the model", function() {
          return this.showView.render().el.outerHTML.should.match(/I am a Model./);
        });
      });
    });
    describe("IndexView", function() {
      beforeEach(function() {
        return this.indexView = new IndexView({
          collection: new Backbone.Collection([
            new Backbone.Model({
              subject: "Hello",
              message: "I am a Model."
            })
          ])
        });
      });
      describe("el", function() {
        return it("should return a 'div' element", function() {
          return this.indexView.el.tagName.should.equal("DIV");
        });
      });
      return describe("render", function() {
        it("should include the subject from the model", function() {
          return this.indexView.render().el.outerHTML.should.match(/Hello/);
        });
        return it("should not include the message from the model", function() {
          return this.indexView.render().el.outerHTML.should.not.match(/I am a Model./);
        });
      });
    });
    describe("NewView", function() {
      beforeEach(function() {
        return this.newView = new NewView({
          collection: new Backbone.Collection
        });
      });
      describe("el", function() {
        return it("should return a 'div' element", function() {
          return this.newView.el.tagName.should.equal("DIV");
        });
      });
      return describe("render", function() {
        it("should accept the subject for the new model", function() {
          return this.newView.render().el.outerHTML.should.match(/subject/);
        });
        return it("should accept the message for the new model", function() {
          return this.newView.render().el.outerHTML.should.match(/message/);
        });
      });
    });
    return describe("App", function() {
      beforeEach(function() {
        this.suggestions = new Suggestions;
        sinon.stub(this.suggestions, "fetch").yieldsTo('success', this.suggestions);
        this.app = new App(this.suggestions);
        Backbone.history.stop();
        return Backbone.history.start();
      });
      return describe("index", function() {
        return it("should fetch models", function() {
          return this.app.index();
        });
      });
    });
  });

}).call(this);
