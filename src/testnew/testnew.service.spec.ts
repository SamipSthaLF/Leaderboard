import { Test, TestingModule } from "@nestjs/testing";
import { TestnewService } from "./testnew.service";

describe("TestnewService", () => {
  let service: TestnewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestnewService],
    }).compile();

    service = module.get<TestnewService>(TestnewService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
