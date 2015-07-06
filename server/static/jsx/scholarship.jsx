define(
['ext/jquery', 'ext/react', 'ext/classnames', 'util'],
function($, React, classnames, util) {

  var ScholarshipBoxInner = React.createClass({
    propTypes: {
      removeFromProfile: React.PropTypes.func.isRequired
    },

    render: function() {
      return (
        <div className="scholarship-inner row-fluid">
          <div className="span8 left-col">
            {this.props.data.description.replace('&amp;', 'and')}
          </div>
          <div className="span4 right-col">
            <ul>
              {this.props.data.eligibility.concat(
                  this.props.data.enrollment_year).map(function(req, i) {
                return (<li key={i}>{req}</li>);
              })}
            </ul>
          </div>
          <div className="row-fluid">
            <div className="span12 more-info">
              <a href={this.props.data.link} target="_blank">
                <i className="icon-info-sign"></i> More Info
              </a>
              <a onClick={this.props.removeFromProfile}>
                <i className="icon-remove-sign"></i> Remove from profile
              </a>
            </div>
          </div>
        </div>
      );
    }
  });

  var ScholarshipBox = React.createClass({
    propTypes: {
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        eligibility: React.PropTypes.arrayOf(React.PropTypes.string),
        enrollment_year: React.PropTypes.arrayOf(React.PropTypes.string),
        link: React.PropTypes.string.isRequired
      }).isRequired
    },

    getInitialState: function() {
      return {
        expanded: false,
        removed: false
      }
    },

    toggleExpansion: function() {
      this.setState({expanded: !this.state.expanded});
    },

    removeFromProfile: function() {
      this.setState({removed: true});
      $.ajax({
        type: 'DELETE',
        url: '/api/v1/user/scholarships/' + this.props.data.id
      });
      this.props.onRemove(this.props.data.id);
    },

    render: function() {
      if (this.state.removed) {
        return null;
      }

      var classes = classnames({
        'scholarship-content': true,
        'expanded': this.state.expanded
      });

      scholarshipInner = null;

      if (this.state.expanded) {
        scholarshipInner = (<ScholarshipBoxInner data={this.props.data}
          removeFromProfile={this.removeFromProfile} />);
      }

      return (
        <div className={classes}>
          <div onClick={this.toggleExpansion} className="visible-section">
            <div className="scholarship-title">
              {this.props.data.title.replace('&amp;', 'and')}
            </div>
          </div>
          {scholarshipInner}
        </div>
      );
    }
  });

  return {
    ScholarshipContainer: ScholarshipContainer,
    ScholarshipBox: ScholarshipBox
  };
});
