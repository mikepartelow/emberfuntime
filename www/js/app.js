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
  tagName: 'table',
  classNames: [ 'table', 'table-bordered', 'tablesorter-bootstrap' ],
  
  didInsertElement: function() {
    this.$().tablesorter({
      sortList: [ [3,1],[2,0] ],      
  
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


// App.Store = DS.Store.extend({
//   revision: 12,
//   adapter: 'DS.FixtureAdapter'
// });
// 
// App.Issue.FIXTURES = [
  // {
  //   id:             '008581f14828204576627222245b2e12',
  //   created_at:     new Date('2013-02-07'),
  //   summary:        'summary 1',
  //   owner:          'user 1',
  //   priority:       1,
  //   status:         'Open', 
  //   description:    "long\ndescription\none"   
  // },
//   
//   {
//     id:             '0098581f15f747fd81c98629876543ef',
//     created_at:     new Date('2013-07-07'),
//     summary:        'summary 2',
//     owner:          'user 2',
//     priority:       1,
//     status:         'Open', 
//     description:    "long\ndescription\nsix"     
//   },  
// 
//   {
//     id:             '009852g6htf747fd81c98622245b2e12',
//     created_at:     new Date('2013-04-07'),
//     summary:        'summary 3',
//     owner:          'user 2',
//     priority:       2,
//     status:         'Open',     
//     description:    "long\ndescription\nseven"     
//   },  
// 
//   {
//     id:             '00985815f747fdab81c98622245b2e12',
//     created_at:     new Date('2013-06-06'),
//     summary:        'summary 4',
//     owner:          'user 2',
//     priority:       1,
//     status:         'Closed',     
//     description:    "long\ndescription\neight"     
//   },  
// 
//   {
//     id:             '59387289f8e4f74d81c98622245b2e12',
//     created_at:     new Date('2013-01-07'),
//     summary:        'summary 5',
//     owner:          'user 3',
//     priority:       3,
//     status:         'Open',     
//     description:    "long\ndescription\nnine"     
//   },  
//   
// ];