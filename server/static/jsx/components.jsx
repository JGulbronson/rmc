define(
['ext/jquery', 'ext/react', 'ext/classnames', 'util'],
function($, React, classnames, util) {
  var ExpandableContainer = React.createClass({
    propTypes: {
      data: React.PropTypes.array.isRequired,
      dataName: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
      return {
        expanded: false,
        minShow: 5,
        removedIds: []
      }
    },

    toggleExpand: function() {
      var self = this;

      if (this.state.expanded) {
        var navBarHeight = $("#site-nav").height();
        var margin = 16;
        var titleTop = $(React.findDOMNode(self.refs.header)).offset().top;
        $('html,body').animate({
          scrollTop: titleTop - navBarHeight - margin
        }, 300);

        $('.expanded-scholarships').fancySlide('up', 300, function() {
          self.setState({expanded: !self.state.expanded});
        });
      } else {
        $('.expanded-scholarships').fancySlide('down', 300, function() {
          self.setState({expanded: !self.state.expanded});
        });
      }
    },

    numHidden: function() {
      return this.props.data.length - this.state.minShow -
          this.state.removedIds.length;
    },

    getFooter: function() {
      var footerSpan;
      if (!this.state.expanded) {
        footerText = 'See ' + this.numHidden() + ' more ' +
            util.pluralize(this.numHidden(), this.props.dataName);
        footerSpan = <span>{footerText} &nbsp; <i className="icon-caret-down"></i></span>;
      } else {
        footerSpan = <span><i className="icon-caret-up"></i>
          &nbsp;Hide {util.pluralize(2, this.props.dataName)}</span>;
      }

      var footer = (
        <div className="expand-footer" onClick={this.toggleExpand}>
          {footerSpan}
        </div>
      )

      if (this.props.data.length <= this.state.minShow) {
        footer = (
          <div className="empty-footer">
          </div>
        )
      }

      return footer;
    },

    addRemovedId: function(i) {
      this.setState({removedIds: this.state.removedIds.concat([i])})
    },

    render: function() {
      var self = this;

      var visibleChildren = this.props.data.
          filter(function(s) {
            return self.state.removedIds.indexOf(s.id) === -1;
          }).
          slice(0, self.state.minShow).
          map(function(data, i) {
            return <self.props.view key={data.id} data={data} onRemove={self.addRemovedId}/>
          }
      );

      var hiddenChildren = this.props.data.
          filter(function(s) {
            return self.state.removedIds.indexOf(s.id) === -1;
          }).
          slice(self.state.minShow).
          map(function(data, i) {
            return <self.props.view key={data.id} data={data} onRemove={self.addRemovedId}/>
          }
      );

      if (this.props.data.length == 0) {
        return null;
      }

      return (
        <div>
          <div ref="header">
            {this.props.header}
          </div>
          <div className="scholarship-container">
            {visibleChildren}
            <div className="expanded-scholarships hide-initial">
              {hiddenChildren}
            </div>
          </div>
          {this.getFooter()}
        </div>
      );
    }
  });

  return {
    ExpandableContainer: ExpandableContainer
  };
});
