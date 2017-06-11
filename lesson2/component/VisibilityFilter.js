import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions/index'

const Link = ({active, onLinkClick, text}) => {
  if (active) {
    return (<span style={{marginRight: 8}}>{text}</span>)
  }

  return (
    <a href="#"
       style={{marginRight: 8}}
       onClick={() => onLinkClick()}
    >
      {text}
    </a>
  )
};

const mapStateToProps = (state, ownProps) => ({
  active: state.visibilityFilter === ownProps.filter
});

const mapdispatchToProps = (dispatch, ownProps) => ({
  onLinkClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

const FilterLink = connect(mapStateToProps,mapdispatchToProps)(Link);

const VisibilityFilter = () => {
  return (
    <div>
      Show:
      <FilterLink filter="SHOW_ALL" text="All"/>
      <FilterLink filter="SHOW_ACTIVE" text="Active"/>
      <FilterLink filter="SHOW_COMPLETED" text="Completed"/>
    </div>
  )
};

export default VisibilityFilter;