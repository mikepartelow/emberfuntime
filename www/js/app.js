App = Ember.Application.create({
  LOG_TRANSITIONS: true,  
});

App.Router.map(function() {
  this.resource('issues', { path: '/issues' });
  this.resource('issue', { path: '/issues/:issue_id' });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('issues');
  }
});

App.IssuesRoute = Ember.Route.extend({
  model: function() {
    return App.Issue.find();
  }
});

App.IssuesShowRoute = Ember.Route.extend({
  model: function() {
    return App.Issue.find(params.issue_id);
  }
});

App.IssuesTableView = Ember.View.extend({
  templateName: 'issues-table',
  issue_count: 0,
  
  didInsertElement: function() {
    this.set('issue_count', this.get('controller.model.length'));
      
    var the_table = this;
    
    function countRows() {
      var count = $(this).find("tr.issue-row:visible").length;
      the_table.set('issue_count', count);
    }
    
    this.$().find('table').tablesorter({
      sortList: [ [3,1],[2,0] ],      

      headerTemplate : '{content} {icon}',
      headers: {
        0: { sorter: false }
      },

      theme:        'bootstrap',
      widgets:      [ 'zebra', 'filter', 'uitheme' ],
      
    }).bind('filterEnd', countRows);
    
    // // FIXME: this seems hacky but the "afterRender" solution doesn't work because the rows haven't rendered at that point.
    // Ember.run.next(this, function() {
    //   this.$().find('table').trigger("update");
    // });    
  }
});

App.IssuesTableRowView = Ember.View.extend({
  templateName: 'issues-table-row',
  tagName: 'tr',
  classNames: [ 'issue-row', ]
});

App.Issue = DS.Model.extend({
	created_at:   DS.attr('date'),
	
	summary:      DS.attr('string'),
	owner:        DS.attr('string'),
	
	priority:     DS.attr('number'),
	status:       DS.attr('string'),
	
	description:  DS.attr('string'),	
});

Ember.Handlebars.helper('ymd', function(d, options) {	  
  // convert a Date into YYYY/mm/dd because JS doesn't have strftime
	return d.getFullYear().toString() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + (d.getDate() + 1)).slice(-2);
});


App.ZeroClipboardComponent = Ember.Component.extend({
  tagName: 'span',
  
  didInsertElement: function () {
    this.$('.tippy').tooltip({
      placement: 'bottom',
      html: true,
      container: 'body',
      trigger: 'manual',
      animation: true
    });   

    var clip = new ZeroClipboard(this.$('.clippy'));
    
    this.$('.clippy').css({
      "border": '1px solid lightgray',
      "background-color": '#efefef',
      "padding-top": '.25em',
      "padding-bottom": '.25em',
    });
    
    
    clip.on('mousedown', function(client) {
      $(this).css('background-color', '#ffffff');
    });
    
    clip.on('mouseup', function(client) {
      $(this).css('background-color', '#efefef');
    });
    
    clip.on('complete', function (client, args) {
      console.log('Copied "' + args.text + '" to clipboard');
      $(this).parents('.tippy').attr('title', 'copied to clipboard!').tooltip('fixTitle').tooltip('show');
    });

    clip.on('mouseover', function(client) {
      $(this).parents('.tippy').tooltip('show');
    });

    clip.on('mouseout', function(client) {
      $(this).parents('.tippy').tooltip('hide');
      $(this).parents('.tippy').attr('title', 'copy to clipboard').tooltip('fixTitle');
    });
  
  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.RESTAdapter'
});