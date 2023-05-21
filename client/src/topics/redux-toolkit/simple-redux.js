import {
  createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} from "redux";
import { produce } from "immer";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

const asyncData = [
  {
    tweetId: 3534,
    username: "eaf",
    tweetText: "fewa",
    media: {
      images: [],
      video: {},
    },
  },
];

export function getAsyncData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(asyncData), 2000);
  });
}

const tweetActions = {
  INCREASE_LIKES: "INCREASE_LIKES",
};

const tweetCommentActions = {
  ADD_COMMENT: "ADD_COMMENT",
  ADD_LIKES: "ADD_LIKES",
};

const entities = {
  SAVE_DATA: "SAVE_DATA",
  SET_LOADING: "SET_LOADING",
  UPDATE_ERROR: "UPDATE_ERROR",
};

const allActions = { ...tweetActions, ...tweetCommentActions, ...entities };

// action creators:
const increaseTweetLikes = () => ({
  type: allActions.INCREASE_LIKES,
});

const addTweetComment = (comment) => ({
  type: allActions.ADD_COMMENT,
  payload: comment,
});

const addCommentLikes = (comment) => ({
  type: allActions.ADD_LIKES,
  payload: comment,
});

export const saveData = (data) => ({
  type: allActions.SAVE_DATA,
  payload: data,
});

export const setLoading = (loading) => ({
  type: allActions.SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: allActions.UPDATE_ERROR,
  payload: error,
});

export const fetchEntities = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getAsyncData()
      .then((data) => {
        dispatch(saveData(data));
        dispatch(setLoading(false));
        dispatch(setError(""));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(err));
      });
  };
};

// init states
const tweetInitState = {
  username: "nadeem",
  tweet: "Twitter is cool",
  likesCount: 5,
};

const commentInitState = [
  {
    user: "elon",
    tweet: "It's super cool",
    likes: [
      {
        likeId: 233,
        user: "Jhon",
      },
    ],
  },
];

const entitiesState = {
  data: [],
  error: "",
  loading: false,
};

// reducers
const tweetReducer = (state = tweetInitState, action) => {
  switch (action.type) {
    case allActions.INCREASE_LIKES: {
      return {
        ...state,
        likesCount: state.likesCount + 1,
      };
    }
    default: {
      return state;
    }
  }
};

const tweetCommentReducer = (state = commentInitState, action) => {
  const { payload } = action;
  switch (action.type) {
    case allActions.ADD_COMMENT: {
      return [...state, action.payload];
    }
    // case allActions.ADD_LIKES: {
    //   return state.map((comment) => {
    //     if (comment.user === payload.user) {
    //       return {
    //         ...comment,
    //         likes: [...comment.likes, payload.likeUser],
    //       };
    //     }
    //     return comment;
    //   });
    // }
    case allActions.ADD_LIKES: {
      return state.map((comment) => {
        if (comment.user === payload.user) {
          return produce(comment, (draft) => {
            draft.likes.push(payload.likeUser);
          });
        }
        return comment;
      });
    }
    default: {
      return state;
    }
  }
};

const entityReducer = (state = entitiesState, action) => {
  switch (action.type) {
    case allActions.SAVE_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case allActions.UPDATE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case allActions.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  tweet: tweetReducer,
  comments: tweetCommentReducer,
  entities: entityReducer,
});

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("inital state: ", store.getState());

const unsubscribe = store.subscribe(
  () => {}
  // console.log("updated state: ", store.getState())
);

// raw way
// store.dispatch(increaseTweetLikes());
// store.dispatch(increaseTweetLikes());
// store.dispatch(increaseTweetLikes());
// store.dispatch(addTweetComment("It's weired"));

// using bindAction creators
const actions = bindActionCreators(
  { increaseTweetLikes, addTweetComment, addCommentLikes },
  store.dispatch
);
// actions.increaseTweetLikes();
// actions.increaseTweetLikes();
// actions.increaseTweetLikes();
// actions.addTweetComment({ user: "modi", tweet: "Bohot badhiya hai mitro" });
// actions.addCommentLikes({
//   user: "elon",
//   likeUser: { likeId: 334, user: "putin" },
// });
// console.log(store.getState().comments[0].likes);

// store.dispatch(fetchEntities());
unsubscribe();
