import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengesDto } from './dto/challenges.dto';
import { Challenge } from './entities/challenges.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  public async create(payload: ChallengesDto) {
    const challengeEntity = this.challengeRepository.create(payload);
    return await this.challengeRepository.save(challengeEntity);
  }

  public async findAll() {
    return this.challengeRepository.find();
  }

  public async findByID(id: number) {
    return this.challengeRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async update(id: number, payload: Partial<ChallengesDto>) {
    return await this.challengeRepository.update({ id }, payload);
  }

  public async delete(id: number) {
    return await this.challengeRepository.delete({ id });
  }
}
