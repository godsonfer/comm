import React from "react";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import "./collections-overview.style.scss";
import PreviewCollection from "../preview-collection/preview-collection";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = ({ collections }) => (
  <div>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <PreviewCollection key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
