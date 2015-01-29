'use strict';

var Backbone = require( 'backbone' );

var BaseView = Backbone.View.extend({

  serialize: function() {
    if ( this.model ) {
      return this.model.toJSON();
    }
    if ( this.collection ) {
      return this.collection.toJSON();
    }
    console.warn( 'View has no model or collection' );
    return {};
  },

  render: function() {
    // console.log( this.serialize() );
    if ( this.template ) {
      this.$el.html( this.template.render( this.serialize() ) );
    } else {
      console.warn( 'View has no template method' );
      Backbone.View.prototype.render.call( this, arguments );
    }

    return this;
  }

});

module.exports = BaseView;
