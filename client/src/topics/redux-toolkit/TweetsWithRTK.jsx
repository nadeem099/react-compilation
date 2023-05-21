import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentsActions } from "./rtk/features/comments";
import { fetchEntities } from "./rtk/features/entities";

function TweetsWithRTK() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const entities = useSelector((state) => state.entities);
  console.log(entities);

  useEffect(() => {
    // dispatch(
    //   commentsActions.addComment({ user: "someone", tweet: "no tweet" })
    // );
    dispatch(fetchEntities());
  }, []);
  return <div>TweetsWithRTK</div>;
}

export default TweetsWithRTK;
