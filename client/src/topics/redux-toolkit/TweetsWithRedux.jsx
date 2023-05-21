import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntities } from "./simple-redux";

function TweetsWithRedux() {
  const { data, error, loading } = useSelector((state) => state.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || !error) {
      dispatch(fetchEntities());
    }
  }, []);

  return !loading ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>;
}

export default TweetsWithRedux;
