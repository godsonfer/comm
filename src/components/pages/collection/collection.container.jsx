import { createSelectorCreator } from "reselect";
import { selectIsCollectionLoading } from "./../../../redux/shop/shop.selector";
import { compose } from "redux";
import { connect } from "react-dom";
import withSpinner from "../../with-spinner/withSpinner.component";
import CollectionPage from "./collection.component";

const mapStateToProps = createSelectorCreator({
  isLoading: state => !selectIsCollectionLoading(state)
});

const collectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionPage);

export default collectionPageContainer;
