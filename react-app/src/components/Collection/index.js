import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {getCollections} from '../../store/collection';
import UserNavBar from '../Explore/UserNavBar';
import Footer from '../SplashPage/Footer';

import "./Collection.css";

function Collection() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const collections = useSelector(state => state.collection);
  const collectionsArr = Object.values(collections);

  useEffect(() => {
    dispatch(getCollections(userId))
  }, [dispatch])

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserNavBar />
      <div className="collection-body_content">
          <span className="collection-body_content-header">Collections</span>
          {collectionsArr.map(collection => (
            <div key={collection.id} className="collection-body_content-content">
              <span className="collection-body_content-content_collection">{collection.title}</span>
              <span className="collection-body_content-content_option"><i className="fas fa-ellipsis-v"></i></span>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
export default Collection;
