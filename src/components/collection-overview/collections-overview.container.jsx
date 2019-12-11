import { connect } from "react-redux";

import { createSelectorCreator } from "reselect";

import withSpinner from "../with-spinner/withSpinner.component";
import { compose } from "redux";
import collectionsOverviewComponent from "./collections-overview.component";
import { selectCollectionFetching } from "../../redux/shop/shop.selector";

const mapStateToProps = createSelectorCreator({
  isLoading: selectCollectionFetching
});

const collectionOverviewContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(collectionsOverviewComponent);

export default collectionOverviewContainer;
