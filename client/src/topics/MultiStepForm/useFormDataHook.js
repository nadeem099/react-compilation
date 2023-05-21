import { useReducer } from "react";
import { formActions } from "./components";

// {
//   interests: [], // options
//   country: [], // drop down,
//   state: [], // drop down,
//   city: [],
//   // drop down
//   aboutYou: "", // textarea
//   birthDate: "", // date
//   ageGroup: [], // checkbox
//   favouriteColor: "", // color picker
// }

const initState = {
  personalDetails: {},
  otherDetails: {},
  documents: {},
};

const formDataReducer = (state = initState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case formActions.SET_FIRST_NAME: {
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          name: { ...state.personalDetails.name, firstName: payload },
        },
      };
    }
    case formActions.SET_LAST_NAME: {
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          name: { ...state.personalDetails.name, lastName: payload },
        },
      };
    }
    case formActions.SET_PASSWORD: {
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          password: payload,
        },
      };
    }
    case formActions.SET_GENDER: {
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          gender: payload,
        },
      };
    }
    case formActions.SET_JOINING: {
      if (typeof payload === "boolean")
        return {
          ...state,
          otherDetails: {
            ...state.otherDetails,
            joining: payload,
          },
        };
      const { otherDetails: { joining = [] } = {} } = state;
      let newJoining = joining;
      if (newJoining.includes(payload)) {
        newJoining = newJoining.filter((item) => item !== payload);
      } else {
        newJoining.push(payload);
      }
      console.log(newJoining);
      return {
        ...state,
        otherDetails: {
          ...state.otherDetails,
          joining: newJoining,
        },
      };
    }
    case formActions.SET_DOC: {
      const { docType, file, error } = payload;
      return {
        ...state,
        documents: {
          ...state.documents,
          [docType]: error || file,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const useFormDataHook = (init = initState) => {
  const [formData, setFormData] = useReducer(formDataReducer, init);
  const [formErrors, setFormErrors] = useReducer(formDataReducer, init);

  return { formData, setFormData, formErrors, setFormErrors };
};
