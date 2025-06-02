import { NewUser } from "../types/userType.js";

const isEmpty = (obj: NewUser): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

const isMissing = (obj: NewUser): boolean => {
  if (!(Object.keys(obj).length === 7)) {
    return true;
  } else {
    if (
      !(
        (
          Object.keys(obj.address).length === 5 &&
          Object.keys(obj.company).length === 3
        )
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
};

export {
    isEmpty,
    isMissing
}