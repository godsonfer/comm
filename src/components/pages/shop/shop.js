import React from "react";

import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { selectIsCollectionLoading } from "./../../../redux/shop/shop.selector";

import { fetchcollectionStartAsync } from "./../../../redux/shop/shop.action";

import collectionOverviewContainer from "../../collection-overview/collections-overview.container";

import withSpinner from "../../with-spinner/withSpinner.component";

const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchcollectionStartAsync } = this.props;
    fetchcollectionStartAsync();
  }

  render() {
    const { match, isCollectionsLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={collectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionLoading
});
const mapDispatchToProps = dispatch => ({
  fetchcollectionStartAsync: () => dispatch(fetchcollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
