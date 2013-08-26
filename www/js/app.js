App = Ember.Application.create({
  LOG_TRANSITIONS: true
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
  
  didInsertElement: function() {
    $("#issues-table").tablesorter({
      theme:        'blue',
      widgets:      [ 'zebra', ],
    });    
  }
});

App.IssuesTableRowView = Ember.View.extend({
  templateName: 'issues-table-row',
  tagName: 'tr',
  
  didInsertElement: function() {
    $("#issues-table").trigger("update");
  }  
});

App.Issue = DS.Model.extend({
	created_at:   DS.attr('date'),
	
	summary:      DS.attr('string'),
	owner:        DS.attr('string'),
	
	description:  DS.attr('string')
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Issue.FIXTURES = [
  {
    id:             '123abc',
    created_at:     '2013-02-07T16:44:57.000Z',
    summary:        'summary 1',
    owner:          'user 1',
    description:    "long\ndescription\none"   
  },
  
  {
    id:             'fa32123xyz',
    created_at:     '2013-07-07T16:44:57.000Z',
    summary:        'summary 2',
    owner:          'user 2',
    description:    "long\ndescription\nsix"     
  },  

  {
    id:             '123x342432fsdyz',
    created_at:     '2013-04-07T16:44:57.000Z',
    summary:        'summary 3',
    owner:          'user 2',
    description:    "long\ndescription\nseven"     
  },  

  {
    id:             '123xyzre231das',
    created_at:     '2013-06-07T16:44:57.000Z',
    summary:        'summary 4',
    owner:          'user 2',
    description:    "long\ndescription\neight"     
  },  

  {
    id:             '123xyzrew90232',
    created_at:     '2013-01-07T16:44:57.000Z',
    summary:        'summary 5',
    owner:          'user 3',
    description:    "long\ndescription\nnine"     
  },  
  
];