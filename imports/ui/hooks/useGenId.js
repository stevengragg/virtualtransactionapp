import { Random } from "meteor/random";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useGenId = () => useRef(String(uuidv4()).slice(0, 8));
const useRandomId = (len) => useRef(Random.id(len || 10));

export { useGenId, useRandomId };
