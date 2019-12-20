import { Test, TestingModule } from '@nestjs/testing';
import { DeletefileController } from './deletefile.controller';

describe('Deletefile Controller', () => {
  let controller: DeletefileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletefileController],
    }).compile();

    controller = module.get<DeletefileController>(DeletefileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
