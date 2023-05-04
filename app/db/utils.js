import { CheckDataType } from "@/utils";

import DB from "./mysql";

const sqlObjToAnd = (obj) => {
  let sql = "";
  let keys = Object.keys(obj);
  let index = 0;
  for (let key of keys) {
    if (
      obj[key] === undefined ||
      ((obj[key] && obj[key].toString()) || "").trim() === ""
    ) {
      continue;
    }
    if (CheckDataType.isString(obj[key])) {
      obj[key] = obj[key].trim();
    }
    sql += `${index !== 0 ? "  AND  " : ""} ${key} = ${DB.connection.escape(
      obj[key]
    )}`;
    index += 1;
  }
  return sql;
};
const sqlObjToAndLike = (obj) => {
  let sql = "";
  let keys = Object.keys(obj);
  let index = 0;

  for (let key of keys) {
    if (
      obj[key] === undefined ||
      ((obj[key] && obj[key].toString()) || "").trim() === ""
    ) {
      continue;
    }
    if (CheckDataType.isString(obj[key])) {
      obj[key] = obj[key].trim();
    }
    sql += `${
      index !== 0 ? "  AND  " : ""
    } ${key}  like  ${DB.connection.escape("%" + obj[key] + "%")}`;
    index += 1;
  }
  return sql;
};

const sqlObjToOr = (obj) => {
  let sql = "";
  let keys = Object.keys(obj);
  let index = 0;

  for (let key of keys) {
    if (
      obj[key] === undefined ||
      ((obj[key] && obj[key].toString()) || "").trim() === ""
    ) {
      continue;
    }
    if (CheckDataType.isString(obj[key])) {
      obj[key] = obj[key].trim();
    }
    sql += `${
      index !== 0 ? "  OR  " : ""
    } ${key}  like  %${DB.connection.escape(obj[key])}%`;
    index += 1;
  }
  return sql;
};

const sqlObjToOrLike = (obj) => {
  let sql = "";
  let keys = Object.keys(obj);
  let index = 0;

  for (let key of keys) {
    if (
      obj[key] === undefined ||
      ((obj[key] && obj[key].toString()) || "").trim() === ""
    ) {
      continue;
    }

    if (CheckDataType.isString(obj[key])) {
      obj[key] = obj[key].trim();
    }
    sql += `${index !== 0 ? "  OR  " : ""} ${key}  like  ${DB.connection.escape(
      "%" + obj[key] + "%"
    )}`;
    index += 1;
  }
  return sql;
};

const mergeCondition = (options = {}) => {
  const { and = {}, or = {}, orLike = {}, andLike = {} } = options;

  let sql = "";

  const andCondition = sqlObjToAnd(and);
  const andLikeCondition = sqlObjToAndLike(andLike);

  const orCondition = sqlObjToAnd(or);
  const orLikeCondition = sqlObjToAndLike(orLike);

  let frontHasCondition = false;
  if (andCondition) {
    sql += `where  ${andCondition} `;
    frontHasCondition = true;
  }

  if (andLikeCondition) {
    sql += `${frontHasCondition ? " AND " : "  where  "}  ${andLikeCondition} `;
    frontHasCondition = true;
  }

  if (orCondition) {
    sql += `${frontHasCondition ? " OR " : "  where "}  ${orCondition} `;
    frontHasCondition = true;
  }

  if (orLikeCondition) {
    sql += `${frontHasCondition ? " OR " : "  where  "}  ${orLikeCondition} `;
    frontHasCondition = true;
  }

  return sql;
};

export {
  mergeCondition,
  sqlObjToAnd,
  sqlObjToAndLike,
  sqlObjToOr,
  sqlObjToOrLike
};
