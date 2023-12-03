import { Injectable } from '@nestjs/common';
import { ChallengesDto } from './dto/challenges.dto';

@Injectable()
export class ChallengesService {
  private challengesDto: ChallengesDto[] = [];

  public create(payload: ChallengesDto) {
    const sanitizedData = this.sanitize(payload);
    this.challengesDto.push(sanitizedData);
    return true;
  }

  public findAll() {
    return this.challengesDto;
  }

  public findByID(id: number) {
    return this.challengesDto.find((item) => item.id === id);
  }

  public update(id: number, payload: Partial<ChallengesDto>) {
    const challengeIndex = this.challengesDto.findIndex(
      (item) => item.id === id,
    );
    if (challengeIndex < 0) {
      return 'challenge not found';
    }

    const temp = { ...this.challengesDto[challengeIndex], ...payload };

    this.challengesDto[challengeIndex] = temp;
    return this.challengesDto[challengeIndex];
  }

  public delete(id: number) {
    const challangeIndex = this.challengesDto.findIndex(
      (item) => item.id === id,
    );
    return this.challengesDto.splice(challangeIndex, 1);
  }

  // some private method to do something
  private sanitize(payload: ChallengesDto) {
    return { ...payload };
  }
}
