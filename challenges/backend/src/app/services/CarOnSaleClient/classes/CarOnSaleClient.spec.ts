import { expect } from "chai";

describe("test infra",()=>{
    it("check true is true",  ()=>{
        expect(true).to.be.true;
    });
    it("smoke test",()=>{
        expect(true).to.be.false;
    });
});