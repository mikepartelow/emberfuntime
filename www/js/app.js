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
      sortList: [ [3,0],[2,0] ],      
      widthFixed: true,

      headerTemplate : '{content} {icon}',
      headers: {
        0: { sorter: false }
      },
      
      theme:        'bootstrap',
      widgets:      [ 'zebra', 'filter', 'uitheme' ],
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
	
	priority:     DS.attr('number'),
	status:       DS.attr('string'),
	
	description:  DS.attr('string'),	
});

Ember.Handlebars.helper('ymd', function(d, options) {	  
  // convert a Date into YYYY/mm/dd because JS doesn't have strftime
	return d.getFullYear().toString() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + (d.getDate() + 1)).slice(-2);
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Issue.FIXTURES = [
  {
    id:             '123abc',
    created_at:     new Date('2013-02-07'),
    summary:        'summary 1',
    owner:          'user 1',
    priority:       1,
    status:         'Open', 
    description:    "long\ndescription\none"   
  },
  
  {
    id:             'fa32123xyz',
    created_at:     new Date('2013-07-07'),
    summary:        'summary 2',
    owner:          'user 2',
    priority:       1,
    status:         'Open', 
    description:    "long\ndescription\nsix"     
  },  

  {
    id:             '123x342432fsdyz',
    created_at:     new Date('2013-04-07'),
    summary:        'summary 3',
    owner:          'user 2',
    priority:       2,
    status:         'Open',     
    description:    "long\ndescription\nseven"     
  },  

  {
    id:             '123xyzre231das',
    created_at:     new Date('2013-06-06'),
    summary:        'summary 4',
    owner:          'user 2',
    priority:       1,
    status:         'Closed',     
    description:    "long\ndescription\neight"     
  },  

  {
    id:             '123xyzrew90232',
    created_at:     new Date('2013-01-07'),
    summary:        'summary 5',
    owner:          'user 3',
    priority:       3,
    status:         'Open',     
    description:    "long\ndescription\nnine"     
  },  
  
];