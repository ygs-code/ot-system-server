import chai from "chai";
import { resolve } from "path";
import * as typeDefs from "./typeDefs";
import {default as rootSchema} from "@/graphql/schema/typeDefs.js";
import {exeValidateSchema} from "@/utils";
const expect = chai.expect;
const schema = `
  ${rootSchema}
  \n
  ${typeDefs.schema}
`;
describe("schema typeDefs 测试", () => {
  it("测试试结果错误应该为0个", async () => {
    expect(await exeValidateSchema(schema)).to.be.equal(0);
  });
});
